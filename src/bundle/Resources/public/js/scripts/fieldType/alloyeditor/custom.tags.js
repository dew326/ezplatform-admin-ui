(function(global, doc) {
    Object.keys(global.eZ.adminUiConfig.richTextCustomTags).forEach((customTag) => {
        const tagConfig = global.eZ.adminUiConfig.richTextCustomTags[customTag];
        const className = `ezBtn${customTag.charAt(0).toUpperCase() + customTag.slice(1)}`;
        const editClassName = `${className}Edit`;
        const updateClassName = `${className}Update`;

        class buttonCustomTag extends global.eZ.ezAlloyEditor.ezBtnCustomTag {
            constructor(props) {
                super(props);

                const values = {};

                Object.keys(tagConfig.attributes).forEach((attr) => {
                    values[attr] = {
                        value: tagConfig.attributes[attr].defaultValue,
                    };
                });

                this.label = tagConfig.label;
                this.icon = tagConfig.icon || '/bundles/ezplatformadminui/img/ez-icons.svg#tag';
                this.customTagName = customTag;
                this.values = values;
            }

            static get key() {
                return customTag;
            }
        }

        class buttonCustomTagEdit extends global.eZ.ezAlloyEditor.ezBtnCustomTagEdit {
            constructor(props) {
                super(props);

                this.customTagName = customTag;
                this.attributes = tagConfig.attributes;
            }

            static get key() {
                return `${customTag}edit`;
            }
        }

        class buttonCustomTagUpdate extends global.eZ.ezAlloyEditor.ezBtnCustomTagUpdate {
            constructor(props) {
                super(props);

                this.customTagName = customTag;
                this.attributes = tagConfig.attributes;
            }

            static get key() {
                return `${customTag}update`;
            }
        }

        global.AlloyEditor.Buttons[buttonCustomTag.key] = global.AlloyEditor[className] = buttonCustomTag;
        global.AlloyEditor.Buttons[buttonCustomTagEdit.key] = global.AlloyEditor[editClassName] = buttonCustomTagEdit;
        global.AlloyEditor.Buttons[buttonCustomTagUpdate.key] = global.AlloyEditor[updateClassName] = buttonCustomTagUpdate;
    });
})(window, document);
