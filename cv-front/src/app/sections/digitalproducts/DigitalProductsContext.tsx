'use client';

import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getAllDigitalProducts} from "@/modules/digitalproducts/application/get-all/getAllDigitalProducts";
import {getAllDigitalProductsNoImage} from "@/modules/digitalproducts/application/get-all/getAllDigitalProductsNoImage";
import {storeDigitalProduct} from "@/modules/digitalproducts/application/store/storeDigitalProduct";
import {updateDigitalProduct} from "@/modules/digitalproducts/application/update/updateDigitalProduct";
import {deleteDigitalProduct} from "@/modules/digitalproducts/application/delete/deleteDigitalProduct";

export interface ContextState {
    digitalProducts: DigitalProduct[];
    digitalProductsNoImage: DigitalProduct[];
    createDigitalProduct: (digitalProduct: { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) => Promise<void>;
    updateDigitalProduct: (digitalProduct: { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) => Promise<void>;
    deleteDigitalProduct: (digitalProductId: string) => Promise<void>;
}

export const DigitalProductsContext = createContext({} as ContextState);

export const DigitalProductsContextProvider = ({
    children,
    repository,
}: React.PropsWithChildren<{ repository: DigitalProductRepository }>) => {
    const [digitalProducts, setDigitalProducts] = useState<DigitalProduct[]>([]);
    const [digitalProductsNoImage, setDigitalProductsNoImage] = useState<DigitalProduct[]>([]);

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

    async function update({ id, name, description, image, primaryColour, secondaryColour, price, type }:
        { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) {
        await updateDigitalProduct(repository, { id, name, description, image, primaryColour, secondaryColour, price, type });
        await getDigitalProducts();
    }

    async function deleteC(digitalProductId: string) {
        await deleteDigitalProduct(repository, digitalProductId);
    }

    useEffect(() => {
        getDigitalProductsNoImage();
        getDigitalProducts();
    }, []);

    return (
        <DigitalProductsContext.Provider value={{ digitalProducts, digitalProductsNoImage, createDigitalProduct: create, updateDigitalProduct: update, deleteDigitalProduct: deleteC }}>
            {children}
        </DigitalProductsContext.Provider>
    );
}

export const useDigitalProductsContext = () => useContext(DigitalProductsContext);

