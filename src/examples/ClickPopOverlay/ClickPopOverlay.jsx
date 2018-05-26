import './ClickPopOverlay.less';
import React, { Component } from 'react';

class ToolTip extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

class ClickPopOverlay extends Component {
  render() {
    return (
      <div>
        ClickPopOverlay
        <ToolTip>
          <button className="red">What's the fuck</button>
        </ToolTip>
      </div>
    );
  }
}


export default ClickPopOverlay;