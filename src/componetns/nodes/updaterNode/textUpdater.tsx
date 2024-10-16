import React, { memo, 
  // useCallback, 
  // useState 
} from "react";
import { Handle, Position } from "@xyflow/react";
// import PropTypes from "prop-types";

import { 
  TextUpdaterLabel,
   TextNode, Picture, ImgContainer } from "./nodeStyled";
// import { useUpdateNodesMutation, useFetchNodesQuery } from "../../../nodesAPI";

const defaultURL = "http://localhost:4000";

const leftStyle = { left: "10%" };
const rightStyle = { left: "90%" };


// TextUpdaterNode.propTypes = {
//   id: PropTypes.string.isRequired,
//   data: PropTypes.shape({
//     label: PropTypes.string.isRequired,
//     fileURL: PropTypes.string,
//   }).isRequired,

//   positionAbsoluteX: PropTypes.number.isRequired,
//   positionAbsoluteY: PropTypes.number.isRequired,
// };

function TextUpdaterNode (element) {
  const { data, 
    // id, 
    // positionAbsoluteX, 
    // positionAbsoluteY 
  } = element;
  // const [inputValue, setInputValue] = useState("");
  // const { refetch: refetchNodes } = useFetchNodesQuery();
  // const [updateNodes] = useUpdateNodesMutation();

  // const onSubmit = useCallback(
  //   async (evt) => {
  //     setInputValue(evt.target.value);
  //     const position = {
  //       x: positionAbsoluteX,
  //       y: positionAbsoluteY,
  //     };
  //     await updateNodes({
  //       id: id,
  //       position,
  //       data: {
  //         ...data,
  //          label: `${inputValue}` || `${data.label}` },
  //     });
  //     setInputValue("");
  //     refetchNodes();
  //   },
  //   [
  //     id,
  //     data,
  //     positionAbsoluteX,
  //     positionAbsoluteY,
  //     updateNodes,
  //     refetchNodes,
  //     inputValue,
  //   ]
  // );

  // useEffect(() => {
  //   setInputValue(data.label);
  // }, [data.label]);

  return (
    <TextNode>
      <Handle type="target" position={Position.Top} id="a" style={leftStyle} />
      <Handle type="target" position={Position.Top} id="b" style={rightStyle} />
      {data.fileURL && (
        <ImgContainer>
        
        <Picture src={`${defaultURL}/${data.fileURL}`} alt={data.label} />
        </ImgContainer>
      )}
      <div>
        <TextUpdaterLabel htmlFor="text">{data.label}</TextUpdaterLabel>
        {/* <input
          id="text"
          name="text"
          type="textarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={onSubmit}
        /> */}
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
