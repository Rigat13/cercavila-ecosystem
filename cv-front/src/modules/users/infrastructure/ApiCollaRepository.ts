import {UserRepository} from "@/modules/users/domain/UserRepository";
import {User} from "@/modules/users/domain/User";
import {URL_PREFIX} from "@/modules/users/infrastructure/configuration";
import {getAllColles} from "@/modules/colles/application/get-all/getAllColles";
import {Colla} from "@/modules/colles/domain/Colla";

export function createApiUserRepository(): UserRepository {
    return <UserRepository>{
        storeUser, getUserById, getUserByName, getAllUsersByName,
        getAllUsers, updateUser, deleteUser, getAllUserNicknames, getAllColles
    };
}

async function storeUser(user: User) {
    try {
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("nickname", user.nickname);
        formData.append("name", user.name);
        formData.append("firstSurname", user.firstSurname);
        formData.append("secondSurname", user.secondSurname);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("roles", user.roles.join(","));
        formData.append("coins", user.coins.toString());
        formData.append("digitalProducts", user.digitalProducts.join(","));
        formData.append("activeUserImage", user.activeUserImage);
        formData.append("activeUserImageFrame", user.activeUserImageFrame);
        formData.append("activeUserBackgroundImage", user.activeUserBackgroundImage);
        formData.append("activeUserTitle", user.activeUserTitle);
        formData.append("activeUserBackgroundColour", user.activeUserBackgroundColour);
        formData.append("activePins", user.activePins.join(","));

        await fetch(URL_PREFIX + "/api/users", {
            method: "POST",
            body: formData,
        });
    } catch (error) {
        throw new Error("No s'ha pogut crear l'usuari. \nMotiu: " + error);
    }
}

async function getUserById(id: string) {
    try {
        const user = await fetch(URL_PREFIX + `/api/users/id/${id}`).then(
        (response) => response.json() as Promise<User>
        );
        return user;
    } catch (error) { throw new Error("No s'ha pogut obtenir l'usuari amb l'id. \nMotiu: " + error); }
}

async function getUserByName(name: string) {
    try {
        const user = await fetch(URL_PREFIX + `/api/users/name/${name}`).then(
        (response) => response.json() as Promise<User>
        );
        return user;
    } catch (error) { throw new Error("No s'ha pogut obtenir l'usuari amb el nom. \nMotiu: " + error); }
}

async function getAllUsersByName() {
    try {
        const users = await fetch(URL_PREFIX + `/api/users/name`).then(
            (response) => response.json() as Promise<User[]>
        );
        return users;
    } catch (error) { throw new Error("No s'ha pogut obtenir totes les users ordenades per nom. \nMotiu: " + error); }
}

async function getAllUsers() {
    try {
        const users = await fetch(URL_PREFIX + `/api/users`).then(
            (response) => response.json() as Promise<User[]>
        );
        return users;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir totes les users. \nMotiu: " + error);
    }
}

async function getAllColles() {
    try {
        const colles = await fetch(URL_PREFIX + `/api/colles`).then(
            (response) => response.json() as Promise<Colla[]>
        );
        return colles;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir totes les colles. \nMotiu: " + error);
    }
}

async function updateUser(user: User) {
    try {
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("nickname", user.nickname);
        formData.append("name", user.name);
        formData.append("firstSurname", user.firstSurname);
        formData.append("secondSurname", user.secondSurname);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("roles", user.roles.join(","));
        formData.append("coins", user.coins.toString());
        formData.append("digitalProducts", user.digitalProducts.join(","));
        formData.append("activeUserImage", user.activeUserImage);
        formData.append("activeUserImageFrame", user.activeUserImageFrame);
        formData.append("activeUserBackgroundImage", user.activeUserBackgroundImage);
        formData.append("activeUserTitle", user.activeUserTitle);
        formData.append("activeUserBackgroundColour", user.activeUserBackgroundColour);
        formData.append("activePins", user.activePins.join(","));

        await fetch(URL_PREFIX + "/api/users", {
            method: "PUT",
            body: formData,
        });
    } catch (error) { throw new Error("No s'ha pogut actualitzar l'usuari. \nMotiu: " + error); }
}

async function deleteUser(id: string) {
    try {
        await fetch(URL_PREFIX + "/api/users", {
            method: "DELETE",
            headers: new Headers({
                accept: "application/json",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                id: id,
            }),
        });
    } catch (error) { throw new Error("No s'ha pogut eliminar l'usuari. \nMotiu: " + error); }
}

export async function getAllUserNicknames() {
    try {
        const nicknames = await fetch(URL_PREFIX + `/api/users/nicknames`).then(
            (response) => response.json() as Promise<string[]>
        );
        return nicknames;
    } catch (error) { throw new Error("No s'ha pogut obtenir tots els nicknames. \nMotiu: " + error); }
}