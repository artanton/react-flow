import {  Form } from "formik";
import styled from "styled-components";
import { ImCross } from "react-icons/im";

export const FormContainer = styled(Form)`
display: flex;
flex-direction: column;
gap: 40px;
position: relative;
padding: 40px;

`;


export const BigImg = styled.img`
width: 80%;
aspect-ratio: 1/1;
object-fit: cover;

`;

export const ImgInput = styled.label`
width: 100px;
position: relative;
`

export const ImagePreview = styled.img`
box-sizing: content-box;
width: 100px;
height: 100px;
object-fit: contain;

`;

export const HiddenFileInput = styled.input`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`;

export const DelBtn = styled.button`
/* width: 20px;
height: 20px; */
display: flex;
  justify-content: center;
  align-items: center;

  background: transparent;
border: none;
outline: none;

position: absolute;
bottom: -10%;
right: -22%;
&:active {
    outline: none;
    box-shadow: none;
  }
`;

export const CrossIcon = styled(ImCross)`
color: red;
width: 10px;
`


