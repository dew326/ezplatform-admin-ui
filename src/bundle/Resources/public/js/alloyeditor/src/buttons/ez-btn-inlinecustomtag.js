import PropTypes from 'prop-types';
import EzBtnCustomTag from './ez-btn-customtag';

export default class EzBtnInlineCustomTag extends EzBtnCustomTag {
    getUpdateBtnName() {
        return `ezBtnInline${this.customTagName.charAt(0).toUpperCase() + this.customTagName.slice(1)}Update`;
    }
}

EzBtnInlineCustomTag.propTypes = {
    editor: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    tabIndex: PropTypes.number.isRequired,
};
