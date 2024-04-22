import styles from "./ColourPicker.module.scss";
import React, { useEffect, useRef, useState } from 'react';

interface ColourPickerProps {
    value: string;
    onChange: (Event) => void;
}

const ColourPicker: React.FC<ColourPickerProps> = ({ value: initialValue, onChange }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const selectorRef = useRef<HTMLDivElement>(null!);
    const [value, setValue] = useState<string>(initialValue || '#FFFFFF'); // Default color value
    const [hueValue, setHueValue] = useState<number>(0); // State variable for hue value
    const [selectorPosition, setSelectorPosition] = useState<{ x: number; y: number } | null>(null); // State variable for selector position
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    useEffect(() => {
        drawGradient();
    }, [value, hueValue]);

    const drawGradient = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear previous content
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw combined gradient
        const verticalGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        verticalGradient.addColorStop(0, 'white');
        verticalGradient.addColorStop(1, 'black');

        // Draw horizontal gradient with main color
        const horizontalGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        horizontalGradient.addColorStop(0, 'white');
        if (/^#[0-9A-F]{6}$/i.test(value)) { // Regular expression for hex color format
            horizontalGradient.addColorStop(1, `hsl(${hueValue}, 100%, 50%)`); // Uses hue value, 100% saturation, and 50% lightness
        } else {
            // Default to black if value is not a valid color string
            horizontalGradient.addColorStop(1, 'black');
        }

        // Fill the canvas with the combined gradient
        ctx.fillStyle = verticalGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = horizontalGradient;
        ctx.globalCompositeOperation = 'multiply'; // Blend mode to multiply the gradients
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const handleHueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newHue = parseInt(event.target.value, 10); // Parse the new hue value
        setHueValue(newHue); // Update the state variable
    };

    const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        // Update the hue:
        const newColor = event.target.value;
        const [hue, , ] = hexToHSL(newColor);
        setHueValue(hue);
    };

    const moveSelector = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const selector = selectorRef.current;
        if (canvas && selector) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            selector.style.left = `${x}px`;
            selector.style.top = `${y}px`;
            const color = getColorAtPosition(canvas, x, y);
            onChangeColor(color);
        }
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        setIsMouseDown(true);
        moveSelector(event);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (isMouseDown) {
            moveSelector(event);
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const canvasRect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - canvasRect.left;
        const mouseY = event.clientY - canvasRect.top;
        setSelectorPosition({ x: mouseX, y: mouseY });

        const color = getColorAtPosition(canvas, mouseX, mouseY);
        onChangeColor(color);
    };

    const getColorAtPosition = (canvas: HTMLCanvasElement, x: number, y: number): string => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return '';

        const imageData = ctx.getImageData(x, y, 1, 1);

        const [r, g, b] = imageData.data;
        const colorHex = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
        return colorHex;
    };

    const onChangeColor = (color: string) => {
        onChange({ target: { value: color } });
        setValue(color);
    };

    const hexToHSL = (hex: string): number[] => {
        // Convert hexadecimal color to HSL (Hue, Saturation, Lightness) color space
        // Remove '#' from hex string if present
        hex = hex.replace('#', '');

        // Convert hex to RGB
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        // Convert RGB to HSL
        let h, s, l;
        const rr = r / 255,
            gg = g / 255,
            bb = b / 255;
        const max = Math.max(rr, gg, bb);
        const min = Math.min(rr, gg, bb);
        l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case rr:
                    h = (gg - bb) / d + (gg < bb ? 6 : 0);
                    break;
                case gg:
                    h = (bb - rr) / d + 2;
                    break;
                case bb:
                    h = (rr - gg) / d + 4;
                    break;
            }
            h /= 6;
        }
        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    };

    return (
        <div className={styles.colourPicker}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                width={200}
                height={100}
                onClick={handleCanvasClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            ></canvas>
            <div ref={selectorRef} className={styles.selector}></div>
            <input
                type="range"
                min="0"
                max="360"
                value={hueValue}
                onChange={handleHueChange}
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
