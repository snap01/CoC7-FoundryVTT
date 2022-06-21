/* global ChatMessage, CONFIG, game, Roll */

export class CoC7Dice {
  static async roll (modif = 0, rollMode = null, hideDice = false) {
    let alternativeDice = ''
    if (game.modules.get('dice-so-nice')?.active) {
      if (modif < 0) {
        alternativeDice = game.settings.get('CoC7', 'tenDiePenalty')
      } else if (modif > 0) {
        alternativeDice = game.settings.get('CoC7', 'tenDieBonus')
      }
    }
    const roll = await new Roll(
      '1dt' +
        (alternativeDice !== ''
          ? '+1do[' + alternativeDice + ']'
          : '+1dt'
        ).repeat(Math.abs(modif)) +
        '+1d10'
    ).roll({ async: true })
    const result = {
      unit: {
        total: 0,
        results: []
      },
      tens: {
        total: 0,
        results: []
      },
      total: 0,
      roll: roll
    }
    if (rollMode) result.rollMode = rollMode
    if (hideDice) result.hideDice = hideDice
    for (const d of roll.dice) {
      if (d instanceof CONFIG.Dice.terms.t) {
        result.tens.results.push(d.total)
      } else {
        result.unit.total = d.total === 10 ? 0 : d.total
        result.unit.results.push(result.unit.total)
      }
    }
    if (modif < 0) {
      result.tens.total =
        result.unit.total === 0 && result.tens.results.includes(0)
          ? 100
          : Math.max(...result.tens.results)
    } else if (result.unit.total === 0) {
      const dice = result.tens.results.filter(t => t > 0)
      result.tens.total = dice.length === 0 ? 100 : Math.min(...dice)
    } else {
      result.tens.total = Math.min(...result.tens.results)
    }
    result.total = result.unit.total + result.tens.total
    return result
  }

  static async showRollDice3d (roll) {
    if (game.modules.get('dice-so-nice')?.active) {
      const syncDice = game.settings.get('CoC7', 'syncDice3d')

      const chatData = {
        whisper: null,
        blind: false
      }
      ChatMessage.applyRollMode(chatData, game.settings.get('core', 'rollMode'))

      await game.dice3d.showForRoll(
        roll,
        game.user,
        syncDice,
        chatData.whisper,
        chatData.blind
      )
    }
  }

  static async showCoC7Dice3d (rollData) {
    if (game.modules.get('dice-so-nice')?.active) {
      const syncDice = game.settings.get('CoC7', 'syncDice3d')

      const chatData = {
        whisper: null,
        blind: false
      }
      ChatMessage.applyRollMode(chatData, game.settings.get('core', 'rollMode'))
      const data = []
      for (let j = 0, jm = rollData.length; j < jm; j++) {
        for (let i = 0, im = rollData[j].terms.length; i < im; i++) {
          if (typeof rollData[j].terms[i].results !== 'undefined') {
            let type = 'd' + rollData[j].terms[i].faces
            switch (rollData[j].terms[i].class) {
              case 'CoC7DecaderDie':
                type = 'd100'
                break
              case 'CoC7DecaderDieOther':
                type = 'd100'
                break
            }
            data.push({
              resultLabel: rollData[j].terms[i].results[0].result,
              result: rollData[j].terms[i].results[0].result,
              type: type,
              options: rollData[j].terms[i].options
            })
          }
        }
      }
      console.log(data)
      game.dice3d.show({ throws: [{ dice: data }] }, game.user, syncDice, chatData.whisper, chatData.blind)
    }
  }

  static async combinedRoll (options) {
    options.pool = options.pool ?? {}
    options.pool['0'] = false
    const keys = Object.keys(options.pool).map(v => parseInt(v, 10))
    let penaltyDice = Math.abs(Math.min(0, Math.min(...keys)))
    let bonusDice = Math.max(0, Math.max(...keys))
    const hasDSN = game.modules.get('dice-so-nice')?.active

    const pool = []
    pool.push('1dt+1d10')

    if (penaltyDice > 0) {
      pool.push(
        (hasDSN
          ? '+1do[' + game.settings.get('CoC7', 'tenDiePenalty') + ']'
          : '1dt'
        ).repeat(Math.abs(penaltyDice))
      )
    }
    if (bonusDice > 0) {
      pool.push(
        (hasDSN
          ? '+1do[' + game.settings.get('CoC7', 'tenDieBonus') + ']'
          : '1dt'
        ).repeat(Math.abs(bonusDice))
      )
    }
    const roll = await new Roll(pool.join('')).roll({ async: true })
    const result = {
      groups: {
        baseDie: 0,
        penaltyDice: [],
        bonusDice: []
      },
      unit: 0,
      roll: roll
    }
    let baseSet = false
    for (const d of roll.dice) {
      if (d instanceof CONFIG.Dice.terms.t) {
        if (!baseSet) {
          result.groups.baseDie = d.total
          baseSet = true
        } else if (penaltyDice > 0) {
          result.groups.penaltyDice.push(d.total)
          penaltyDice--
        } else {
          result.groups.bonusDice.push(d.total)
          bonusDice--
        }
      } else {
        result.unit = d.total === 10 ? 0 : d.total
      }
    }

    const output = {}

    for (const key in options.pool) {
      output[key] = {
        unit: {
          total: result.unit,
          results: [result.unit]
        },
        tens: {
          total: 0,
          results: []
        },
        total: 0,
        roll: roll
      }
      const modif = parseInt(key, 10)
      let modifier = modif
      output[key].tens.results.push(result.groups.baseDie)
      for (const offset = Math.abs(modifier); modifier < 0; modifier++) {
        output[key].tens.results.push(
          result.groups.penaltyDice[modifier + offset]
        )
      }
      for (const offset = modifier; modifier > 0; modifier--) {
        output[key].tens.results.push(
          result.groups.bonusDice[Math.abs(modifier - offset)]
        )
      }
      if (modif < 0) {
        output[key].tens.total =
          output[key].unit.total === 0 && output[key].tens.results.includes(0)
            ? 100
            : Math.max(...output[key].tens.results)
      } else if (output[key].unit.total === 0) {
        const dice = output[key].tens.results.filter(t => t > 0)
        output[key].tens.total = dice.length === 0 ? 100 : Math.min(...dice)
      } else {
        output[key].tens.total = Math.min(...output[key].tens.results)
      }
      output[key].total = output[key].unit.total + output[key].tens.total
    }
    return output
  }
}
