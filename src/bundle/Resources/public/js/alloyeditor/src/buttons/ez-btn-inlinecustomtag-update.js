import PropTypes from 'prop-types';
import EzBtnCustomTagUpdate from './ez-btn-customtag-update';

export default class EzBtnInlineCustomTagUpdate extends EzBtnCustomTagUpdate {
    /**
     * Creates the custom tag in AlloyEditor.
     *
     * @method saveCustomTag
     */
    saveCustomTag() {
        const { createNewTag, editor } = this.props;
        const nativeEditor = editor.get('nativeEditor');
        const selection = nativeEditor.getSelectedHtml();

        nativeEditor.unlockSelection(true);

        if (createNewTag) {
            this.execCommand();
        }

        console.log(selection.getHtml());
        console.log(nativeEditor.getSelectedHtml(true));

        const widget = this.getWidget() || this.widget;
        const configValues = Object.assign({}, this.state.values);

        widget.setFocused(true);
        widget.setName(this.customTagName);
        widget.setWidgetContent(selection.getHtml());
        widget.clearConfig();

        Object.keys(this.attributes).forEach((key) => {
            widget.setConfig(key, configValues[key].value);
        });
    }
}

EzBtnInlineCustomTagUpdate.defaultProps = {
    command: 'ezinlinecustomtag',
    modifiesSelection: true,
};

EzBtnInlineCustomTagUpdate.propTypes = {
    editor: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    tabIndex: PropTypes.number.isRequired,
};
