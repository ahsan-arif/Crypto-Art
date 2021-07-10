import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import Modal from '../lib/modal'

class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: false
    }
  }

  handleClick() {
    this.setState({
      openModal: true 
    })
  }

  componentDidMount() {
  }

  componentDidUpdate() {

  }

  onHidden() {
    console.log('hidden') 
    this.setState({
      openModal: false 
    })
  }

  onVisible() {
    console.log('visible') 
  }

  onShow() {
    console.log('show') 
  }

  render() {
    console.log('entry render')

    return (
      <div className="ui container">
        <div className="ui ignored message">
          React-semantic-modal, click below button have a try; 
        </div>
        <div className="ui secondary button" onClick={this.handleClick.bind(this)}>Open Modal</div>
        <Modal isOpen={this.state.openModal}
               duration={500}
               transition={"horizontal flip"}
               closable={false}
               onHidden={this.onHidden.bind(this)}
               onVisible={this.onVisible}
               onShow={this.onShow}>
          <div className="ui small modal">
            <div className="header">hello</div> 
            <div className="content">
              <p>content</p> 
            </div>
            <div className="actions">
              <div className="ui negative button">No</div>
              <div className="ui positive right labeled icon button">
                Yes<i className="checkmark icon"></i>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )      
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('container'))

export default Root
