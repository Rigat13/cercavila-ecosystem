// CustomColorPicker.tsx
import styles from "./ColourPicker.module.scss";
import React, { useEffect, useRef } from 'react';

interface ColourPickerProps {
    value: string;
    onChange: (Event) => void;
}

const ColourPicker: React.FC<ColourPickerProps> = ({ value, onChange }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null!);

    useEffect(() => {
        drawGradient();
    }, [value]);

    const drawGradient = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear previous content
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw vertical gradient of black
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw horizontal gradient of value color
        const valueGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        valueGradient.addColorStop(0, 'white');
        if (/^#[0-9A-F]{6}$/i.test(value)) { // Regular expression for hex color format
            valueGradient.addColorStop(1, value);
        } else {
            // Default to black if value is not a valid color string
            valueGradient.addColorStop(1, 'black');
        }
        ctx.fillStyle = valueGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };


    const handleToneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    const handleColourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    return (
        <div className={styles.colourPicker}>
            <canvas ref={canvasRef} className={styles.canvas} width={200} height={100}></canvas>
            <input
                type="range"
                min="0"
                max="100"
                value="50" // Initial value for the tone slider
                onChange={handleToneChange}
                className={styles.rangeInput}
            />
            <input
                type="text"
                value={value}
                onChange={handleTextInputChange}
                className={styles.textInput}
            />
        </div>
    );
};

export default ColourPicker;
