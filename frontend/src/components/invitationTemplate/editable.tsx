import React, { useState, useEffect, useRef } from 'react';

interface EditableDivProps {
    value: string;
    onChange: (value: string) => void;
    style?: React.CSSProperties;
}

const EditableDiv: React.FC<EditableDivProps> = ({ value, onChange, style }) => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current && divRef.current.innerText !== value) {
            divRef.current.innerText = value;
        }
    }, [value]);

    const handleInput = () => {
        if (divRef.current) {
            onChange(divRef.current.innerText);
        }
    };

    return (
        <div
            ref={divRef}
            contentEditable
            suppressContentEditableWarning
            style={style}
            onInput={handleInput}
        />
    );
};

export default EditableDiv;
