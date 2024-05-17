export const NICKNAME_MIN_LENGTH = 3;
export const NICKNAME_MAX_LENGTH = 120;
export const NICKNAME_ERROR_MESSAGE = `El nickname no és vàlid. El nickname ha de tenir entre ${NICKNAME_MIN_LENGTH} i ${NICKNAME_MAX_LENGTH} caràcters vàlids.`;
export const NICKNAME_EXISTING_ERROR_MESSAGE = `El nickname ja existeix.`;

export function isUserNicknameValid(nickname: string): boolean {
    if (nickname.length < NICKNAME_MIN_LENGTH || nickname.length > NICKNAME_MAX_LENGTH+1) return false;
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    return regexExp.test(nickname);
}

export function alreadyExistingNickname(nickname: string, existingNicknames: string[], originalNickname: string): boolean {
    const filteredNicknames = existingNicknames.filter(n => n !== originalNickname);
    if (filteredNicknames == null || filteredNicknames[0] == undefined) return false;
    return filteredNicknames.includes(nickname);
}

export function UserNicknameNotValidError(nickname: string, existingNicknames: string[]): Error {
    if (existingNicknames.includes(nickname)) return new Error(NICKNAME_EXISTING_ERROR_MESSAGE);
    return new Error(NICKNAME_ERROR_MESSAGE);
}
