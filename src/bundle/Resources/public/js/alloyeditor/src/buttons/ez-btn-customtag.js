import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlloyEditor from 'alloyeditor';
import EzWidgetButton from '../base/ez-widgetbutton';

export default class EzBtnCustomTag extends EzWidgetButton {
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

    renderPopup() {
        const attrs = Object.keys(this.attributes);

        return (
            <div className="ez-ae-custom-tag">
                {attrs.map(this.renderAttribute.bind(this))}
                <button
                    className="ez-btn-ae btn btn-secondary ez-btn-ae--custom-tag float-right"
                    onClick={this.saveCustomTag.bind(this)}
                >Save</button>
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
        if (this.props.renderExclusive) {
            return this.renderPopup();
        }

        const css = `ae-button ez-btn-ae ez-btn-ae--${this.name}`;

        return (
            <button className={css} onClick={this.props.requestExclusive} tabIndex={this.props.tabIndex}>
                <svg className="ez-icon ez-btn-ae__icon">
                    <use xlinkHref={this.icon}></use>
                </svg>
                <p className="ez-btn-ae__label">{this.name}</p>
            </button>
        );
    }

    saveCustomTag() {
        this.execCommand();

        const widget = this.getWidget();
        const configValues = Object.assign({}, this.state.values);

        widget.setFocused(true);
        widget.setName(this.customTagName);

        Object.keys(configValues).forEach(key => {
            widget.setConfig(key, configValues[key].value);
        });
    }

    onChange(event) {
        const values = Object.assign({}, this.state.values);

        values[event.target.dataset.attrName].value = event.target.value;

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

EzBtnCustomTag.defaultProps = {
    command: 'ezcustomtag',
    modifiesSelection: true,
};


EzBtnCustomTag.propTypes = {
    editor: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    tabIndex: PropTypes.number.isRequired,
};
