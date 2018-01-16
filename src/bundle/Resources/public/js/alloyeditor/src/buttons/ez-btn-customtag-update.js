import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlloyEditor from 'alloyeditor';
import EzWidgetButton from '../base/ez-widgetbutton';

export default class EzBtnCustomTagUpdate extends EzWidgetButton {
    constructor(props) {
        super(props);

        this.state = {
            values: props.values
        };
    }

    renderString(config, attrName) {
        return (
            <div className="attribute__wrapper">
                <label className="attribute__label form-control-label">{config.label}</label>
                <input
                    type="text"
                    defaultValue={config.defaultValue}
                    required={config.required}
                    className="attribute__input form-control"
                    value={this.state.values[attrName].value}
                    onChange={this.onChange.bind(this)}
                    data-attr-name={attrName}
                ></input>
            </div>
        );
    }

    renderCheckbox(config, attrName) {
        return (
            <div className="attribute__wrapper">
                <label className="attribute__label form-control-label">{config.label}</label>
                <input
                    type="checkbox"
                    defaultValue={config.defaultValue}
                    required={config.required}
                    className="attribute__input form-control"
                    checked={this.state.values[attrName].value}
                    onChange={this.onChange.bind(this)}
                    data-attr-name={attrName}
                ></input>
            </div>
        );
    }

    renderNumber(config, attrName) {
        return (
            <div className="attribute__wrapper">
                <label className="attribute__label form-control-label">{config.label}</label>
                <input
                    type="number"
                    defaultValue={config.defaultValue}
                    required={config.required}
                    className="attribute__input form-control"
                    value={this.state.values[attrName].value}
                    onChange={this.onChange.bind(this)}
                    data-attr-name={attrName}
                ></input>
            </div>
        );
    }

    renderSelect(config, attrName) {
        return (
            <div className="attribute__wrapper">
                <label className="attribute__label form-control-label">{config.label}</label>
                <select
                    className="attribute__input form-control"
                    value={this.state.values[attrName].value}
                    onChange={this.onChange.bind(this)}
                    data-attr-name={attrName}
                >
                    {config.choices.map(this.renderChoice.bind(this))}
                </select>
            </div>
        );
    }

    renderChoice(choice) {
        return (
            <option value={choice}>{choice}</option>
        );
    }

    renderAttribute(attribute) {
        const methods = this.getAttributeRenderMethods();

        return (
            <div className="ez-ae-custom-tag__attributes">
                {this[methods[this.attributes[attribute].type]](this.attributes[attribute], attribute)}
            </div>
        );
    }

    /**
     * Lifecycle. Renders the UI of the button.
     *
     * @method render
     * @return {Object} The content which should be rendered.
     */
    render() {
        const attrs = Object.keys(this.attributes);
        const isValid = this.isValid();

        return (
            <div className="ez-ae-custom-tag">
                {attrs.map(this.renderAttribute.bind(this))}
                <button
                    className="ez-btn-ae btn btn-secondary ez-btn-ae--custom-tag float-right"
                    onClick={this.saveCustomTag.bind(this)}
                    disabled={!isValid}
                >Save</button>
            </div>
        );
    }

    isValid() {
        return Object.keys(this.attributes).every(attr => {
            return this.attributes[attr].required ? !!this.state.values[attr].value : true;
        });
    }

    saveCustomTag() {
        if (this.props.createNewTag) {
            this.execCommand();
        }

        const widget = this.getWidget();
        const configValues = Object.assign({}, this.state.values);

        widget.setFocused(true);
        widget.setName(this.customTagName);
        widget.setWidgetContent(this.getContent());

        Object.keys(configValues).forEach(key => {
            widget.setConfig(key, configValues[key].value);
        });
    }

    getContent() {
        const content = Object.keys(this.attributes).reduce((total, attribute) => `${total}<p>${this.attributes[attribute].label}: ${this.state.values[attribute].value}</p>`,'');

        return content;
    }

    onChange(event) {
        const values = Object.assign({}, this.state.values);
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        values[event.target.dataset.attrName].value = value;

        this.setState({
            values: values
        });
    }

    getAttributeRenderMethods() {
        return {
            string: 'renderString',
            boolean: 'renderCheckbox',
            number: 'renderNumber',
            choice: 'renderSelect'
        }
    }
}

EzBtnCustomTagUpdate.defaultProps = {
    command: 'ezcustomtag',
    modifiesSelection: true,
};


EzBtnCustomTagUpdate.propTypes = {
    editor: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    tabIndex: PropTypes.number.isRequired,
};
