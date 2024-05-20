// ----------------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------ USE MEDIA QUERY ------------------------------------------------ //

import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const listener = (event) => setMatches(event.matches);

        mediaQueryList.addEventListener('change', listener);
        return () => mediaQueryList.removeEventListener('change', listener);
    }, [query]);

    return matches;
};

export default useMediaQuery;

// ----------------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------ BASE 64 TO BLOB ------------------------------------------------ //
export function base64ToBlob(base64: string): Blob {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: 'image/jpeg' });
}

// ----------------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------ GET DEFAULT IMG ------------------------------------------------ //

export function getDefaultUserImage(): string {
    const defaultUserImage = "/icons/default-user-image.svg";
    return defaultUserImage;
}

export function generateRandomColorFilter() {
    const hue = Math.floor(Math.random() * 360); // Generate a random hue value between 0 and 360
    return { filter: `brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(1500%) hue-rotate(${hue}deg)` };
}



