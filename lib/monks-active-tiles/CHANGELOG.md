## Version 1.0.90

Fixing issues with Show/Hide

Fixing issues with Fading show/hide

## Version 1.0.89

Fixed issues with automatically assigning tagger tags in the tagger dialog.  There's now a button to do it.

Fixed issue with use player destination icon when selecting the previous token destination for a location.

Fixed the strikethorugh effect following a deactivation of the tile to respect that a landing can bypass this.

Fixed issue with wall config showing html instead of the tagger icon.

Added a batch manager to run actions as a batch instead of trying to process each one individually.  So multiple calls to alter will add each change together and run them all at once in the end.

Added an action to run all the current batch commands.  Active Tiles will do it automatically, but if you needed to run any actions before other actions, you can use this to execute alll the batch actions.

Tried to fix some issues with the fading of tiles when using show/hide

Fixed issues when using "current" journal entries.

Stopped Show/Hide from activating/deactivating an ambient light or sound when found using tagger.

Added blur effect when transitioning between Tile Images.

Updated the find item to ignore case and to trim leading and trailing spaces.

Fixed issue where clicking a tile and requesting a location destination from the triggering token was having issues.

Fixed issue with Tile Image change when the tile is rotated.

Updated door triggers and hover over to respect the pause settign when preventing actions from happening.

Fixed issues with create token trigger triggering on enter as well.

Fixed issues with directional auto triggers.  And changed the auto anchors to better reflect the intended directions.  So top has been replaced with up and bottom replaced by down.

Added support for FXMaster

## Version 1.0.88

Added the option to use Tagger tag rules when setting an entities tag name.

Added disabled highlight to actions that are no longer available.

Fixed issues with selecting the Tile image.

Added the option to perform loops when switching the Tile image.

Removed the slot machine option from Switch Tile Image.

Fixed issues with triggering when players check a locked door.

Fixed issues with fading out a token image.

## Version 1.0.87

Fixing issue with Levels compatibility

Fixing issues with editing newly added images

Fixed issues with finding a random location within a Tile.

## Version 1.0.85

Fixed issue with editing the tag used for locations

Changed the name Anchor to Landing and Got to Anchor to Jump to Landing to hopefully make a little more sense.

Added the option to use a dire roll for the amount of time delayed.

Changed how the create token action finds a location.  You can now have it randomly add to multiple locations, rather than randomly pick one location to add all tokens to.

Changed how the create token action find a location within a Tile.  Instead of starting at the center and workign outwards, it will randomly pick a location somewhere within the Tile.

Added the door change information to any action that allows handlebars and to the macro arguments.

Fixed the compendium labelling for macro actions

Added the option to add or not add the returned data from a triggered Tile to the current information.

Added transitions to the Image Cycle action.

Added compendium icon to entity names that come from a compendium.

Fixed issue with items returned from a RollTable

Added the option to trigger when a locked door is checked.

Fixed issues with auto anchors based on direction a token enters or exits.

Updated the trigger interface.  So instead of having all the setup and actions on the same page, I've split them into three tabs.  The third one os for a list of images available to change this tile into.

BREAKING CHANGE:  Images have been pulled out of the Image Cycle action, and will be added to the images for the Tile itself.  This will give greater flexibility into changing the Tiles images, but will deprecate the Image Cycle action, and the Set Image Cycle action.  They're changing to Switch Tile Image.  Active Tiles should convert your Tiles the first time it loads, but will leave the Image Cycle action, in case you wanted to retain the iformation.  The action will not produce any effect though, and is safe to leave in the list.  Or can be removed in order to clean up the information.

ANY TILES THAT USE THESE ACTIONS NEED TO BE LOOKED INTO.	

## Version 1.0.84

Fixed issue with show/hide fade.

Fixed issue with directional auto anchors.

## Version 1.0.83

Added error checking if trying to teleport to a destination that doesn't exist.

Added the option to fade when using the show/hide action

Fixed issue when creating a chat message and the token in question doesn't have an associated actor.

Changed the filter by item to allow for checking for a specific quantity of item.

Fixed issue when getting a location based on a tag from any scene.

Added support for Sidebar Macro Directory.

Fixed issue with rotated Tiles.  Apparently Foundry doesn't use angles the same way everyone else does.

Added directional auto anchors, so _top-right will trigger if the token enters from the top right corner.

## Version 1.0.82

Fixing issues with Levels

## Version 1.0.81

Fixed issue with adding tagger

## Version 1.0.80

Fixed an issue where choosing a sound file for a play sound action that had already had a file saved would open up the FilePicker twice.

Updated the tagger interface to allow for the matching and scenes to search.

Fixed the context menu for actions so it wouldn't be mis positioned in Firefox.

Added styling for Warhammer so you can read the action list.

Added a check to make sure the entity exists when using the activate action.

Changed the run macro action to use the fine entity interface, which will let Active Tiles to run macros from a roll table.

Upadates active effects to allow Pathfinder to use effects that have degrees.

Updated image cycle to only activate when a GM is present

Updated the check entity count to also check for macros, scenes and tiles.

Updated anchors, check entity count, and trigger count to allow for handlebars in the goto tag

Updated the entity at position to check for macros

Fixed issue with getting entities when the value returne is undefined.

Fixed up the Dialog interface so you no longer have to supply a goto if you override it with a control field.

Added the option for the Dialog alert to return data from the dialog.

Fixed issue where Smart Doors wasn't allowing Active Tiles to trigger a tile.

Updated the triggering code to rely less on the canvas.

## Version 1.0.78

Fixed issues with Macros not loading since the update to being able to use them from compendiums.

## Version 1.0.77

Fixed an issue with creating encounter using a journal entry from rolltables.

Fixed an issue playing sounds when on the Forge

Fixed issue with the show Dialog box action.  The new code was interfering with the old code.

Updated the action config dialog so that if you resize a textarea field, the dialog will resize to fit.

## Version 1.0.76

Added the option to run Macros from a Compendium

