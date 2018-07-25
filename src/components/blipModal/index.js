//  import { EventEmitter } from '@lib/eventEmitter'

import { Component } from '@component'
//  import html from 'nanohtml'

//  const ANIMATION_TIMEOUT = 300;

export class BlipModal extends Component {
  /**
   * Component state
   */
  $defaults = {
    isOpen: false,
    closeOnEsc: false,
    size: '',
    title: '',
    onBeforeOpen: () => {},
    onOpen: () => {},
    onAfterOpen: () => {},
    onBeforeClose: () => {},
    onClose: () => {},
    onAfterClose: () => {},
    onEnter: () => {},
  }

  constructor(configOptions) {
    super()

    this.configOptions = {
      ...this.$defaults,
      ...configOptions,
    }

    this.props = {
      isOpen: false,
    }
  }

  /*
    Setup custom select view
  */
  createElement(props) {
    this.props = {
      ...this.props,
      ...props,
    }
  }

  update(props) {
    console.log('test')
  }
}
