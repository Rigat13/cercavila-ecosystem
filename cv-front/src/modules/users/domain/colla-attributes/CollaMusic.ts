import React from "react";

export const MUSIC_MIN_LENGTH = 3;
export const MUSIC_MAX_LENGTH = 120;
export const MUSIC_ERROR_MESSAGE = `El tipus d'acompanyament musical no és vàlid. Ha de tenir entre ${MUSIC_MIN_LENGTH} i ${MUSIC_MAX_LENGTH} caràcters vàlids.`;

export function isCollaMusicValid(music: string, defaultMusic: string): boolean {
    if (!music || music.length < MUSIC_MIN_LENGTH || music.length > MUSIC_MAX_LENGTH+1 || music === defaultMusic) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    const musicsLabels = musics.map(music => music.labelKey);
    return regexExp.test(music) && musicsLabels.includes(music);
}

export function CollaMusicNotValidError(music: string): Error {
    return new Error(MUSIC_ERROR_MESSAGE);
}

export const musics = [
    { labelKey: 'musicFlabiol' },
    { labelKey: 'musicGralla' },
    { labelKey: 'musicBatucada' },
    { labelKey: 'musicBand' },
    { labelKey: 'musicGrallaBand' },
    { labelKey: 'musicOther' },
    { labelKey: 'musicNone' },
]

export const musicsFixed = {
    musicFlabiol: 'musicFlabiol',
    musicGralla: 'musicGralla',
    musicBatucada: 'musicBatucada',
    musicBand: 'musicBand',
    musicGrallaBand: 'musicGrallaBand',
    musicOther: 'musicOther',
    musicNone: 'musicNone',
}

export function getMusicAdditionalStyle(musicType: string): React.CSSProperties {
    let backgroundColor = "#000000"; let color = "#FFFFFF";
    switch (musicType) {
        case 'musicFlabiol': backgroundColor = "#e0823c"; color = "#0a0a0a"; break;
        case 'musicGralla': backgroundColor = "#572a15"; color = "#FFFFFF"; break;
        case 'musicBatucada': backgroundColor = "#ff1466"; color = "#FFFFFF"; break;
        case 'musicBand': backgroundColor = "#FFD700"; color = "#000000"; break;
        case 'musicGrallaBand': backgroundColor = "#008000"; color = "#FFFFFF"; break;
        case 'musicOther': backgroundColor = "#4b166c"; color = "#FFFFFF"; break;
        case 'musicNone': backgroundColor = "#77777c"; color = "#FFFFFF"; break;
        default: backgroundColor = "#000000"; color = "#FFFFFF"; break;
    }
    return { backgroundColor, color };
}