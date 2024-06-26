'use client';

import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getAllDigitalProducts} from "@/modules/digitalproducts/application/get-all/getAllDigitalProducts";
import {getAllDigitalProductsNoImage} from "@/modules/digitalproducts/application/get-all/getAllDigitalProductsNoImage";
import {storeDigitalProduct} from "@/modules/digitalproducts/application/store/storeDigitalProduct";
import {updateDigitalProduct} from "@/modules/digitalproducts/application/update/updateDigitalProduct";
import {deleteDigitalProduct} from "@/modules/digitalproducts/application/delete/deleteDigitalProduct";
import {User} from "@/modules/users/domain/User";
import {getAllUsers_digiProduRepo} from "@/modules/users/application/get-all/getAllUsers";
import {updateUser_digiProduRepo} from "@/modules/users/application/update/updateUser";

export interface ContextState {
    digitalProducts: DigitalProduct[];
    digitalProductsNoImage: DigitalProduct[];
    users: User[];
    createDigitalProduct: (digitalProduct: { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) => Promise<void>;
    updateDigitalProduct: (digitalProduct: { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) => Promise<void>;
    deleteDigitalProduct: (digitalProductId: string) => Promise<void>;

    updateUser: (user: { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string;
        password: string; roles: string[]; coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string;
        activeUserBackgroundImage: string; activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) => Promise<void>;
}

export const DigitalProductsContext = createContext({} as ContextState);

export const DigitalProductsContextProvider = ({
    children,
    repository,
}: React.PropsWithChildren<{ repository: DigitalProductRepository }>) => {
    const [digitalProducts, setDigitalProducts] = useState<DigitalProduct[]>([]);
    const [digitalProductsNoImage, setDigitalProductsNoImage] = useState<DigitalProduct[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    async function create({ id, name, description, image, primaryColour, secondaryColour, price, type }:
        { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) {
        await storeDigitalProduct(repository, { id, name, description, image, primaryColour, secondaryColour, price, type });
        await getDigitalProducts();
    }

    async function getDigitalProducts() {
        return getAllDigitalProducts(repository).then((digitalProducts) => {
            setDigitalProducts(digitalProducts);
        });
    }

    async function getDigitalProductsNoImage() {
        return getAllDigitalProductsNoImage(repository).then((digitalProducts) => {
            setDigitalProductsNoImage(digitalProducts);
        });
    }

    async function getUsers() {
        return getAllUsers_digiProduRepo(repository).then((users) => {
            setUsers(users);
        });
    }

    async function update({ id, name, description, image, primaryColour, secondaryColour, price, type }:
        { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) {
        await updateDigitalProduct(repository, { id, name, description, image, primaryColour, secondaryColour, price, type });
        await getDigitalProducts();
    }

    async function deleteC(digitalProductId: string) {
        await deleteDigitalProduct(repository, digitalProductId);
    }

    async function updateU({ id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                              activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins }:
                              { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string; password: string; roles: string[];
                                  coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string; activeUserBackgroundImage: string;
                                  activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) {
        try { await updateUser_digiProduRepo(repository, { id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
            activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins });
        } catch (e) { throw "L'error en l'actualització de l'usuari és: "+e; }
        await getUsers();
    }

    useEffect(() => {
        getDigitalProductsNoImage();
        getDigitalProducts();
        getUsers();
    }, []);

    return (
        <DigitalProductsContext.Provider value={{ digitalProducts, digitalProductsNoImage, users, createDigitalProduct: create, updateDigitalProduct: update, deleteDigitalProduct: deleteC, updateUser: updateU }}>
            {children}
        </DigitalProductsContext.Provider>
    );
}

export const useDigitalProductsContext = () => useContext(DigitalProductsContext);

