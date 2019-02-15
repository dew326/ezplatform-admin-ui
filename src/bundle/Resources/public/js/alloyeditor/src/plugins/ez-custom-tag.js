import customTagBaseDefinition from '../widgets/ez-custom-tag-base';

const ZERO_WIDTH_SPACE = '&#8203;';

(function(global) {
    if (CKEDITOR.plugins.get('ezcustomtag') && CKEDITOR.plugins.get('ezinlinecustomtag')) {
        return;
    }

    CKEDITOR.plugins.add('ezcustomtag', {
        requires: 'widget,ezaddcontent',

        init: function(editor) {
            const customTagDefinition = Object.assign({}, customTagBaseDefinition, { editor, global });

            editor.widgets.add('ezcustomtag', customTagDefinition);
        },
    });

    CKEDITOR.plugins.add('ezinlinecustomtag', {
        requires: 'widget,ezaddcontent',

        init: function(editor) {
            const inlineCustomTagDefinition = Object.assign({}, customTagBaseDefinition, {
                editor,
                global,
                template:
                    '<span class="ez-custom-tag ez-custom-tag--attributes-visible" data-ezelement="eztemplateinline" data-ezname="{name}"><span data-ezelement="ezcontent">{content}</span></span>',
                requiredContent: 'span',

                upcast: (element) => {
                    return (
                        element.name === 'span' &&
                        element.attributes['data-ezelement'] === 'eztemplateinline' &&
                        !element.attributes['data-eztype']
                    );
                },

                insertWrapper: function(wrapper) {
                    this.editor.insertElement(wrapper);
                },
            });

            editor.widgets.add('ezinlinecustomtag', inlineCustomTagDefinition);
        },
    });
})(window);
