/* global fromUuid, game, ui */
import { CoC7Utilities } from '../utilities.js'
import { CombinedCheckCard } from '../chat/cards/combined-roll.js'
import { GroupRollCard } from '../chat/cards/group-roll-card.js'
import { OpposedCheckCard } from '../chat/cards/opposed-roll.js'

export class CoC7SystemSocket {
  static async callSocket (data) {
    if (typeof data.listener !== 'undefined') {
      if (game.user.id === data.listener) {
        switch (data.type) {
          case GroupRollCard.defaultConfig.type:
            GroupRollCard.dispatch(data)
            break
        }
      }
    } else {
      if (game.user.isGM) {
        switch (data.type) {
          case OpposedCheckCard.defaultConfig.type:
            OpposedCheckCard.dispatch(data)
            break
          case CombinedCheckCard.defaultConfig.type:
            CombinedCheckCard.dispatch(data)
            break
          case 'invoke':
            {
              const item = await fromUuid(data.item)
              item[data.method](data.data)
            }
            break
        }
      }
      switch (data.type) {
        case 'updateChar':
          CoC7Utilities.updateCharSheets()
          break
      }
    }
  }

  static requestKeeperAction (data) {
    if (game.user.isGM) {
      data.listener = game.user.id
      CoC7SystemSocket.callSocket(data)
    } else {
      const keepers = game.users.filter(u => u.active && u.isGM)
      if (keepers.length) {
        data.listener = keepers[0].id
        game.socket.emit('system.CoC7', data)
      } else {
        ui.notifications.error(game.i18n.localize('CoC7.ErrorMissingKeeperUser'))
      }
    }
  }

  static requestUserAction (data, { userId = null, errorIfMissing = true, includeSelf = true } = {}) {
    if (userId && typeof userId !== 'undefined') {
      if (userId === game.user.id) {
        data.listener = game.user.id
        CoC7SystemSocket.callSocket(data)
      } else {
        const user = game.users.get(userId)
        if (typeof user.id !== 'undefined' && user.active) {
          data.listener = user.id
          game.socket.emit('system.CoC7', data)
        } else if (errorIfMissing) {
          ui.notifications.error(game.i18n.localize('CoC7.ErrorMissingUser'))
        }
      }
    } else {
      if (includeSelf) {
        data.listener = game.user.id
        CoC7SystemSocket.callSocket(data)
      }
      game.socket.emit('system.CoC7', data)
    }
  }
}