Fixed issue with internationalization and the placeholder from entity selection fields

Prevented the textarea fields in the action config from being resized horizontally.

Added the option to allow some Tiles to be triggered even if the game is paused.

Fixed issues with moving an object when using offset measurments.

Added the option to select a collection when creating a token, so you can use journals created from a rolltable.

Added the option to create a token from a Note.

Cleaned up the text displayed when setting the quantity to blank when rolling a rolltable.  Even though the value will still reset when you edit the action again.

Tried to fix an issue when assigning items using the GURPS system, and a handful of other ones.

Added the option to select the currently activated scene, or current scene when changing the scene.

Prevented selecting entities that should be restricted.  Mostly so you can't select an Actor with the add to Combat Action.

Added the option to use HTML when writing the content of a dialog box.  Any field added to the dialog, with the name attribute will get added to the current array of values passed to further actions.

Fixed some issues with the function that calculated points based on Tile rotation.

Added additional collections to use with the filter by positon filter.

Added tagger support when triggering tiles using a door.

Fixed issue with hover over and tiles that are restricted to specific users.  So if it's a GM only Tile, hover over will only show for the GM.

Added auto anchors for door triggers.

Added auto anchors for specific players.

Fixed issues with wall config when it re-renders.

## Version 1.0.75

Fixed issues with action inputs that need to be parsed.

Fixed issues with defaulting the location information.

Added setting to allow any clicks that click on the door to be pass through to any tiles underneath.

Added tagger support for triggers from a door.

Fixed issues when a token's width or height is set to a negative value.

Updated Show/Hide action to use collection when selecting current values, so you can use the action with more than just tokens.

Fixed issues when setting location from Quick Encounters

Added support for using the alter action with arrays

Added the option to fade a sound being played

Added the option to prevent a sound from starting again if it's already playing.  This way multiple triggers of the same sound effect won't set it back tot he beginning.

Removed the value/percent option for playlists

Rolltable rolls will no longer be shown to the players if the rollmode is not roll.

Fixed issue with the exists filter that was still checking if the entity cound was zero instead of what the logic was set to.

Added the option to use entity collections when using the current values witht he position in list filter.  This means you can now use it to filter tiles or drawings.

Fixed issues with attribute filters and arrays

Added auto anchors.  So if you name you anchor `_gm` it will automatically go to that anchor first if you are the GM, and the same with `_player`.  You can also use the name of a trigger so `_click`, `_enter`, and `_exit` will all work.  This should eliminate the use of a Macro.

** Breaking Change **
Changed how the trigger method is being passed.  Instead of text, it needs to be the id of the trigger.  This will break any code or macros that trigger a Tile manually.

## Version 1.0.74

Fixed the double-click for entities and location to show the currenct values, and to save the values properly.

Fixed number fields to allow min, max and step values.

Fixed the right-click menu for actions, so that it doesn't disappear off the dialog.

Updated the record history and per token check boxes so that if you click on per token it will also turn on record history, and if you turn off record history it will turn off the per token.

Fix issues with cloning an action if the Tile hasn't been saved yet.

Fixed the pan canvas animate checkbox to show/hide the duration field properly.

Fixed the pan canvas action so that it will save properly.

Fixed the pan canvas duration field.

Fixed the move animation for things other than tokens.  Realized that it wouldn't animate for players properly.

Added array support for the alter action.  So if the field you're editing is an array, using + notaion will add to the array, - will remove and = will set the array.  items for the array are separated by a comma.

Fixed issues with the volume and play sound action.  Didn't realise how Foundry handled the volume property and I was doing it incorrectly.

Added the option to prevent the sound from starting again if the sound is currently playing.  Otherwise the sound will stop and start from the beginning again.

Updated the play sound action so that changes to the Interface volume will affect sounds currently playing.

Updated the Check tile triggered flter, so that you can get the unique triggers.  So you can check number of triggres vs number of individual tokens that have triggered the tile.

Updated the First in List filter to be Position in List.  So you can specify where in the list to draw from, or use "first", "last", or "random" respectively.

Added a new action to check for the player type, so you can have one set of code run for the GM and a different set run for the player.

Fixed issue looking for a flag, if Tiles were created before the Levels module was installed.

Added a setting to prevent Players from activating Tiles if the game is currently paused.

## Version 1.0.73

Added the option to edit the location field.  By double clicking on the field you can manually edit the location.  This will now allow you to enter `-100` for example, in the x or y field and have the location be relative to the token.

Added a list of the currently playing sounds so that if your Tile starts playing the sound and you have it looped there is a way to stop it from laying.

Also added the option for a Tile to play more than one sound effect at a time.

Fixed some colour styling that was causing Cyberpunk Red Core to have unreadable labels.

Added the option to trigger at the end of a token's turn in combat

Added the option to set the duration of how long a pan to a canvas spot takes.

Fixed issues with the Pan Canvas action not respecting who the pan canvas was meant for.

Fixed issues with tokens created using Quick Encounters not using the location originally specified when they were created.

Fixed issue where a GM only chatmessage was also being sent to the triggering token's owner.

Fixed an issue where setting the image cycle to the last image wasn't working.

Fixed issue with the way Set Image Cycle was being displayed.

Updated the First filter, to allow you to select "first", "last", or any spot in between.

Updated the Filter by Item to allow you to select tokens that *don't* have the item.

Added the Remove Item action.

Added the option to set the quantity of items to roll from a roll table.

Set how to distribute items to entities.

## Version 1.0.72

Updated the trigger action to use the current tiles.

Updated the function that gets the previous entities to use, so that it can use ids instead.  So if you're using a Macro to return data, you can have it pass an array of ids instead of an array of objects.

Fixed issue when using player token location.

## Version 1.0.71

Fixed the field length in the action config, so long names won't change the size of the field.

Added the option to pan the canvas to the players token

Fixed issues with who the pan canvas is directed towards

Added the option to create Tokens from Enhanced Journal Encounter Entries or Quick Encounter entries

