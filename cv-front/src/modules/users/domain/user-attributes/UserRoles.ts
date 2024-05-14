import React from "react";

export const ROLES_ERROR_MESSAGE = `Els rols no són vàlids`;

export function areUserRolesValid(roles: string) : boolean {
    if (!roles) return true;
    const pureRoles = roles.split(',').map(role => role.split('-')[0]);
    const rolesLabels = userCollaRoles.map(role => role.labelKey);
    return pureRoles.every(role => rolesLabels.includes(role));
}
export function UserRolesNotValidError(roles: string): Error {
    return new Error(ROLES_ERROR_MESSAGE + " " + roles);
}

export function concatenateRoles (roles) {
    return roles.map(role => role.id).join(',');
}

export const userCollaRoles = [
    { labelKey: 'userCollaRoleCap' },
    { labelKey: 'userCollaRoleSotscap' },
    { labelKey: 'userCollaRoleCapMusics' },
    { labelKey: 'userCollaRolePortador' },
    { labelKey: 'userCollaRoleMusician' },
    { labelKey: 'userCollaRoleSupport' },
    { labelKey: 'userCollaOuterRoleFollower' },
    { labelKey: 'userCCGMPresident' },
    { labelKey: 'userCCGMSecretary' },
    { labelKey: 'userCCGMTreasurer' },
    { labelKey: 'userCCGMBoardMember' },
]

export function getRolesAdditionalStyle(role: string): React.CSSProperties {
    let backgroundColor = "#000000"; let color = "#FFFFFF";
    switch (role) {
        case 'userCollaRoleCap': backgroundColor = "#d2702a"; color = "#ffffff"; break;
        case 'userCollaRoleSotscap': backgroundColor = "#7b93ea"; color = "#FFFFFF"; break;
        case 'userCollaRoleCapMusics': backgroundColor = "#e82f5a"; color = "#FFFFFF"; break;
        case 'userCollaRolePortador': backgroundColor = "#dbef50"; color = "#000000"; break;
        case 'userCollaRoleMusician': backgroundColor = "#d0586a"; color = "#000000"; break;
        case 'userCollaRoleSupport': backgroundColor = "#9b70e1"; color = "#000000"; break;
        case 'userCollaOuterRoleFollower': backgroundColor = "#77777c"; color = "#FFFFFF"; break;
        case 'userCCGMPresident': backgroundColor = "#d2702a"; color = "#ffffff"; break;
        case 'userCCGMSecretary': backgroundColor = "#7b93ea"; color = "#FFFFFF"; break;
        case 'userCCGMTreasurer': backgroundColor = "#359f4e"; color = "#FFFFFF"; break;
        case 'userCCGMBoardMember': backgroundColor = "#e82f5a"; color = "#ffffff"; break;
        default: backgroundColor = "#000000"; color = "#FFFFFF"; break;
    }
    return { backgroundColor, color };
}
