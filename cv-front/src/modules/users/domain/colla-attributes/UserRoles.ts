export const ROLES_ERROR_MESSAGE = `Els rols no són vàlids`;

export function areRolesValid(roles: string, defaultRole: string) : boolean {
    const regexExp =/^[\p{L}\p{N}\p{Zs}·.',-]+$/gmu;
    // "roles" is a string like this:
    // "collaRoleCap-ff8081818e101c61018e10ebed740002,collaRoleSotscap-ff8081818f06df68018f0756a3e60001,collaRoleCapMusics-ff8081818f06df68018f0756a3e60001..."
    // IDs are removed to check if the roles are valid
    const pureRoles = roles.split(',').map(role => role.split('-')[0]);
    const rolesLabels = collaRoles.map(role => role.labelKey);
    return pureRoles.every(role => regexExp.test(role)) && pureRoles.every(role => rolesLabels.includes(role));
}
export function UserRolesNotValidError(figures: string): Error {
    return new Error(ROLES_ERROR_MESSAGE);
}

export function concatenateRoles (roles) {
    return roles.map(role => role.id).join(',');
}

export const collaRoles = [
    { labelKey: 'collaRoleCap' },
    { labelKey: 'collaRoleSotscap' },
    { labelKey: 'collaRoleCapMusics' },
    { labelKey: 'collaRolePortador' },
    { labelKey: 'collaRoleMusician' },
    { labelKey: 'collaRoleSupport' },
    { labelKey: 'collaOuterRoleFollower' },
]