Added the option to avoid other tokens when creating tokens

Added the option to set who the scrolling text gets displayed to.

Fixed issues with the scrolling text labels, and the scrolling text settings

Added the preload action, so you can control when you preload scenes.

Removed automatic preloading of scenes for teleport and scene changes because it was causing conflicts.

Fixed issues with a lot of the player commands not finding the correct player to run the command for.

Fixed issues with the confetti settings.

## Version 1.0.70

Added the method that gets passed to the actions.  This will allow you to hide and show things based on hover over.  So if you want to use a "tooltip" with a Tile, you can create a Text Drawing and alter the hidden property based on the method.

Updated the chat action to only show ellipses if the text overflows.

Updated the add item action to set the quantity to add.

Added the option to set what tokens get sent to the trigger action.

Added the option to display cycle images like a slot machine.

Updated the dialog action to require the content property to be filled.

Added a scrolling text action.

Fixed issue with dialog, if a button is pressed and there is no related anchor to go to, then actions should stop.

Fixed issue related to Levels and tokens within the Tile.

Added Confetti Module support.

Added the option to cycle images like a slot machine.

## Version 1.0.69

Fixed issues with finding tokens within Tile.

Added option to use filter by attribute with walls and terrain

## Version 1.0.68

Fixed issues with required fields not eing required.

Added error checking for action names.  This should make sure that any errors won't prevent the Tile config from opening.

Fixed issue with getting location not knowing what the reference Tile is.

Added error checking for alter action to make sure the attributes match the values properly.

Fixed issue with RollTables resetting every time a roll is made.  Also added the option to reset the rolls when all have been rolled.

Split Open Journal and Open Actor sheet as there was enough additions that they needed their own space.

Added the option to delete a Terrain entity.

Added the option to Stop Remaining Actions on a selected Tile.  So if you have a Tile running through actions, you can now stop it from looping.

Fixed issue with random destination targeting itself.

Added the option to specify what kind of door action will trigger the Tile.

Fixed issues with hovering on a Tile and switching scenes.

Fixed issue with clicking on the canvas when the type is not the type requested.

Fixed issue with Kandashi's Fluid Canvas heartbeat not working

Added macro to generate a macro to setup a Tile from a Tile.

## Version 1.0.65

Fixed issues with getting token attributes and tile attributes.

Added help strings for various actions properties.

Added right click and elevation as triggers.

Added the option to alter multiple attributes at the same time by separating them by semi-colons.

Added the option to control chat messages when rolling from the roll table.

Fixed permissions with Scenes so that it will only add Observer roll.

Added the action to change the Scene background.

Added the action to set an image cycle's image at.

Removed the option to select a Tile when selecting an attack Target

Added the option to only respond to clicks within the actual image instead of the entire Tile.  So clicks will ignore the Tiles transparency.

## Version 1.0.64

Fixed the icon for using the original location for a token.

Added the option to use Current Tokens when running the move token action.

Fixed an issue with Hurt/Heal that was introduced when fixing the issue with PF2E.

Added the option to alter a Wall segment

Added the option to clear targets instead of just selecting targets.

Fixed an issue where players weren't selecting any targets.

Fixed an issue when trying to select entities from a Compendium

Fixed an issue where hovering wasn't workign any more.

Fixed an issue where changing scenes with a pointer cursor showing wasn't clearing the pointer cursor.

Fixed an issue where an array of gotos weren't stopping if the tile was no longer active.

## Version 1.0.63

Added the option to drag and drop entities onto the action config dialog.  So if you want to add an Item to an Actor, you can now drag the item onto the action config instead of having to select it with the selection tool.

Added the option to double click the entity field to allow copy and pasting of the entity id.

Fixed an issue that multiline text areas weren't being registered correctly and it was defaulting back to a text box

Added a macro example to the Compendium, Teleport to a random location

Added the option to set the default trigger.  So if you use a lock of Click Tiles, you can have it default to that instead of Enter.

Defaulting to allow player to use the action while a GM isn't available.

Defaulting the Tiles to be active when created.

Added the option to not record the Tiles history.  It can get pretty large at times and if it's not cleaned out regularily could cause performance issues.  Especially for menu type displays.  If it's not needed then you can remove it.

Added the option to allow turn on the pointer cursor whenever you hover over the Tile.  So if you're using the Tile like a button, this will give feedback to the user that it's clickable.

Fixed an issue where trying to unpause a game was just toggling the pause state.  Technically this is a Foundry bug, but I'm compensating for it.

Removed the conditional fields for teleport that had a bad habit of always disappearing.

Fixed an issue where applying damage in PF2E was causing issues

Changed the playlist action so that it will control playing and stopping a playlist or a play list sound.

Moved the flavor field of a chatmessage to above the text, since that's where it will exist on the chat card.

Display a fragment of the text being displayed by a chat message.

Added the option to add a quantity of items instead of just 1

Added Scene and Actor as valid entity types to change permissions for.

Fixed some issues with adding tokens to combat.

Fixed an error with finding the location name if the Scene was blank.

Fixed an issue when trying to control a door.

Added the Target action, the triggering player will target the selected entities.

Added the Global Volume action, so you can set the global volume level.

Added the Dialog action, so you can prompt the triggering user for either a Yes/No response, or just display a message then need to click to confirm.

## Version 1.0.62

Fixed issue with Levels 3D and the wall config.

Added the option to select Journal Entries based on Tagger, Current journals, tokens within the triggering tile, and players.  Players is a unique one though.  What it will do, is show the first Journal Entry that the player owns.  So you can have one trigger open up the current player's own journal entry.

## Version 1.0.61

Fixed issue with selecting a Wall as a target.

Allow macros to use arguments if not using the core macros and Advanced Macros isn't installed.

Allow the show Journal/Actor entry to use a token.

Allow the filter by attribute to use strings

Fixed issue with Levels, where it was overwriting the tabs being added to Wall Config.

## Version 1.0.60

Allow the Token move action use the original destination of the token, in case an action tries to stop movement.

