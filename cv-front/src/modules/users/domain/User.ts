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

export function ensureUserIsValidEmptyId({id, nickname, name, firstSurname, secondSurname, email, password, roles,
                                          coins, digitalProducts, activeUserImage, activeUserImageFrame, activeUserBackgroundImage,
                                          activeUserTitle, activeUserBackgroundColour, activePins}: User): void {
    const validNicknames = getAllUserNicknames();

    if (!isUserNicknameValid(nickname, validNicknames)) { throw UserNicknameNotValidError(nickname); }
    if (!isUserNameValid(name)) { throw UserNameNotValidError(name); }
    if (!isUserFirstSurnameValid(firstSurname)) { throw UserFirstSurnameNotValidError(firstSurname); }
    if (!isUserFirstSurnameValid(secondSurname)) { throw UserSecondSurnameNotValidError(secondSurname); }
    if (!isUserEmailValid(email)) { throw UserEmailNotValidError(email); }
    if (!isUserPasswordValid(password)) { throw UserPasswordNotValidError(password); }
    if (!isUserRolesValid(roles)) { throw UserRolesNotValidError(roles); }
    if (!isUserCoinsValid(coins)) { throw UserCoinsNotValidError(coins); }
    if (!isUserDigitalProductsValid(digitalProducts)) { throw UserDigitalProductsNotValidError(digitalProducts); }
    if (!isUserActiveUserImageValid(activeUserImage)) { throw UserActiveUserImageNotValidError(activeUserImage); }
    if (!isUserActiveUserImageFrameValid(activeUserImageFrame)) { throw UserActiveUserImageFrameNotValidError(activeUserImageFrame); }
    if (!isUserActiveUserBackgroundImageValid(activeUserBackgroundImage)) { throw UserActiveUserBackgroundImageNotValidError(activeUserBackgroundImage); }
    if (!isUserActiveUserTitleValid(activeUserTitle)) { throw UserActiveUserTitleNotValidError(activeUserTitle); }
    if (!isUserActiveUserBackgroundColourValid(activeUserBackgroundColour)) { throw UserActiveUserBackgroundColourNotValidError(activeUserBackgroundColour); }
    if (!isUserActivePinsValid(activePins)) { throw UserActivePinsNotValidError(activePins); }
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