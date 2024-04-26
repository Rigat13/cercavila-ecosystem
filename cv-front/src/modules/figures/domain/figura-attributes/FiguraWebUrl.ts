export const WEBURL_MIN_LENGTH = 3;
export const WEBURL_MAX_LENGTH = 120;
export const WEBURL_ERROR_MESSAGE = `L'URL del web no és vàlid. Ha de tenir entre ${WEBURL_MIN_LENGTH} i ${WEBURL_MAX_LENGTH} caràcters vàlids.`;

export function isFiguraWebUrlValid(webUrl: string): boolean {
    if (!webUrl || webUrl === "") return true; // WebUrl is optional
    if (webUrl.length <= WEBURL_MIN_LENGTH || webUrl.length > WEBURL_MAX_LENGTH+1) return false;
    return true;
}

export function FiguraWebUrlNotValidError(webUrl: string): Error {
    return new Error(WEBURL_ERROR_MESSAGE);
}