Fixed an issue where getting the location name of a location on a different Scene wouldn't return the proper name until the Scene returned back to the original scene.

Fixed issues with mergeObject and arrays when it comes to classes being added to the tile config dialog

Added Canvas Ready trigger.

Changed the delete source and preserve settings checkboxes to only show when the teleport location is on a different Scene.

Added a timeout of 2 seconds in change teleporting locks the movement of a token.

Added the option to remove a token from combat.

Added change scene lighting action.

Added the option to allow selecting an entity other than a Token for attribute filters.

Added a filter that checks if the token has an item in inventory.

Fixed an issue with 'Enter/Exit' not snapping to the correct location.

Fixed an issue that Paralaxia was causing with styling the Tile Config window.

## Version 1.0.59

Yep, still fixing the issue teleporting to other scenes.

## Version 1.0.58

Still fixing the issue teleporting to other scenes.

## Version 1.0.57

Fixing issue with teleporting to other scenes.

## Version 1.0.56

Added a flag for teleporting so the token won't be moved mid-teleport.  I believe this was causing a sync issue between the GM and players.

Added more verbose debug statements that can be truned on when debugging.

Added a `Hover` trigger that will combine both Hover In and Hover Out.

Fixed the `Enter/Exit` trigger so that it returns which of the two actually got triggered, so the history will show Enter or Exit properly.

Made sure that the cool down period for key presses only affects the actual Stop Movement action.

Added the wait spinner cursor tot he canvas when a cooldown period has been activated so that the player knows something is happening and Foundry isn't just eating key presses.

Fixed an issue adding information tot he history.

Added a macro to help with redirecting On Enter and On Exit triggers.  So with a Macro and soem Anchors you can have an On Enter action and an On Exit action happen for the same Tile.  No need to overlay two Tiles over top of each other for the same effect.

Added option to change the colour used for the screen wash when teleporting a token, as well as the option to turn it off.

## Version 1.0.55

Fixing an errors with sending selected tokens from the player to the GM.

Added option to move a token to another tokens location.

## Version 1.0.54

Fixed issue with allowing tags to be added to entities other than token.

## Version 1.0.53

Fixing issue with missing Wall Height controls.

## Version 1.0.52

Added the option to pan canvas just for the GM.

Added option to use tagger or current location to create tokens.

Added scene data to context when altering an entity, or sending a notification, or sending a chat message, or changing elevation.

Changed Hurt/Heal to be able to roll a dice without having to use square brackets.

Allow roll tables use tables in compendiums.

Fixed some really messed up code when rolling from the roll table.

Fixed issues with sending token data to tiles triggered by other tiles.

Changed the Stop if doesn't exist filter to now check for a count of entities.  Before it was set to > 0, now you can have it check to see if the are more than 3 tokens.  You can also now check other collections.  So you can check the count of tiles, or walls, or items that are currently being tracked, and not just tokens.

Added a filter Tile triggered, that will now check the number of times the Tile has been triggered.  So you can stop remaining actions depending on how many times the tile has been triggered.  And with the addition of this filter, the Min. Required field has been removed.  Since this filter essentially takes its place, with greater flexibility.  As with other changes, if your Tile already uses this feature it will still function, and remain on the Tile sheet, but for any furture Tiles, or ones that never had that set, the field won't appear and you'll need to switch to using the filter.

Added a filter Token triggered, that will check the number of times a token has triggered the Tile.  So you can now have the trap only trigger the thrird time a token enters the area.

Updated the attribute filter to be able to check on attributes from other collections than just tokens.

Added the option to add `and` and `or` when using the attribute filter.

Fixed issues with getting entities from within the Tile if the GM is not on the same scene as the players.

Fixed an issue when getting location from a tagger tag.

Also added the option to have a door trigger a tile.  You know... no biggie.

Added Levels support when determining if a token is within a Tile. thank you rinnocenti.

## Version 1.0.51

Added two new triggers, On Combat Start and On Combat End.

Fixed an issue with alter that it wouldn't alter the Actor data even though it would find the actor information.

Updated the audio settings so you can play the audio clip for the triggering player, or for the player that owns the Token.  So the GM can trigger sounds for the players now.

And cleared up the text description so it makes mroe sense what the setting is refering to.

Clamped the volume settings so that it can't exceed 1.

Fixed an issue in PF2E where clicking on a Tile was broken.

Fixed an issue with passing the action id properly.

Fixed the Multiple Anchors based on DC macro.

Added the option to cycle through images randomly.

Fixed an issue with how other modules can add their actions to Monks Active Tiles.  To avoid duplication of action names.  This will require all Tiles within your world be adjusted... but it should be handled automatically by Active Tiles.

## Version 1.0.50

Added the option when changing Door state to change from regular to secret door.

Added two new When options, On Combat Round start, and On Combat Turn start

Allow movement for Ambient Light and Ambient Sound.  Although it's a little weird and won't actually update until it reaches its destination.

Added error checking to make sure Hurt/Heal evaluates to a number.  Thsi should prevent the action from setting the actors HP to 0.

Allow the Delete action to delete Ambient Light and Ambient Sound

Added the option to select by tag when filtering by first entity and filtering by attribute.

Added the option to go to an achor if the Check if tokens exist filter returns no actors.

Fixed issues with running a chat macro instead of a script macro

Added support for adding/deleting a Tagger tag to an object

## Version 1.0.49

Fixed issues with long names not being properly clipped when using the Cycle Images action.

Added the option to select previous or tagger for location destinations.

Added a Hook for declaring a trigger group, so that modules can set themselves up as their own group.

Added a new action to create a Journal Note on the canvas

Fixed an issue with sound effects being restricted to a scene.

Fixed an issue where selecting a Token instead of an Actor for the attack action was resulting in not being able to find the Item.

Updated the filters so you can set what tokens to use if they're the first ones in the list.

Fixed an issue where resetting the history was clearing out changes made due to a refresh of the Dialog.

