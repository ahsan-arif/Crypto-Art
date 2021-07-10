import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import assign from 'lodash.assign'

class Modal extends Component {
  constructor(props) {
    super(props) 
  }

  getInititalState() {
    return {
       
    } 
  }

  componentDidMount() {
    this.modalWrap = $('<div class="semantic-modal-wrap"></div>').appendTo('body').get(0)
    this.handle() 
  }

  componentWillUnmount() {
    if (this.modal) {
      $(this.modal).modal('hide')
      this.modal = null
    } 

    $(this.modalWrap).remove()
  }

  componentDidUpdate() {
    this.handle() 
  }

  handle() {
    if (this.props.isOpen) {
      this.modal = ReactDOM.render(
        this.props.children,
        this.modalWrap
      ) 

      $(this.modal)
      .modal(assign({}, this.props, {
        onHidden: () => {
          if (typeof this.props.onHidden === 'function') {
            this.props.onHidden() 
          }

          $(this.modal).remove()
          this.modal = null
        } 
      }))
      .modal('show')
    } else if (this.modal) {
      $(this.modal).modal('hide')
    }
  }

  render() {
    return (
      <div style={{"display": "none"}}></div>
    )  
  }
}

export default Modal
