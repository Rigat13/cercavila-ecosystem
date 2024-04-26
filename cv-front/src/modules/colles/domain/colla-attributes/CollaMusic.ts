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