Fixed an issue where having Item Piles and Active Tile both active would cause multiple item lists to appear on the canvas.  It will now set the option to off if Item Piles is detected.

Added support for Kandashi's Fluid Canvas.  So those commands can be called directly from Active Tiles.

Fixed an issue where items dropped from a Compendium onto the map were causing errors.

## Version 1.0.48

When using teleport, if the GM teleports a token it will now change scenes for the player if that's the player's character.

Added the option to trigger other Tiles while performing a Move Token action.

Fixed issues with Alter action not being able to find if the property exists.

Allow players to open a journal if the GM isn't logging in.

Added a Filter to get tokens with specific attributes.  You can use operators like `=, >, <, <=, >=, !=` in front of the value to check for.

Fixed an issue where a blank entity id was causing an error

Added Character to the properties sent to a Macro.

Fixed an issue with goto logic and how it gets a copy of the context information.

Also fixed an issue with going to an anchor.  It was failing if a stop was requested.

Added setting for dropping an item on the canvas.

Removed the Within Reach macro from the compendium since there's a filter that covers it.

Japanese translations, thank you tonishi

## Version 1.0.47

Fixed an issue with normalizing a Tile when it's created.

Fixed issue with assigning an Item, then name wasn't dynamic.

Fixed an issue where an item deleted from an actor was causing errors with the Attack action.

Added the Delete action.

Added the First filter, so you can select the first item in the list.

Wrapped the tile refresh function properly.

Fixed an issue with the reported point that caused the Tile to trigger

Added the option to drop an item on the Canvas an have it create a Tile with the same image, and actions setup so that a player can click the item and put it in inventory.

Added a macro to setup a Tile so that it can be moved around by a token. And a macro to do the work.

## Version 1.0.46

Fixing an issue finding a location name

## Version 1.0.45

Fixing an issue with the `=` in alter action

## Version 1.0.44

Added the feature of changing the sidebar tab or canvas tool to match the default entity type needed for the select entity field.  And changing it back once done selecting.

Updated the function that grabs the entity name so that it's dynamic rather than relying on the last value collected whent he entity was selected.

Added the feature of selecting the current canvas position

Added Tagger support so you can now refer to entities by their tag.

Added Cycle image list action, you can select individual files or use wildcards

Added checking for required fields

Added conditional fields that will show/hide depending on what's been selected in other fields.

Fixed an issue with action re-ordering

Fixed an issue with action deleting

Added the feature of default values when creating brand new actions

Tidied up some styling, gave the actions more room and standardised the button sizes.

Added syntax highlighting and reviewed all the action names to make sure what was happening was a bit clearer.

Added a new macro so people can do multiple actions depending on the value of a request roll rather than just pass and fail.

Standardized how the location is retrieved.

Added scaling for panning the canvas

Added option to preserve setting when teleporting a token to a new scene.  Just in case you have tokens already set up on that scene and want to use the properties already set up.

Added the option to use the alter action value with an `=` so Active Tiles will try and evaluate whatever is in that field.

Updated the play sound action to have a dropdown for either percent of value, and changed the number to a slider.

Updated the stop sound action to work on multiple Tiles.

Updated the change door state to work with multiple Walls.

Fixed issue with languages drop down not showing

Added option to open a Journal Entry using Enhanced Journals if it's installed

Fixed an issue with changing the permissions of an object erasing all the flag data

Updated the distance check to respect a Tiles rotation, and give you more flexibility it what you want in terms of distance.  So you can have within the Tile, within a certain distance formt he Tile, and greater than a certain distance from the Tile.  It will now also respect the edge of the Tile rather than working off the center, so if you have an odd shaped Tile it will check from the closest edge.  Also added a dropdow so you can select distinct pixels or use the scenes grid size.

Added the option to have anchors stop the current flow of actions.  This should trim down the need for a whole bunch of Stop actions.

Fixed up issue with rotated Tiles

## Version 1.0.43

Fixed an issue with attacks not rolling correctly.  v9 changed rolls to being async and I forgot that I did use that function.

## Version 1.0.42

Fixed issue with not being able to create new actions

Started to add fixes for actions that can't be run without a GM.

Integrated with Enhanced Journal a little better.

Hopefully fixed an issue with PF1 and attacks

## Version 1.0.40

Fixing an error with creating a new Tile.

Fixing issues missed with v9 changes.

## Version 1.0.39

Updates to support v9

Fixed an issue with the delay action if it's a proper number rather than a strings

Fixed an issue with checking if a Tile can be triggered.  Some of the new triggers were firing even when they shouldn't have been.

Fixed an issue with how the history was being saved

## Version 1.0.38

Added context menu to action list so you can now clone an action.

Fixed an issue when altering a flags property.  A previous fix was set to ignore anything that was null, but flags are commonly undefined.

Added the option to limit the number of loops the jump to anchor will take, and added the option to end after the loop is done, or resume the remaining actions.

Fixed an issue on hover if the Tile has no trigger data

Added the point that triggered the Tile to the values being sent.  So Macros now know a bit more about where ont he Tile the click happened.

Moved the click function to it's own code attached to the Tile.  This will let other modules send a click even directly to a Tile.

## Version 1.0.37

Fixed an issue with re-ordering a newly created action.

Added option to add action controls as numbers and not just text

Changed how delay works now.  I wasn't able to do it previously but now that Active Tiles can save a state and resume later, I've changed the delay to it's own action.  This means that actions needing to be delayed will stay in the action list.  Previously they'd be put in their own loop to complete and caused some strange issues.  It should not affect current actions that have delay set.  The control for delay will still show up for the old action but won't be available for newly created actions.

This also gives some greater flexibility with how long you delay.  Using `1-5` will delay randomly between 1 to 5 seconds.  And using `1,4,8,12` will randomly pick between 1, 4, 8, or 12 seconds.  And they can be used together.

Added Triggering Tile to the Move action.  You could always select it as the entity to use, but now there's a convenient button to click to select it.

Added error checking to make sure an audiofile exists before trying to play it.

