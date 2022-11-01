import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    console.log('didMount');
  }
  componentWillUnmount() {
    console.log('willUnMount');
  }
  render() {
    return (
      <div className="Overlay">
        <div className="Modal">
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}
