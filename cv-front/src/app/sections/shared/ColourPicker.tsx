import styles from "./ColourPicker.module.scss";
// CustomColorPicker.tsx
import React from 'react';

interface ColourPickerProps {
    value: string;
    onChange: (Event) => void;
}

const ColourPicker: React.FC<ColourPickerProps> = ({ value, onChange }) => {
    const handleColourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    return (
        <div>
            <input
                type="text" // or any other type of input for your custom color picker
                value={value}
                onChange={handleColourChange}
                // Add additional props for your custom color picker component
            />
        </div>
    );
};

export default ColourPicker;
