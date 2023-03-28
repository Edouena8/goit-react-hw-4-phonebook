import React, { Component } from "react";
import { createPortal  } from "react-dom";
import { ModalBackdrop, ModalContent } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = evt => {
        if(evt.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = evt => {
        if(evt.target === evt.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        return (
            createPortal( 
            <ModalBackdrop onClick={this.handleBackdropClick}>
                <ModalContent>{this.props.children}</ModalContent>
            </ModalBackdrop>, modalRoot)    
        )
    }
};

export default Modal;