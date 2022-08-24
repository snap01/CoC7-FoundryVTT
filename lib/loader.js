/* global game, Hooks */
Hooks.on('init', async () => {
  if (!game.modules.get('monks-active-tiles')?.active) {
    const { default: runImport } = await import('./load-monks-active-tiles.js')
    runImport()
  }
})
