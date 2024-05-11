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

export interface ContextState {
    users: User[];
    userNicknames: string[];
    colles: Colla[];
    createUser: (user: { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string;
        password: string; roles: string[]; coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string;
        activeUserBackgroundImage: string; activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) => Promise<void>;
    updateUser: (user: { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string;
        password: string; roles: string[]; coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string;
        activeUserBackgroundImage: string; activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
    getAllUserNicknames: () => Promise<void>;
}

export const UsersContext = createContext({} as ContextState);

export const UsersContextProvider = ({
    children,
    repository,
}: React.PropsWithChildren<{ repository: UserRepository }>) => {
    const [users, setUsers] = useState<User[]>([]);
    const [userNicknames, setUserNicknames] = useState<string[]>([]);
    const [colles, setColles] = useState<Colla[]>([]);

    async function create({ id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                              activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins }:
                              { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string; password: string; roles: string[];
                                  coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string; activeUserBackgroundImage: string;
                                  activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) {
        await storeUser(repository, { id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                                     activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins });
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

    async function update({ id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                              activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins }:
                              { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string; password: string; roles: string[];
                                  coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string; activeUserBackgroundImage: string;
                                  activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) {
        await updateUser(repository, { id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
            activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins });
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

    useEffect(() => {
        getUsers();
        getNicknames();
        getColles();
    }, []);

    return (
        <UsersContext.Provider value={{ users, userNicknames, colles, createUser: create, updateUser: update, deleteUser: deleteC, getAllUserNicknames: getNicknames }}>
            {children}
        </UsersContext.Provider>
    );
}

export const useUsersContext = () => useContext(UsersContext);

