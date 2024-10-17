import styled from "styled-components";

export const TextNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  min-height: 70px;
  border: 1px solid #000;
  padding: 30px 10px 5px 10px;
  border-radius: 5px;
  background: white;
`;

export const TextUpdaterLabel = styled.label`
  /* position: absolute; */

  padding: 20px;
  display: block;
  color: #777;
  font-size: 12px;
`;
export const ImgContainer = styled.div`
  /* width: 150px;
height: 150px; */
  /* object-fit: contain; */
`;

export const Picture = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`;
