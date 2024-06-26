'use client';

import {User} from "@/modules/users/domain/User";
import {UserRepository} from "@/modules/users/domain/UserRepository";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getAllUsers} from "@/modules/users/application/get-all/getAllUsers";
import {getAllUserNicknames} from "@/modules/users/application/get-all/getAllUserNicknames";
import {storeUser} from "@/modules/users/application/store/storeUser";
import {updateUser} from "@/modules/users/application/update/updateUser";
import {deleteUser} from "@/modules/users/application/delete/deleteUser";
import {Colla} from "@/modules/colles/domain/Colla";
import {getAllColles_userRepo} from "@/modules/colles/application/get-all/getAllColles";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {getAllDigitalProducts_userRepo} from "@/modules/digitalproducts/application/get-all/getAllDigitalProducts";

export interface ContextState {
    users: User[];
    userNicknames: string[];
    userEmails: string[];
    colles: Colla[];
    digitalProducts: DigitalProduct[];
    createUser: (user: { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string;
        password: string; roles: string[]; coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string;
        activeUserBackgroundImage: string; activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) => Promise<void>;
    updateUser: (user: { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string;
        password: string; roles: string[]; coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string;
        activeUserBackgroundImage: string; activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;

    getAllUserNicknames: () => Promise<void>;
    getAllUserEmails: () => Promise<void>;
}

export const UsersContext = createContext({} as ContextState);

export const UsersContextProvider = ({
    children,
    repository,
}: React.PropsWithChildren<{ repository: UserRepository }>) => {
    const [users, setUsers] = useState<User[]>([]);
    const [userNicknames, setUserNicknames] = useState<string[]>([]);
    const [userEmails, setUserEmails] = useState<string[]>([]);
    const [colles, setColles] = useState<Colla[]>([]);
    const [digitalProducts, setDigitalProducts] = useState<DigitalProduct[]>([]);

    async function create({ id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                              activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins }:
                              { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string; password: string; roles: string[];
                                  coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string; activeUserBackgroundImage: string;
                                  activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) {
        try { await storeUser(repository, { id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                                     activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins });
        } catch (e) { throw "L'error al crear l'usuari és: "+e; }
        await getUsers();
    }

    async function getUsers() {
        return getAllUsers(repository).then((users) => {
            setUsers(users);
        });
    }

    async function getColles() {
        return getAllColles_userRepo(repository).then((colles) => {
            setColles(colles);
        });
    }

    async function getDigitalProducts() {
        return getAllDigitalProducts_userRepo(repository).then((digitalProducts) => {
            setDigitalProducts(digitalProducts);
        });
    }

    async function update({ id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                              activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins }:
                              { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string; password: string; roles: string[];
                                  coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string; activeUserBackgroundImage: string;
                                  activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) {
        try { await updateUser(repository, { id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
            activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins });
        } catch (e) { throw "L'error en l'actualització de l'usuari és: "+e; }
        await getUsers();
    }

    async function deleteC(userId: string) {
        await deleteUser(repository, userId);
    }

    async function getNicknames() {
        return getAllUserNicknames(repository).then((userNicknames) => {
            setUserNicknames(userNicknames);
        });
    }

    async function getEmails() {
        return getAllUsers(repository).then((users) => {
            let userEmails: string[] = [];
            users.map((user) => userEmails.push(user.email));
            setUserEmails(userEmails);
        });
    }

    useEffect(() => {
        getUsers();
        getNicknames();
        getColles();
        getDigitalProducts();
        getEmails();
    }, []);

    return (
        <UsersContext.Provider value={{ users, userNicknames, userEmails, colles, digitalProducts, createUser: create,
            updateUser: update, deleteUser: deleteC, getAllUserNicknames: getNicknames, getAllUserEmails: getEmails }}>
            {children}
        </UsersContext.Provider>
    );
}

export const useUsersContext = () => useContext(UsersContext);

