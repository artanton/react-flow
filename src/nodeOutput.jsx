import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

import { TextNode, TextUpdaterLabel,  } from './nodeStyled';

const leftStyle = { left: 10 };
const rightStyle = { left: 170 };



function OutputNode() {
  
  return (
    <TextNode>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={leftStyle}
        
      />
      <Handle
        type="target"
        position={Position.Top}
        id="b"
        style={rightStyle}
        
      />
      <div>
        <TextUpdaterLabel htmlFor="text">Output: </TextUpdaterLabel>
        <input id="text" name="text" />
      </div>
      
    </TextNode>
  );
}

export default memo(OutputNode);