Updated the Attack option to select either a Token or an Actor.  Previously you needed to select an Actor, but that was causing confusion.  If you select a Token instead it will then find the related Actor.

Added option to start a combat after adding tokens to it.

Added the option to call macros with extra data.  The core macro call wasn't sending everything that would be needed.  I was relying on Advanced Macros to provide the extra data, but if Advanced Macros aren't available I added code to handle it the same way.

Added correct code fo Hover In and Hover Out.  I can't remember who provided the code as it's been awhile, but thank you!  I appreciate it.

Added two new ways to trigger, On Stop when the token stops within the Tile, and On Double Click, same as click but more of it.

Fixed issues with players calling Active TIles when the GM is away.

Fixing an issue with clearing the save state.

Fixed an issue where altering a null value was failing

Added a filter to make sure that tokens exist.  This is because requesting a roll will default to the current party if no tokens are selecting.  This could cause issues.

## Version 1.0.36

Added option to play playlist track.

Added option to run chat commands using the chat action

Fixed issue with how chat messages are sent, and who is shown to have sent them.

Added option to reset history after a delay, so there can be a cooldown period.

Revamped the run macro action so that running as GM or Player is now an option from Active Tiles and doesn't need additional modules.

Macros run by players can now return results to the GM and stay in sync with the remaining actions.

Added Hook so that other modules can add options to the actions list.

Added support for Levels 3D so that tokens can be clicked while using that module.

Corrected French tanslations, thank you Sasmira

Fixed issues with rotated Tiles not activating correctly.

Added the option to pause remaining actions while an action completes.  This means that Tokenbar requests can now be rolled by players... provided Tokenbar is updated.

## Version 1.0.35

Added chat buttle checkbox for Chat Messages, just in case you don't want the chat bubble to appear.

Change the functionality of the in character checkbox to better match what Foundry uses.  I think it was using the players name too soon.

Fixed an issue with Manually Triggering the tile.

## Version 1.0.34

There is now a filter to remove Tokens that aren't within a specific distance to the Tile.

There is some rudimentary logic now, you can set anchor points, jumpt to those anchor points, or stop any remaining actions.

You can now pause or unpause the game using an action

You can now activate Difficult Terrain from the Enhanced Terrain Layer

Changed the tile trigger action so that it can now trigger the original tile.  This was originally put in place to stop infinte loops... but with it removed you can now do repetative tasks.

It will now stop any remaining tasks if the Tile is deactivated and it was in the middle of processing tasks.

Added the method that the tile was triggered to the information sent to a macro.

Manually triggering a Tile will now select the currently controlled tokens.  So when a Tile is set to maually trigger and another Tile triggers it, you can use tokens.

## Version 1.0.31

Changed the Action config so that the autofill for Tokens will populate with token attributes and Tiles will populate with tile attributes.

Added HoverIn and HoverOut as ways to trigger a Tile.  Unfortunately it only works if the Tile layer is active.  Working on providing it for the Token layer aswell.

Added french translation

Added macro packs with a Macro to set all Active Tiles to active.

Added option to select what tokens are teleported rather than just relying on the triggering token.

Fixed up teleport so that if the the player is on a different scene than the GM the token can still be moved.

Added integration with Better Tables

Added option to check permissions for opening Journal Entries.

Added option to activate the scene when switching scenes.

BREAKING CHANGE
Changed to using continue as the value to alter if yuo want actions to continue.  This will unfortunately have an effect on any Macros that currently return {result: false}, this will need to be changed to {continue:false}

I've also updated the way that tokens are passed between actions.  It will start with the triggering Tokens, but the currently viewed Tokens can be changed.  So if you request a saving roll, you can now set the current tokens to be the ones that passed or failed, and then further actions can switch the current tokens back to the triggering tokens.  What this means is you can now have a trap, that takes the tokens that failed and apply an active effect to them, then teleport all the tokens to a new location if any of them failed.

## Version 1.0.30

Fixed issue with the tile history saving.

Added option to open journal entry just for the GM.

## Version 1.0.29

Added option to use the previous value for Activate.  So if module returns {activate: Boolean} you can use that value for Activate/Deactivate.

Fixed an issue with sound effects stopping.  Instead of using the requested entity, it was just using the Tile.

Fixed an issue with Chat Message where it was failing if there were no system languages.

Changed "Open Journal Entry" to "Open Entity Sheet" to allow the option to open up both Journal Entries and Actor sheets.

Fixed an issue with lighting effects that would disappear when walking over a Tile.  It's a bit of a patch though as I think there's an issue with Foundry code.

## Version 1.0.28

Fixed issue with getHistory not returning to correct countTriggered

Fixed issue with resetHistory when deleting token history when multiple tokens have history.

## Version 1.0.27

Added option for triggering with a minimum number of tokens.  So if you want the entire party to walk across a Tile before it triggers you can now do that.

Per Token has now changed to keeping a history of all the triggereing events that have happened to the Tile.  That way I can, in the future, improve upon what conditions trigger the Tile.

In line with changing from Per Token information to keeping a history, I've change the interface to using hasTriggered(tokenid, method, userid), countTriggered(), addHistory(tokenid, method, userid), removeHistory(id), and getHistory(tokenid)

Added the Hurt/Heal action to make it easier to alter HP while still respecting temporary hitpoints

Added the Reset Trigger History action, so you can reset the triggering history of a Tile.

Updated the stop sound action so that it can stop playing all ambient sounds and not just the Tile sounds.

Removed libRuler patching, since the module has now been patched with updates.  Thank you very much caewok!

## Version 1.0.26

Allow sound files to use wildcard when selecting.  So the Play Sound action can be randomized.

Added entity and current values to the Alter action.  Entity could be different than the triggering token, and current value will let you alter something based on the returned results of a previous action.

Added looping the the play sound action

Added Stop sound action, so you can now stop the looping sound of a Tile.

Added current values to the notification handlebars context, so you can use returned results in notifications.

