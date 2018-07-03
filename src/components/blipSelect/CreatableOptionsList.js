import Nanocomponent from 'nanocomponent'
import html from 'nanohtml'
import { EventEmitter } from '@lib/eventEmitter'

export class CreatebleOptionsList extends Nanocomponent {
  constructor(options) {
    super()

    this.options = options

    this.props = {
      options: [],
      newOption: '',
      OptionCreator: undefined,
    }
  }

  /**
   * Render element view
   */
  createElement(props) {
    this.props = {
      ...this.props,
      ...props,
    }

    const renderOption = optionProps => {
      const { OptionCreator } = this.props

      return new OptionCreator({
        onOptionClick: this.options.onOptionClick,
        onTryAccessInput: this.options.onTryAccessInput,
      }).render(optionProps)
    }

    return html`
      <ul>
        ${this.props.options.map(renderOption)}
        ${this._renderAddOption(this.props.newOption)}
      </ul>
    `
  }

  /**
   * Update element callback
   */
  update() {
    return true
  }

  /**
   * Check if current state allows to add new option
   */
  _canAddOption(newOption) {
    return newOption &&
      newOption.trim() !== '' &&
      !this.props.options.some(o => o.label === newOption)
  }

  /**
   * Render add new option
   */
  _renderAddOption(newOption) {
    return this._canAddOption(this.props.newOption)
      ? html`
          <div tabindex="0" onclick="${this.addOption.bind(this, newOption)}" class="blip-select__option blip-select__add-option">
            <small>${this.options.addOptionText}</small>
            <div class="blip-new-option-text">${newOption}</div>
          </div>
        `
      : ''
  }

  /**
   * Dispatch add new option event
   * @param {String} newOption - New option label
   */
  addOption(newOption) {
    const { OptionCreator } = this.props
    const newOptionProps = {
      label: newOption,
      ...OptionCreator.props,
    }

    if (this.options.onAddOption) {
      this.options.onAddOption.call(this, EventEmitter({ newOption: { ...newOptionProps } }))
    }
  }
}
