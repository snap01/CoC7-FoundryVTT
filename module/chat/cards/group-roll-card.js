/* global ChatMessage, game, renderTemplate, ui */
import { CoC7Dice } from '../../dice.js'
import { CoC7Check } from '../../check.js'
import { CoC7SystemSocket } from '../../apps/coc7-system-socket.js'

/*
All (All players roll) p86
Any (All players roll) p86
Against Lowest Value (Only that player rolls) p90 - use individual rolls instead
Against Highest Value (Only that player rolls)
Physical Human Limits on physical characteristics (deduct lowest to highest until one or more actors can roll vs <50, <90, or <100) p88
*/
export class GroupRollCard {
  constructor () {
    this.message = []
  }

  static get defaultConfig () {
    return {
      template: 'systems/CoC7/templates/chat/cards/group-roll-card.hbs',
      type: 'groupCard',
      title: 'CoC7.GroupRollCard'
    }
  }

  static async bindListerners (html) {
    html.on(
      'click',
      '.roll-card.group .toggle-switch',
      this._onToggle.bind(this)
    )
    html.on(
      'click',
      '.roll-card.group .remove-roll',
      this._onRemoveRoll.bind(this)
    )
    html.on(
      'click',
      '.roll-card.group .roll-card',
      this._onRollCard.bind(this)
    )
  }

  static async dispatch (data) {
    if (game.user.isGM) {
      let messages = ui.chat.collection.filter(message => {
        if (
          this.defaultConfig.type === message.getFlag('CoC7', 'type') &&
          message.getFlag('CoC7', 'state') !== 'resolved'
        ) {
          return true
        }
        return false
      })

      if (messages.length) {
        // Old messages can't be used if message is more than a day old mark it as resolved
        const timestamp = new Date(messages[0].data.timestamp)
        const now = new Date()
        const timeDiffSec = (now - timestamp) / 1000
        if (24 * 60 * 60 < timeDiffSec) {
          await messages[0].setFlag('CoC7', 'state', 'resolved')
          messages = []
        }
      }
      const card = new this()
      if (!messages.length) {
        messages = [await card.createMessage()]
      }
      if (card.setMessage(messages[0].id)) {
        card.process(data)
      }
    } else {
      CoC7SystemSocket.requestKeeperAction(data)
    }
  }

  get config () {
    return GroupRollCard.defaultConfig
  }

  get rollable () {
    return (this.flags.switch ?? '') !== '' && this.message.data.flags.CoC7.rolls.length
  }

  get rolls () {
    const rolls = []
    const selected = (this.flags.switch ?? '')
    let min = false
    let max = false
    for (let i = 0, im = this.message.data.flags.CoC7.rolls.length; i < im; i++) {
      const check = Object.assign(new CoC7Check(), this.message.data.flags.CoC7.rolls[i])
      if (min === false || check.rawValue < min) {
        min = check.rawValue
      }
      if (max === false || max < check.rawValue) {
        max = check.rawValue
      }
      rolls.push(check)
    }
    switch (selected) {
      case 'againstLowest':
        for (let i = 0, im = rolls.length; i < im; i++) {
          if (min !== false && rolls[i].rawValue === min) {
            rolls[i].disabled = false
            min = false
          } else {
            rolls[i].disabled = true
          }
        }
        break
      case 'againstHighest':
        for (let i = 0, im = rolls.length; i < im; i++) {
          if (max !== false && rolls[i].rawValue === max) {
            rolls[i].disabled = false
            max = false
          } else {
            rolls[i].disabled = true
          }
        }
        break
    }
    rolls.sort((a, b) => {
      if (a.rawValue === b.rawValue) {
        return 0
      } else {
        return (a.rawValue < b.rawValue ? -1 : 1)
      }
    })
    return rolls
  }

  get flags () {
    return this.message.data.flags.CoC7
  }

  setMessage (messageId) {
    const message = game.messages.get(messageId)
    if (message) {
      this.message = message
      return true
    } else {
      ui.notifications.error(game.i18n.localize('CoC7.UnableToFindMessage'))
      return false
    }
  }

  async createMessage () {
    const chatData = {
      user: game.user.id,
      flavor: game.i18n.localize(this.config.title),
      content: '<p>&nbsp;</p>',
      flags: {
        CoC7: {
          type: this.config.type,
          state: 'initiated',
          switch: '',
          rolls: [],
          pending: true
        }
      }
    }
    const msg = await ChatMessage.create(chatData)
    return msg
  }

  static async _onToggle (event) {
    event.preventDefault()

    const span = event.currentTarget
    if (span && span.classList.contains('gm-select-only') && !game.user.isGM) {
      return
    }
    const flag = span.dataset.flag
    if (!flag) return
    const messageId = span.closest('.chat-message')?.dataset?.messageId
    const card = new this()
    if (card.setMessage(messageId)) {
      await card.message.setFlag('CoC7', 'switch', flag)
      card.updateChatCard()
    }
  }

  static async _onRemoveRoll (event) {
    event.preventDefault()

    const a = event.currentTarget
    if (a && a.classList.contains('gm-select-only') && !game.user.isGM) {
      return
    }
    const actorKey = a.closest('li')?.dataset?.actorKey
    const messageId = a.closest('.chat-message')?.dataset?.messageId
    const card = new this()
    if (card.setMessage(messageId)) {
      await card.removeActorKey(actorKey)
      card.updateChatCard()
    }
  }

  static async _onRollCard (event) {
    if (!game.user.isGM) {
      return
    }
    event.preventDefault()
    const button = event.currentTarget
    const messageId = button.closest('.chat-message')?.dataset?.messageId
    const card = new this()
    if (card.setMessage(messageId)) {
      const rolls = card.rolls
      const rollData = []
      for (let i = 0, im = rolls.length; i < im; i++) {
        if (!rolls[i].disabled) {
          rollData.push(rolls[i].dice.roll)
        }
      }
      CoC7Dice.showCoC7Dice3d(rollData)
      // card.updateChatCard()
    }
  }

  async addRollData (data) {
    const rolls = (this.message.getFlag('CoC7', 'rolls')?.filter(r => r.actorKey !== data.roll.actorKey) ?? [])
    rolls.push(data.roll)
    await this.message.setFlag('CoC7', 'rolls', rolls)
  }

  async removeActorKey (actorKey) {
    const rolls = (this.message.getFlag('CoC7', 'rolls')?.filter(r => r.actorKey !== actorKey) ?? [])
    await this.message.setFlag('CoC7', 'rolls', rolls)
  }

  async updateChatCard () {
    const msg = await this.message.update({
      content: await renderTemplate(this.config.template, this)
    })
    ui.chat.updateMessage(msg, false)
  }

  async process (data) {
    if (game.user.isGM) {
      switch (data.action) {
        case 'add':
          await this.addRollData(data)
          break
      }
      this.updateChatCard()
    } else {
      CoC7SystemSocket.requestKeeperAction(data)
    }
  }
}