Added the same to the chat message, and also added the current entity which might differ from the triggering token.

Fixed issue with polyglot language not being set.

Added option to only animate a Tile for the triggering player, instead of for everyone.

Fixed issue with setting permissions.  And prevented the canvas from panning to a random token.

Fixed issue where once per token was not being set by the On Click action.

Fixed issue where actions that were delayed by some time weren't firing.

Added API to support macros adding, checking, and reseting the once per token data.

Added elevation action, which is pretty much just a shorthand for alter.

## Version 1.0.25

Changes the way the trigger functions are called.  This isn't really visible to the players/GM but should make it easier behind the scenes to pass variables.

Added option to Pan Canvas to choose who the canvas pans for.

Fixed an issue with Canvas pan that was preventing the panning from being animated.

Added option of "From Previous" for Create Token, and Add Item actions.  What this will allow, is if a Roll Table is immediately above the Create or Add Item action, it will take the values from the Roll Table and use them.  So you can automatically create a monster from a rolltable, or automatically add an item from a Roll Table.

Activate can now be passed multiple entities.

On Click will now use the currently controlled Tokens.

Macros will get passed all the results from previous actions in the values property.  Accessed via arguments[0].values.

Added option to set the volume ofa Play Sound action.  If you want to set it to a specific volume, use a floating point number for percentage.  If you want to set ti as a percentage of the Core Ambient volume, use actual percent.  So 0.5 will set it to 50% volume.  And 50% will set it to 50% of the Foundry Ambient volume.

Updated the Chat Message so that it will use the correct TOken.  And can even be used to specify what Token does the Chat Message.  Along with allowing in character chat bubbles.

Fixing the Chat Message resulting from a Roll Table roll.  Before it was always from the GM, now if a Player activates it, it will show as coming from the player.

Updated the permissions action so that setting the permissions for everyone will set the default permission.

Repositioned the set target code in the attack action so that target are added before the attack happens.

## Version 1.0.24

Add option for teleport to delete the source Token instead of just making it invisible.

Allow both Tiles and Drawing to be moved.

Allow Drawings to be shown/hidden.

Update the attack action for PF2 and PF1

Add option to roll the attack instead of just displaying the chat card of the attack.

Added an action, You can now change the scene for a player.

Added another action, Add to combat, so you can add tokens to a combat.

BREAKING CHANGE, Updated the macro execution, thank you tposney, so that it should handle arguments the same way that Trigger Happy does.

Removed some debug information that was constantly being added.

## Version 1.0.23

Added a new action, trigger another Tile.  So now one Tile can trigger a different one

Added spells to the Attack action.

Added roll mode option tot he Attack action.

## Version 1.0.22

Fixed issue with the action config if there aren't any actors added to the world yet.

Added info if there's no token to teleport when a teleport action is triggered.

Allow Move Token action to move to a Tile and not just a location.

Removed the try catch blocks from individual actions and put it up one level, so that if any actions have an error it can be reported.

Creating a token can now use a Tile instead of just a location as a destination for the Token.

Added Attack action.  You'll need to set up an actor with the attack you wish to use but this can be used to calculate the damage of a trap.

Changed how macros are executed.  Before I was passing it back to the player to run the full macro, changed the code so the player runs a previously calculated version.  Means I don't have to recalculate arguments and hopefully I've fixed a bug where the macro won't run.

Fixed up issues with stopping the Token from moving.  Make it integrate with libRuler a little better and not require as many saves to the database.

Added cool down period for movement so if the player spams the movement key, and the Tile requests a stop, that it will briefly halt the movement of that Token even if more movement keys are pressed.

Added option to restrict a sound to a scene.  So only the players viewing the scene will hear it, GM's will still hear the sound though so they know what's happening.

## Version 1.0.21

Added typeahead to the Alter action Attribute field to make it a bit easier to know what goes there.

Fixed an issue with Handle bar support if the Tile is manually Clicked and there's no Token to add to the context properly.

Fixed issue when creating a chat message with no Token present.  It didn't know who to whisper to.

Added Permissions action. So you can now change the permissions of an entity when a Tile is triggered.

Fixed an issue with On Click and who's allowed to control the triggering.  It will now only trigger for the role that's been selected.

possibly BREAKING CHANGE, I had mis-labelled the variable name for who gets to control the trigger.  It's fixed now, but if you had a Tile that you set Controlled By, you'll need to change it back.  On the plus side, it should respect that now, whereas it wasn't working at all for previous versions.

Fixed an issue with a player manually triggering a Tile.

## Version 1.0.20

Removing debug information

Fixing small issue when a player tries to trigger a Tile.

## Version 1.0.19

Fixed issue when changing action, it would retain information for the previous action, and some of that data was incompatible with the next action.

Fixed issue where updating the action, wasn't using localization for the name.

Fixed issue where the delayed seconds weren't showing up on the action list.

Added the much asked for "On Click" trigger, so if you're on the token layer and the tile is set to On Click, it will trigger when clicked.

Updated the Action Config screen to use decimal seconds

Fixed issue where the display for 'pan canvas' was displaying snap information rather than location information.

Teleport will now let you avoid other tokens at the destination.  It will do its best to find the closest available spot to the destination, but it can get a little weird if transporting to a different scene.

Teleport should center your screen so the token is still under your mouse... but when switching to a different scene I can't figure out how to calculate it properly.

Increased the fade time when switching to a new scene so that it has time to load the scene in the background.

Fixed an issue where a teleported token was no longer the token being referenced in further actions because it was essentially a new token.  Updated the code so it will reference the new token from that point on.

Creating a token action will now also use a Tile for a drop location.  And you can set the token to be created as invisible.

Alter will now accept dice rolls using the [[1d4]] notation, and can be rolled to a chat message, and have the roll mode set properly.

Fixed an error in the code with Alter action and parcing it as a float properly.

Updated the Play Sound action to allow for sound to be played for everyone, gm only, and triggering token.

Fixed an issue with Play Sound so that it will respect who it's supposed to play for.

