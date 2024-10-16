import React, { useEffect } from 'react';
import { ModalBackdrop, MadalLayout, CloseBtn } from './modalWindowStyled';
import { NodeForm } from '../forms/nodeForm/nodeForm';
import { EdgeForm } from '../forms/edgeForm/edgeForm';
import { ImCross } from 'react-icons/im';

export const Modal = ({isOpen, onClose, element})=>{

    useEffect(() => {
        const closeModalOnEsc =( e:KeyboardEvent) => {
          if (e.key === 'Escape') {
            onClose();
          }
        };
        window.addEventListener('keydown', closeModalOnEsc);
    
        return () => {
          window.removeEventListener('keydown', closeModalOnEsc);
        };
      }, [onClose]);
    
      const closeModalOnBackdrop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };
    
    if (!isOpen) return null;
    return(
        <ModalBackdrop onClick={closeModalOnBackdrop} >
            <MadalLayout>
                <CloseBtn onClick = {onClose}> <ImCross /></CloseBtn>
                {element.position?<NodeForm el={element} onClose={onClose}/>:<EdgeForm el={element}/>}

            </MadalLayout>

        </ModalBackdrop>
    )
};