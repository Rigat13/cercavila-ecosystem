import {UserIdNotValidError, isUserIdValid} from "@/modules/users/domain/user-attributes/UserId";
import {UserNicknameNotValidError, isUserNicknameValid} from "@/modules/users/domain/user-attributes/UserNickname";
import {UserNameNotValidError, isUserNameValid} from "@/modules/users/domain/user-attributes/UserName";
import {UserFirstSurnameNotValidError, isUserFirstSurnameValid} from "@/modules/users/domain/user-attributes/UserFirstSurname";
import {UserSecondSurnameNotValidError, isUserSecondSurnameValid} from "@/modules/users/domain/user-attributes/UserSecondSurname";
import {UserEmailNotValidError, isUserEmailValid} from "@/modules/users/domain/user-attributes/UserEmail";
import {UserPasswordNotValidError, isUserPasswordValid} from "@/modules/users/domain/user-attributes/UserPassword";
import {UserRolesNotValidError, areUserRolesValid} from "@/modules/users/domain/user-attributes/UserRoles";
import {UserCoinsNotValidError, isUserCoinsValid} from "@/modules/users/domain/user-attributes/UserCoins";
import {UserDigitalProductsNotValidError, isUserDigitalProductsValid} from "@/modules/users/domain/user-attributes/UserDigitalProducts";
import {UserActiveUserImageNotValidError, isUserActiveUserImageValid} from "@/modules/users/domain/user-attributes/UserActiveUserImage";
import {UserActiveUserImageFrameNotValidError, isUserActiveUserImageFrameValid} from "@/modules/users/domain/user-attributes/UserActiveUserImageFrame";
import {UserActiveUserBackgroundImageNotValidError, isUserActiveUserBackgroundImageValid} from "@/modules/users/domain/user-attributes/UserActiveUserBackgroundImage";
import {UserActiveUserTitleNotValidError, isUserActiveUserTitleValid} from "@/modules/users/domain/user-attributes/UserActiveUserTitle";
import {UserActiveUserBackgroundColourNotValidError, isUserActiveUserBackgroundColourValid} from "@/modules/users/domain/user-attributes/UserActiveUserBackgroundColour";
import {UserActivePinsNotValidError, isUserActivePinsValid} from "@/modules/users/domain/user-attributes/UserActivePins";
import {ADMIN} from "@/modules/users/infrastructure/configuration";
import {getAllUserNicknames} from "@/modules/users/infrastructure/ApiUserRepository"; // TODO: Improve dependency injection; should inject an interface UserRepository, but as it is something exceptional, it is wanted to avoid injecting the whole repository reference.

export interface User {
    id: string;
    nickname: string;
    name: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    password: string;
    roles: string[];
    coins: number;
    digitalProducts: string[];
    activeUserImage: string;
    activeUserImageFrame: string;
    activeUserBackgroundImage: string;
    activeUserTitle: string;
    activeUserBackgroundColour: string;
    activePins: string[];
}

export function ensureUserIsValid({id, nickname, name, firstSurname, secondSurname, email, password, roles,
                                      coins, digitalProducts, activeUserImage, activeUserImageFrame, activeUserBackgroundImage,
                                      activeUserTitle, activeUserBackgroundColour, activePins}: User): void {
    if (!isUserIdValid(id)) { throw UserIdNotValidError(id); }
    ensureUserIsValidEmptyId({
        id, nickname, name, firstSurname, secondSurname, email, password, roles, coins,
        digitalProducts, activeUserImage, activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins});
}

export async function ensureUserIsValidEmptyId({id, nickname, name, firstSurname, secondSurname, email, password, roles,
                                          coins, digitalProducts, activeUserImage, activeUserImageFrame, activeUserBackgroundImage,
                                          activeUserTitle, activeUserBackgroundColour, activePins}: User): Promise<void> {
    const existingNicknames = getAllUserNicknames();

    if (!isUserNicknameValid(nickname, await existingNicknames)) { throw UserNicknameNotValidError(nickname, await existingNicknames); }
    if (!isUserNameValid(name)) { throw UserNameNotValidError(name); }
    if (!isUserFirstSurnameValid(firstSurname)) { throw UserFirstSurnameNotValidError(firstSurname); }
    if (!isUserFirstSurnameValid(secondSurname)) { throw UserSecondSurnameNotValidError(secondSurname); }
    if (!isUserEmailValid(email)) { throw UserEmailNotValidError(email); }
    if (!isUserPasswordValid(password)) { throw UserPasswordNotValidError(password); }
    if (!areUserRolesValid(roles.toString())) { throw UserRolesNotValidError(roles.toString()); }
    if (!isUserCoinsValid(coins)) { throw UserCoinsNotValidError(coins); }
    if (!isUserDigitalProductsValid(digitalProducts.toString())) { throw UserDigitalProductsNotValidError(digitalProducts.toString()); }
    if (!isUserActiveUserImageValid(activeUserImage)) { throw UserActiveUserImageNotValidError(activeUserImage); }
    if (!isUserActiveUserImageFrameValid(activeUserImageFrame)) { throw UserActiveUserImageFrameNotValidError(activeUserImageFrame); }
    if (!isUserActiveUserBackgroundImageValid(activeUserBackgroundImage)) { throw UserActiveUserBackgroundImageNotValidError(activeUserBackgroundImage); }
    if (!isUserActiveUserTitleValid(activeUserTitle)) { throw UserActiveUserTitleNotValidError(activeUserTitle); }
    if (!isUserActiveUserBackgroundColourValid(activeUserBackgroundColour)) { throw UserActiveUserBackgroundColourNotValidError(activeUserBackgroundColour); }
    if (!isUserActivePinsValid(activePins.toString())) { throw UserActivePinsNotValidError(activePins.toString()); }
}

export function ensureUserIdIsValid(id: string): void {
    if (!isUserIdValid(id)) {
        throw UserIdNotValidError(id);
    }
}

export function getRoleColles(user: User): string[] {
    return user.roles.map(role => role.split("-")[1]);
}

export function userIsAdmin(userId: string): boolean {
    return userId === ADMIN;
}