Fixed an issue with Play Sound that the label wasn't using localization.

Added toggle option to the Change Door State.  If the door is locked it will not toggle, but if open or closed it will toggle between the two.

Added the option to notification to set who it should be shown to.

Fixed an issue with notification so that handle bar replacements are done properly.

Fixed an issue with notification so that the label is created properly.

Fixed an issue with Chat Message so that it gets the speaker properly.

Fixed an issue with Chat Message so that handle bar replacements are done properly.

Added option for flavor text to the Chat Message.

Added option for roll mode to Roll Table.

Fixed issue that prevented Reset Fog action from working.

Fixed issue of who the journal is displayed to.  Previously it was just showing to the GM, now you can have it show to everyone, players, or the triggering token.

Added the "Add Item" action.  So when the Tile is triggered it will add the specific item to the token's inventory.

Fixed issue with teleporting preloading a scene.

BREAKING CHANGES!!!

I've updated how I pass tiles and tokens to functions, this will break Monk's TokenBar.  It's fixed, but TokenBar will need to be released and updated for it to work.

## Version 1.0.18

Added option to choose all Tokens currently within the Tile, to go along with "Current Tile", "Triggering Token", and "Player Tokens"

Added option to teleport to a Tile instead of an x/y location.  This way you can move to destination of the teleport easier.

Added additional trigger modes, On Movement, On Enter/Exit, and On Click.  Movement will trigger if the Token moves at all within the Tile (this includes entering and exiting the Tile).  On Enter/Exit will fire on both entering and exiting (be aware this can cause the Tile to trigger twice if the Token moves across it).  And On Click makes it so the Tile will not trigger at all unless you manually click it.

Added option to trigger based on who is controlling the token.  Currently it's restricted to the type of token, but if a GM moves a player token, you might not want the Tile to trigger.  The text has been changed to make it a little clearer what's meant by each setting.

Removed the option to add an animation when teleporting.  It was a bit silly and can be replaced using actual animations via a macro.

Teleport will flash an overlay over the screen when teleporting begins to make the transition a little less jarring, and will pan the canvas so that the token is in approximately the same spot it was relative to the screen.  The overlay and canvas pan only affect the player.

The GM will now receive a notification if a token has teleported to a different scene.

If the teleport is to a different scene it will detect a scene shift and begin preloading it.

Alter will now check the actor of a token to see if it can apply the changes there if it can't find the attribute on the token itself.  If the property being referenced is an object it will try and use the .value property.  The value part now supports handlebar substitutions.

Notification, and Chat Message now support handlebar substitutions.  actor, tile, token, and user can be used for related property names.

Active Effects should now be supported on PF2E

Fixed issues with playing an animated Tile wasn't being shown to players.

Executing a macro has hopefully gone through it's last change in awhile, sorry for changing the arguments around all the time.  I think I've settled on the proper order now.  Unfortunately due to the way Active Tiles is called I need to include the token, tile, and actor information within the arguments.  So the actual arguments passed from Active Tiles will be included in an args property.  This is a little weird as you now have to reference it using args[0].args[0] for the first property.  The data added to the args field will be split on spaces, but strings can be quote delimited.  And it will also support handlebar substitution.

Overridden functions are now using libWrapper

## Version 1.0.17

Adding action, Open journal

Fixing macros so they'll run as the correct user.

## Version 1.0.16

Fixing minor issue with determining what entity the action is being applied to.

Adding another action, you can start or stop an animation on a Tile.

## Version 1.0.15

Fixing support for Levels

## Version 1.0.14

Sorted the list of actions that could be taken.

Cleaned up the display for setting up actions.

Added option for action controls to have a default value

Added movement action, so you can move a token along a path.  Add multiple moves for the same token and set the first ones to wait, and you can add a complex path.

Added the create token action, so you can create a Token on the scene when a tile is triggered.

Added active effect action, so you can add an effect to a token.

Added support for Levels, to make sure the Tile is on the same level as the triggering token.

## Version 1.0.12

Fixed issue with displaying the delay by text box

Added ability to reorder actions

Added option to stop with the remining actions if the function called returns false.  Helpful for macros and requsting a roll.

Added ability to trigger the tile manually.

Added Reset Fog of War action.

Switched from overriding the Tile HUD to just adding the controls to the Tile HUD.  This should make it easier to maintain in case Foundry changes the Tile HUD.

## Version 1.0.11

Fixed issue when adding actions to a new Tile.

Fixed issue with localization when appending actions.

Fixed issue with Delete Action icon

Fixed issue when teleporting tokens not saving position.

## Version 1.0.10

Fixed issue with multiple walls being changed at the same time.

Fixed issue with secret doors not being updated.

Fixed display name so that it includes the wall id

adding advanced macro execution.

Added polyglot support with chat messages

Changed how actions are saved.  BE AWARE that instead of svaing when you update the action, the action won't save unless you save the Tile.

## Version 1.0.9

Added support to activate/deactivate lights and sounds

## Version 1.0.8

Fixed issue with tokens sneaking into the tile by stopping right on the edge of the tile.

Fixed conflict with Window Control module.  The module didn't support maximizing multiple windows all at the same time.

Fixed issue with data not saving to the database when multiple triggers fire at once.

Fixed issue when selecting an entity, it was displaying as if it were a location.

Added option to animate the canvas pan on teleport

## Version 1.0.7

Fixed libWrapper support

Updated the code that checks on cancelling the remaining animation.

## Version 1.0.6

Added libWrapper support

Overrode Ruler moveToken so that I can easily cancel pending movements.

## Version 1.0.5

Added localization text

Fixing issues with the standard ruler.

Trying to fix issues with cancelling the rest of a multi-part path.

## Version 1.0.4

Getting close to releasing!! Yayy!!

Added changes to support players firing a trigger.

Restricted which actions can be delayed

Added more localization updates

Started adding localization

Prevented the scene from changing if a player has triggered a teleport, working on code to send the scene change back down to the player.




