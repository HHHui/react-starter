import './ClickPopOverlay.less';
import React, { Component } from 'react';

const toolTipStyle = {
  position: "relative",
  display: "inline-block"
}

const overlayWrapStyle = {
  position: 'absolute',
  color: '#fff'
}

const overlayInner = {
  padding: 8,
  backgroundColor: '#000'
}

const DIRECTIONS = {
  t: {
    bottom: 'calc(100% + 8px)'
  },
  b: {
    top: 'calc(100% + 8px)'
  },
  l: {
    right: 'calc(100% + 8px)'
  },
  r: {
    left: 'calc(100% + 8px)'
  }
}

const ARROW_DIRECTIONS = {
  t: {
    left: 10,
    top: '100%',
    borderRight: '8px solid transparent',
    borderLeft: '8px solid transparent',
    borderTop: '8px solid black'
  },
  b: {
    left: 10,
    bottom: '100%',
    borderRight: '8px solid transparent',
    borderLeft: '8px solid transparent',
    borderBottom: '8px solid black'
  },
  l: {
    top: 10,
    left: '100%',
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    borderLeft: '8px solid black'
  },
  r: {
    top: 10,
    right: '100%',
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    borderRight: '8px solid black'
  }
}

const overlayArrow = {
  position: 'absolute',
  width: 0,
  height: 0,
}

class ToolTip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPop: false
    }
  }

  componentWillMount() {
    const { trigger } = this.props;
    const eventMap = {
      "click": "onClick",
      "hover": "onMouseEnter",
    }
    this.triggerProps = trigger.reduce((props, key) => {
      props[eventMap[key]] = this.showPop;
      return props;
    }, {});
  }

  showPop = () => {
    this.setState({showPop: true});
  }

  hidePop = () => {
    this.setState({showPop: false});
  }

  render() {
    const { overlay, children, direction } = this.props;
    const { showPop } = this.state; 
    const overlayWrapStyleWithDir = { ...overlayWrapStyle, ...DIRECTIONS[direction]}
    const overlayArrowWithDir = { ...overlayArrow, ...ARROW_DIRECTIONS[direction] }
    return (
      <div style={toolTipStyle}>
        {showPop && 
        <div style={overlayWrapStyleWithDir}>
          <div style={overlayArrowWithDir}></div>
          <div style={overlayInner}>
            {overlay}
          </div>
        </div>}
        {React.cloneElement(children, {
          ...this.triggerProps,
          onMouseLeave: this.hidePop
        })}
      </div>
    );
  }
}

class ClickPopOverlay extends Component {
  render() {
    return (
      <div style={{marginLeft: 200}}>
        <ToolTip overlay={<span>ToolTip Content</span>} trigger={['click', 'hover']} direction="t">
          <span className="red">What's the fuck</span>
        </ToolTip>
        <a>what</a><a>what</a>
        <div>fuck</div>
      </div>
    );
  }
}


export default ClickPopOverlay;