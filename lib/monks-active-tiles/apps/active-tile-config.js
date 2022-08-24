import { MonksActiveTiles, log, setting, i18n, makeid } from '../monks-active-tiles.js';
import { ActionConfig } from "../apps/action-config.js";
import { TileHistory } from './tile-history.js';

class ActiveTileContextMenu extends ContextMenu {
    constructor(...args) {
        super(...args);
    }

    _setPosition(html, target) {
        super._setPosition(html, target);

        let container = target.closest('.item-list');
        let y = container.position().top + (target.position().top + container.scrollTop()) - 55;// - $(html).height();

        html.removeClass("expand-down").css({ "top": `${y}px` }).insertAfter(target.closest('.action-items'));
    }
}

export const WithActiveTileConfig = (TileConfig) => {
    class ActiveTileConfig extends TileConfig {
        constructor(...args) {
            super(...args);

            this.object._normalize();
        }

        static get defaultOptions() {
            let data = MonksActiveTiles.mergeArray(super.defaultOptions, {
                classes: ["monks-active-tiles"],
                scrollY: ["ol.item-list"],
                dragDrop: [{ dragSelector: ".item", dropSelector: ".item-list" }, { dragSelector: ".item", dropSelector: ".file-list" }],
                tabs: [{ navSelector: '.tabs[data-group="triggers"]', contentSelector: '.tab[data-tab="triggers"]', initial: "trigger-setup" }]
            });
            data.tabs[0].navSelector = ".sheet-tabs:not(.trigger-tabs)";

            return data;
        }

        getData(options) {
            let data = super.getData(options);
            data.usingAlpha = ["click", "dblclick", "rightclick"].includes(data.data.flags["monks-active-tiles"]?.trigger);
            data.preventPaused = setting("prevent-when-paused");
            let fileindex = this.object.getFlag("monks-active-tiles", "fileindex");
            data.index = (fileindex != undefined ? fileindex + 1 : '');
            return data;
        }

        get actions() {
            return this.object.getFlag("monks-active-tiles", "actions") || [];
        }

        get files() {
            return this.object.getFlag("monks-active-tiles", "files") || [];
        }

        async _renderInner(data) {
            let html = await super._renderInner(data);

            $('.sheet-tabs', html).append($('<a>').addClass('item').attr('data-tab', "triggers").html(`<i class="fas fa-running"></i> ${i18n("MonksActiveTiles.Triggers")}`));
            let tab = $('<div>').addClass('tab').attr('data-tab', "triggers").css({"position": "relative"}).insertAfter($('div[data-tab="animation"]', html));

            let template = "systems/CoC7/lib/monks-active-tiles/templates/tile-config.html";
            const tiledata = mergeObject({ 'data.flags.monks-active-tiles.minrequired': 0 }, data);

            tiledata.triggerModes = MonksActiveTiles.triggerModes;
            tiledata.triggerRestriction = { 'all': i18n("MonksActiveTiles.restrict.all"), 'player': i18n("MonksActiveTiles.restrict.player"), 'gm': i18n("MonksActiveTiles.restrict.gm") };
            tiledata.triggerControlled = { 'all': i18n("MonksActiveTiles.control.all"), 'player': i18n("MonksActiveTiles.control.player"), 'gm': i18n("MonksActiveTiles.control.gm") };


            tiledata.actions = await Promise.all((this.object.getFlag('monks-active-tiles', 'actions') || [])
                .map(async (a) => {
                    let trigger = MonksActiveTiles.triggerActions[a.action];
                    let content = (trigger == undefined ? 'Unknown' : i18n(trigger.name));
                    if (trigger.content) {
                        try {
                            content = await trigger.content(trigger, a);
                        } catch { }
                    }
                    content += (a.delay > 0 ? ' after ' + a.delay + ' seconds' : '');

                    let deactivated = "";
                    if (a.action == "activate" && a.data?.activate == "deactivate" && (a.data?.entity?.id == this.object.id || a.data?.entity == ""))
                        deactivated = "on";
                    if (a.action == "anchor")
                        deactivated = "off";
                    return {
                        id: a.id,
                        content: content,
                        disabled: trigger?.visible === false,
                        deactivated: deactivated
                    };
                }));

            let disabled = false;
            for (let a of tiledata.actions) {
                if (a.deactivated == "off")
                    disabled = false;
                if (disabled)
                    a.disabled = true;
                if (a.deactivated == "on")
                    disabled = true;
            }

            tiledata.sounds = Object.entries(this.object.soundeffect || {}).map(([k, v]) => {
                let filename = v.src.split('\\').pop().split('/').pop();
                return {
                    id: k,
                    name: filename
                };
            });

            let index = this.object.getFlag('monks-active-tiles', 'fileindex') || 0;
            tiledata.files = (this.object.getFlag('monks-active-tiles', 'files') || []).map((f, idx) => {
                f.selected = (index == idx);
                return f;
            });

            tiledata.poweredBy = !game.modules.get('monks-active-tiles')?.active

            let renderhtml = await renderTemplate(template, tiledata);
            tab.append(renderhtml);

            return html;
        }

        _onChangeTab(event, tabs, active) {
            if (active == "triggers") {
                this._tabs[1].activate(this._tabs[1].active);
            }
            super._onChangeTab.bind(this, event, tabs, active)();
        }

        _onDragStart(event) {
            let li = event.currentTarget.closest(".item");
            const dragData = { type: this.constructor.documentName, id: li.dataset.id };
            event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
            this._dragType = dragData.type;
        }

        _canDragStart(selector) {
            return true;
        }

        _onDrop(event) {
            const cls = this.constructor.documentName;

            // Try to extract the data
            let data;
            try {
                data = JSON.parse(event.dataTransfer.getData('text/plain'));
            }
            catch (err) {
                return false;
            }

            // Identify the drop target
            const target = event.target.closest(".item") || null;

            // Call the drop handler
            if (target && target.dataset.id) {
                let items = duplicate(this[target.dataset.collection]);

                if (data.id === target.dataset.id) return; // Don't drop on yourself

                let from = items.findIndex(a => a.id == data.id);
                let to = items.findIndex(a => a.id == target.dataset.id);
                log('from', from, 'to', to);
                items.splice(to, 0, items.splice(from, 1)[0]);

                this.object.data.flags["monks-active-tiles"][target.dataset.collection] = items;
                if (from < to)
                    $('.item[data-id="' + data.id + '"]', this.element).insertAfter(target);
                else
                    $('.item[data-id="' + data.id + '"]', this.element).insertBefore(target);
            }
        }

        async _onActionHoverIn(event) {
            event.preventDefault();
            if (!canvas.ready) return;
            const li = event.currentTarget;

            let action = this.actions.find(a => a.id == li.dataset.id);
            if (action && action.data.entity && !['tile', 'token', 'players', 'within', 'controlled', 'previous'].includes(action.data.entity.id)) {
                let entity = await fromUuid(action.data.entity.id);
                if (entity && entity._object) {
                    entity._object._onHoverIn(event);
                    this._highlighted = entity;
                }
            }
        }

        _onActionHoverOut(event) {
            event.preventDefault();
            if (this._highlighted) this._highlighted._object._onHoverOut(event);
            this._highlighted = null;
        }

        _getSubmitData(updateData = {}) {
            let data = super._getSubmitData(updateData);
            data["flags.monks-active-tiles.actions"] = (this.object.getFlag("monks-active-tiles", "actions") || []);
            data["flags.monks-active-tiles.files"] = (this.object.getFlag("monks-active-tiles", "files") || []);

            if (data["flags.monks-active-tiles.fileindex"] != '')
                data["flags.monks-active-tiles.fileindex"] = data["flags.monks-active-tiles.fileindex"] - 1;

            return data;
        }

        async _updateObject(event, formData) {
            await super._updateObject(event, formData);

            this.object._images = await MonksActiveTiles.getTileFiles(this.object.data.flags["monks-active-tiles"].files || []);
            if (this.object._images.length) {
                let fileindex = Math.clamped(this.object.data.flags["monks-active-tiles"].fileindex, 0, this.object._images.length - 1);
                if (this.object._images[fileindex] != this.object.data.img) {
                    await this.object.update({ img: this.object._images[fileindex] });
                }
                if (fileindex != this.object.data.flags["monks-active-tiles"].fileindex) {
                    await this.object.setFlag("monks-active-tiles", "fileindex", fileindex);
                }
            }

            //if any of the actions are to cycle the image, then make sure the image lines up with the img at
            /*
            for (let action of (this.object.getFlag('monks-active-tiles', 'actions') || [])) {
                if (action.action == 'imagecycle') {
                    let actfiles = (action.data?.files || []);

                    this.object._cycleimages = this.object._cycleimages || {};
                    let files = this.object._cycleimages[action.id] = await MonksActiveTiles.getTileFiles(actfiles);

                    let imgat = Math.clamped((action.data?.imgat || 1) - 1, 0, files.length - 1);

                    if (this.object._cycleimages[action.id].length > 0) {
                        let entities = await MonksActiveTiles.getEntities({ tile: this.object, action: action }, 'tiles');
                        for (let entity of entities) {
                            await entity.update({ img: files[imgat] });
                        }
                    }
                }
            }*/
        }

        activateListeners(html) {
            super.activateListeners(html);
            var that = this;

            const contextOptions = this._getContextOptions();
            Hooks.call(`getActiveTileConfigContext`, html, contextOptions);
            new ActiveTileContextMenu($(html), ".action-items .item", contextOptions);

            $('.action-create', html).click(this._createAction.bind(this));
            $('.action-edit', html).click(this._editAction.bind(this));
            $('.action-delete', html).click(this._deleteAction.bind(this));
            $('.action-stop', html).click(this._stopSound.bind(this));
            $('.view-history', html).click(function () {
                new TileHistory(that.object).render(true);
            });

            $('.record-history', html).click(this.checkRecordHistory.bind(this));
            $('.per-token', html).click(this.checkPerToken.bind(this));

            $('select[name="flags.monks-active-tiles.trigger"]', html).change(function () {
                $('.usealpha', html).toggle(["click", "dblclick", "rightclick"].includes($(this).val()));
                that.setPosition();
            });

            //$('div[data-tab="triggers"] .item-list li.item', html).hover(this._onActionHoverIn.bind(this), this._onActionHoverOut.bind(this));
            $('.browse-files', html).on("click", this.browseFiles.bind(this));
            $('.add-image', html).on("click", this._activateFilePicker.bind(this));
            $('.filepath', html).on("change", this.addToFileList.bind(this));
            $('.file-list .edit-file', html).on("click", this.browseFiles.bind(this));
            $('.file-list .delete-file', html).on("click", this.removeFile.bind(this));
            $('.file-list .item', html).on("dblclick", this.selectFile.bind(this));
        }

        browseFiles(event) {
            event.preventDefault();
            $(event.currentTarget).next().click();
        }

        _activateFilePicker(event) {
            event.preventDefault();
            const options = this._getFilePickerOptions(event);
            options.wildcard = true;
            options.fileid = event.currentTarget.closest('.item')?.dataset?.id;
            const fp = new FilePicker(options);
            this.filepickers.push(fp);
            return fp.browse();
        }

        addToFileList(event) {
            let filename = $(event.currentTarget).val();
            if (filename != '') {
                let id = $(event.currentTarget).parent().get(0)?.dataset.id;
                if(id) {
                    let file = this.files.find(f => f.id == id);
                    file.name = filename;
                    $(`.item[data-id="${id}"] .image-name`, this.element).html(filename);
                } else {
                    id = makeid();
                    $('.file-list', this.element).append($('<li>').attr('data-id', id).attr('draggable', 'true').attr('data-collection', 'files')
                        .addClass('flexrow file-row item')
                        .append($('<input>').addClass("filepath").attr({ 'type': 'hidden', 'name': `files.${id}.name` }).val(filename).change(this.addToFileList.bind(this)))
                        .append($('<div>').attr('title', filename).addClass('image-name').html(filename))
                        .append($('<a>').addClass('edit-file').html('<i class="fas fa-edit fa-sm"></i>').click(this.browseFiles.bind(this)))
                        .append($('<button>').addClass("add-image").attr('type', 'button').attr("data-target", `files.${id}.name`).hide().click(this._activateFilePicker.bind(this)))
                        .append($('<a>').addClass('delete-file').html('<i class="fas fa-trash fa-sm"></i>').click(this.removeFile.bind(this))));
                    $(event.currentTarget).val('');
                    this.setPosition({ height: 'auto' });
                    this.files.push({id: id, name: filename, selected: false});
                }
            }
        }

        selectFile(event) {
            let id = event.currentTarget.closest('.file-row').dataset["id"];
            let idx = this.files.findIndex(f => f.id == id);

            $(`input[name="flags.monks-active-tiles.fileindex"]`, this.element).val(idx);

            mergeObject(this.object.data.flags, {
                "monks-active-tiles": { fileindex: idx }
            });
        }

        removeFile(event) {
            let id = event.currentTarget.closest('.file-row').dataset["id"];
            let files = duplicate(this.object.data.flags["monks-active-tiles"]?.files || []);
            files.findSplice(i => i.id == id);
            mergeObject(this.object.data.flags, {
                "monks-active-tiles": { files: files }
            });

            $(`.file-list li[data-id="${id}"]`, this.element).remove();
            this.setPosition({ height: 'auto' });
        }

        _createAction(event) {
            let action = { };
            //if (this.object.getFlag("monks-active-tiles", "actions") == undefined)
            //    this.object.setFlag("monks-active-tiles", "actions", []);
            new ActionConfig(action, {parent: this}).render(true);
        }

        _editAction(event) {
            let item = event.currentTarget.closest('.item');
            let action = this.actions.find(obj => obj.id == item.dataset.id);
            if (action != undefined)
                new ActionConfig(action, { parent: this }).render(true);
        }

        _deleteAction(event) {
            let item = event.currentTarget.closest('.item');
            this.deleteAction(item.dataset.id);
        }

        deleteAction(id) {
            let actions = duplicate(this.actions);
            actions.findSplice(i => i.id == id);
            mergeObject(this.object.data.flags, {
                "monks-active-tiles": { actions: actions }
            });
            //this.object.setFlag("monks-active-tiles", "actions", actions);
            $(`li[data-id="${id}"]`, this.element).remove();
            this.setPosition({ height: 'auto' });
        }

        _stopSound(event) {
            let id = event.currentTarget.closest('.item').dataset.id;
            this.object.soundeffect[id].stop();
            delete this.object.soundeffect[id];
            MonksActiveTiles.emit('stopsound', {
                tileid: this.object.uuid,
                type: 'tile',
                userid: null,
                actionid: id
            });
            this.render();
        }

        cloneAction(id) {
            let actions = duplicate(this.actions);
            let idx = actions.findIndex(obj => obj.id == id);
            if (idx == -1)
                return;

            let action = actions[idx];
            if (!action)
                return;

            let clone = duplicate(action);
            clone.id = makeid();
            actions.splice(idx + 1, 0, clone);
            if (this.object.id) {
                this.object.setFlag("monks-active-tiles", "actions", actions);
            } else {
                setProperty(this.object.data, "flags.monks-active-tiles.actions", actions);
                this.render();
            }
        }

        checkRecordHistory(event) {
            // if turning off record-history, then also turn off per token
            if (!$('.record-history', this.element).prop("checked"))
                $('.per-token', this.element).prop("checked", false);
        }

        checkPerToken(event) {
            // if turning on per token, then also turn on record-history
            if ($('.per-token', this.element).prop("checked"))
                $('.record-history', this.element).prop("checked", true);
        }

        resetPerToken() {
            this.object.resetPerToken();
        }

        _getContextOptions() {
            return [
                {
                    name: "SIDEBAR.Duplicate",
                    icon: '<i class="far fa-copy"></i>',
                    condition: () => game.user.isGM,
                    callback: elem => {
                        let li = $(elem).closest('.item');
                        const id = li.data("id");
                        return this.cloneAction(id);
                    }
                },
                {
                    name: "SIDEBAR.Delete",
                    icon: '<i class="fas fa-trash"></i>',
                    condition: () => game.user.isGM,
                    callback: elem => {
                        let li = $(elem).closest('.item');
                        const id = li.data("id");
                        Dialog.confirm({
                            title: `${game.i18n.localize("SIDEBAR.Delete")} action`,
                            content: game.i18n.format("SIDEBAR.DeleteWarning", { type: 'action' }),
                            yes: this.deleteAction.bind(this, id),
                            options: {
                                top: Math.min(li[0].offsetTop, window.innerHeight - 350),
                                left: window.innerWidth - 720
                            }
                        });
                    }
                }
            ];
        }
    }

    const constructorName = "ActiveTileConfig";
    Object.defineProperty(ActiveTileConfig.prototype.constructor, "name", { value: constructorName });
    return ActiveTileConfig;
};
