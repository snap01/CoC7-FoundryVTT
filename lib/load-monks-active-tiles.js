/* global $, CONFIG, fetchJsonWithTimeout, game, mergeObject */
export default async function runImport () {
  const oldScopes = CONFIG.DatabaseBackend.getFlagScopes()
  oldScopes.push('monks-active-tiles')
  CONFIG.DatabaseBackend.getFlagScopes = function () {
    return oldScopes
  }
  const json = await fetchJsonWithTimeout('/systems/' + game.system.id + '/lib/monks-active-tiles/lang/en.json')
  $('head')
    .append('<link rel="stylesheet" type="text/css" href="/systems/' + game.system.id + '/lib/monks-active-tiles/css/monks-active-tiles.css">')
    .append('<script defer src="/systems/' + game.system.id + '/lib/monks-active-tiles/js/jquery.typeahead.min.js"></script>')
  mergeObject(game.i18n.translations, json)
  const loaded = await import('./monks-active-tiles/monks-active-tiles.js')
  loaded.MonksActiveTiles.init()
  await import('./monks-active-tiles/settings.js')
}
