import styles from "./ColourPicker.module.scss";
import React, { useEffect, useRef, useState } from 'react';

interface ColourPickerProps {
    value: string;
    onChange: (Event) => void;
}

const ColourPicker: React.FC<ColourPickerProps> = ({ value, onChange }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const [toneValue, setToneValue] = useState<number>(50); // State variable for tone slider value

    useEffect(() => {
        drawGradient();
    }, [value, toneValue]); // Re-draw gradient when either the value or toneValue changes

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

        const horizontalGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        horizontalGradient.addColorStop(0, 'white');
        if (/^#[0-9A-F]{6}$/i.test(value)) { // Regular expression for hex color format
            const adjustedValue = adjustColorTone(value, toneValue);
            horizontalGradient.addColorStop(1, adjustedValue);
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

    const adjustColorTone = (color: string, tone: number) => {
        // Adjust the color tone based on the tone value
        // For example, you can adjust the saturation or brightness of the color
        // Here, we simply adjust the brightness by modifying the lightness value in HSL color space
        const hslColor = hexToHSL(color);
        const adjustedHSL = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${tone}%)`;
        return hslToHex(adjustedHSL);
    };

    const hexToHSL = (hex: string) => {
        // Convert hexadecimal color to HSL (Hue, Saturation, Lightness) color space
        const bigint = parseInt(hex.substring(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        let s = 0;
        const l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return [h * 360, s * 100, l * 100];
    };

    const hslToHex = (hsl: string) => {
        // Convert HSL color to hexadecimal color
        const match = hsl.match(/(\d+(\.\d+)?)%?\b/g);
        if (!match || match.length < 3) return '#000000';
        const [h, s, l] = match.map(parseFloat);
        const hslToRgb = (h: number, s: number, l: number) => {
            h /= 360;
            s /= 100;
            l /= 100;
            let r, g, b;
            if (s === 0) {
                r = g = b = l; // achromatic
            } else {
                const hue2rgb = (p: number, q: number, t: number) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
        };
        return hslToRgb(h, s, l);
    };

    const handleToneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value); // Parse the new value to an integer
        setToneValue(newValue); // Update the state variable
    };

    const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    return (
        <div className={styles.colourPicker}>
            <canvas ref={canvasRef} className={styles.canvas} width={200} height={100}></canvas>
            <input
                type="range"
                min="0"
                max="100"
                value={toneValue} // Bind the value to the state variable
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
