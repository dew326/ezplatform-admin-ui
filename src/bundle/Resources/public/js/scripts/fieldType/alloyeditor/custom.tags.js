(function(global, doc) {
    // temp hardcoded inline:
    global.eZ.adminUiConfig.richTextCustomTags.factbox.isInline = true;
    global.eZ.adminUiConfig.richTextCustomTags.call_to_action.isInline = true;
    // endtemp

    Object.entries(global.eZ.adminUiConfig.richTextCustomTags).forEach(([customTag, tagConfig]) => {
        const isInline = tagConfig.isInline;
        const componentClassName = `ezBtn${customTag.charAt(0).toUpperCase() + customTag.slice(1)}`;
        const editComponentClassName = `${componentClassName}Edit`;
        const updateComponentClassName = `${componentClassName}Update`;
        const buttonCustomTagBaseClass = isInline ? global.eZ.ezAlloyEditor.ezBtnInlineCustomTag : global.eZ.ezAlloyEditor.ezBtnCustomTag;
        const buttonCustomTagEditBaseClass = isInline
            ? global.eZ.ezAlloyEditor.ezBtnInlineCustomTagEdit
            : global.eZ.ezAlloyEditor.ezBtnCustomTagEdit;
        const buttonCustomTagUpdateBaseClass = isInline
            ? global.eZ.ezAlloyEditor.ezBtnInlineCustomTagUpdate
            : global.eZ.ezAlloyEditor.ezBtnCustomTagUpdate;

        class ButtonCustomTag extends buttonCustomTagBaseClass {
            constructor(props) {
                super(props);

                const values = {};

                Object.entries(tagConfig.attributes).forEach(([attr, value]) => {
                    values[attr] = {
                        value: value.defaultValue,
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

        class ButtonCustomTagEdit extends buttonCustomTagEditBaseClass {
            constructor(props) {
                super(props);

                this.customTagName = customTag;
                this.attributes = tagConfig.attributes;
            }

            static get key() {
                return `${customTag}edit`;
            }
        }

        class ButtonCustomTagUpdate extends buttonCustomTagUpdateBaseClass {
            constructor(props) {
                super(props);

                this.customTagName = customTag;
                this.attributes = tagConfig.attributes;
            }

            static get key() {
                return `${customTag}update`;
            }
        }

        global.AlloyEditor.Buttons[ButtonCustomTag.key] = global.AlloyEditor[componentClassName] = ButtonCustomTag;
        global.AlloyEditor.Buttons[ButtonCustomTagEdit.key] = global.AlloyEditor[editComponentClassName] = ButtonCustomTagEdit;
        global.AlloyEditor.Buttons[ButtonCustomTagUpdate.key] = global.AlloyEditor[updateComponentClassName] = ButtonCustomTagUpdate;
    });
})(window, document);
