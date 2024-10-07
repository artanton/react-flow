import { memo, useCallback, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import PropTypes from "prop-types";

import { TextUpdaterLabel, TextNode } from "./nodeStyled";
import { useUpdateNodesMutation, useFetchNodesQuery } from "./nodesAPI";

const leftStyle = { left: 10 };
const rightStyle = { left: 170 };

// interface TextUpdaterNodeProps {
//   data: {
//     label: string;
//   };
// }
TextUpdaterNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,

  positionAbsoluteX: PropTypes.number.isRequired,
  positionAbsoluteY: PropTypes.number.isRequired,
};

function TextUpdaterNode({ data, id, positionAbsoluteX, positionAbsoluteY }) {
  const [inputValue, setInputValue] = useState("");
  const { refetch: refetchNodes } = useFetchNodesQuery();
  const [updateNodes] = useUpdateNodesMutation();

  const onSubmit = useCallback(
    async (evt) => {
      setInputValue(evt.target.value);
      const position = {
        x: positionAbsoluteX,
        y: positionAbsoluteY,
      };
      await updateNodes({
        id: id,
        position,
        data: { label: `${inputValue}` || `node${id}` },
      });
      setInputValue("");
      refetchNodes();
    },
    [
      updateNodes,
      id,
      refetchNodes,
      positionAbsoluteX,
      positionAbsoluteY,
      inputValue,
    ]
  );

  // useEffect(() => {
  //   setInputValue(data.label);
  // }, [data.label]);

  return (
    <TextNode>
      <Handle type="target" position={Position.Top} id="a" style={leftStyle} />
      <Handle type="target" position={Position.Top} id="b" style={rightStyle} />
      <div>
        <TextUpdaterLabel htmlFor="text">{data.label}</TextUpdaterLabel>
        <input
          id="text"
          name="text"
          type="textarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onMouseLeave={onSubmit}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        style={leftStyle}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="d"
        style={rightStyle}
      />
    </TextNode>
  );
}

export default memo(TextUpdaterNode);
