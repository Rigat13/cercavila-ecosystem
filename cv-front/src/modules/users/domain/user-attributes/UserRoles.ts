import React from "react";

export const ROLES_ERROR_MESSAGE = `Els rols no són vàlids`;

export function areUserRolesValid(roles: string, defaultRole: string) : boolean {
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    // "roles" is a string like this:
    // "collaRoleCap-ff8081818e101c61018e10ebed740002,collaRoleSotscap-ff8081818f06df68018f0756a3e60001,collaRoleCapMusics-ff8081818f06df68018f0756a3e60001..."
    // IDs are removed to check if the roles are valid
    const pureRoles = roles.split(',').map(role => role.split('-')[0]);
    const rolesLabels = userCollaRoles.map(role => role.labelKey);
    return pureRoles.every(role => regexExp.test(role)) && pureRoles.every(role => rolesLabels.includes(role));
}
export function UserRolesNotValidError(figures: string): Error {
    return new Error(ROLES_ERROR_MESSAGE);
}

export function concatenateRoles (roles) {
    return roles.map(role => role.id).join(',');
}

export const userCollaRoles = [
    { labelKey: 'collaRoleCap' },
    { labelKey: 'collaRoleSotscap' },
    { labelKey: 'collaRoleCapMusics' },
    { labelKey: 'collaRolePortador' },
    { labelKey: 'collaRoleMusician' },
    { labelKey: 'collaRoleSupport' },
    { labelKey: 'collaOuterRoleFollower' },
]

export function getRolesAdditionalStyle(musicType: string): React.CSSProperties {
    let backgroundColor = "#000000"; let color = "#FFFFFF";
    switch (musicType) {
        case 'collaRoleCap': backgroundColor = "#d2702a"; color = "#ffffff"; break;
        case 'collaRoleSotscap': backgroundColor = "#7b93ea"; color = "#FFFFFF"; break;
        case 'collaRoleCapMusics': backgroundColor = "#e82f5a"; color = "#FFFFFF"; break;
        case 'collaRolePortador': backgroundColor = "#dbef50"; color = "#000000"; break;
        case 'collaRoleMusician': backgroundColor = "#d0586a"; color = "#000000"; break;
        case 'collaRoleSupport': backgroundColor = "#9b70e1"; color = "#000000"; break;
        case 'collaOuterRoleFollower': backgroundColor = "#77777c"; color = "#FFFFFF"; break;
        default: backgroundColor = "#000000"; color = "#FFFFFF"; break;
    }
    return { backgroundColor, color };
}
