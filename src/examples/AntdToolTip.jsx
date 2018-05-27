import React, {Component} from 'react';
import { Tooltip } from 'antd';

class AntdToolTip extends Component{
  render(){
    return (
      <div>
        <Tooltip title="some message">
          <div>This is a Div With ToolTip</div>
        </Tooltip>
        <Tooltip title="some message">
          <span>a span</span>
        </Tooltip>
        <Tooltip title="some message">
          <a>a span</a>
        </Tooltip>
      </div>
    )
  }
}

export default AntdToolTip;