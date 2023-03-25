/* global before, cy, describe, expect, it */
describe('init', () => {
  before(() => {
    cy.join()
  })

  it('initializes the world', () => {
    cy.window().then((win) => {
      const existingActors = win.game.actors.filter(a => a.name === 'Example Character').map(a => a.id)
      cy.get('#sidebar-tabs > [data-tab="actors"]').click()
      cy.get('#actors a.actor-import').click()
      cy.get('div.actor-importer').invoke('attr', 'id').then((windowID) => {
        cy.get('#coc-pasted-character-data').invoke('val', 'Example Character, age 27\nSTR 75 CON 60 SIZ 80 DEX 70 APP 60 INT 80\nPOW 50 EDU 85 SAN 55 HP 14 DB: 1D4\nBuild: 1 Move: 7 MP: 10 Luck: 40 Armor: 1\nAttacks per round: 3 SAN loss: 1d4/1d8\nCombat\nBite 50% (25/10), damage 1D6\nBrawl 30% (15/6), damage 1D3\nDerringer 40% (20/8), damage 1D8+1\nDodge 50% (25/10)\nSkills\nAnimal Handling 55%, Charm 30%, First Aid 25%, Disguise 20%,\nListen 50%, Medicine 45%, Persuade 25%, Psychology 75%,\nScience (Astronomy) 90%, Science (Botany) 35%, Science (Zoology) 10%,\nSpot Hidden 35%, Stealth 10%\nLanguages: English 80%, Eklo 5%.\nSpells: Summon NPC, Dispel NPC.').then(() => {
          cy.get('#coc-pasted-character-data').parents('form').get('[data-button="import"]').click()
          cy.get('.app.window-app.coc7.sheet.actor.npc').should('exist').invoke('attr', 'id').then((sheetID) => {
            const newActors = win.game.actors.filter(a => a.name === 'Example Character').map(a => a.id).filter(x => !existingActors.includes(x))
            expect(newActors.length).to.equal(1)
            const actor = win.game.actors.get(newActors[0])
            expect(actor.system.attribs.armor.value).to.equal(1)
            expect(actor.system.attribs.build.value).to.equal(1)
            expect(actor.system.attribs.db.value).to.equal('1D4')
            expect(actor.system.attribs.hp.value).to.equal(14)
            expect(actor.system.attribs.hp.max).to.equal(14)
            expect(actor.system.attribs.lck.value).to.equal(40)
            expect(actor.system.attribs.mov.value).to.equal(7)
            expect(actor.system.attribs.mp.value).to.equal(10)
            expect(actor.system.attribs.san.value).to.equal(55)
            actor.sheet.close()
            actor.delete()
          })
        })
      })
    })
  })
})
