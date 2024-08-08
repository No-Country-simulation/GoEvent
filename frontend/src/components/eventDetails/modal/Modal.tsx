import React from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative rounded-xl border border-[#C2BAA6] bg-[#EBE2CD] shadow-lg w-1/2 p-6">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-black text-2xl"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>,
    document.body
    );
};

export default Modal;
