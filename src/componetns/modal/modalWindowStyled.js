import styled from "styled-components";

export const ModalBackdrop = styled.div`
position: fixed;
z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
`;



export const MadalLayout = styled.div`
padding-top: 20px;
padding-left: 20px;
background-color: white;
width: 40%;
height: 100%;
z-index: 100;
overflow-y: scroll;
position: relative;


animation: slide-in 0.5s; 


box-shadow: 0 2px 8px 1px rgba(64, 60, 67, .24); 
border-color: transparent;


@keyframes slide-in {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }}

`;

export const CloseBtn = styled.button`
color: red;
background: transparent;
border: none;
outline: none;
position: absolute;
top: 2%;
left: 2%;
&:active {
    outline: none;
    box-shadow: none;
  }

`;