'use client';

import {Colla} from "@/modules/colles/domain/Colla";
import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getAllColles} from "@/modules/colles/application/get-all/getAllColles";
import {storeColla} from "@/modules/colles/application/store/storeColla";
import {updateColla} from "@/modules/colles/application/update/updateColla";
import {deleteColla} from "@/modules/colles/application/delete/deleteColla";
import {Figura} from "@/modules/figures/domain/Figura";
import {getAllFiguresNoImage_collaRepo} from "@/modules/figures/application/get-all/getAllFiguresNoImage";

export interface ContextState {
    colles: Colla[];
    figuresNoImage: Figura[];
    createColla: (colla: { id: string; name: string; entity: string, foundationYear: number; description: string; type: string; neighbourhood:
            string; primaryColour: string; secondaryColour: string; logo: File | null; music: string; email: string; instagram: string; figures: string; }) => Promise<void>;
    updateColla: (colla: { id: string; name: string; entity: string, foundationYear: number; description: string; type: string; neighbourhood:
            string; primaryColour: string; secondaryColour: string; logo: File | null; music: string; email: string; instagram: string; figures: string; }) => Promise<void>;
    deleteColla: (collaId: string) => Promise<void>;
}

export const CollesContext = createContext({} as ContextState);

export const CollesContextProvider = ({
    children,
    repository,
}: React.PropsWithChildren<{ repository: CollaRepository }>) => {
    const [colles, setColles] = useState<Colla[]>([]);
    const [figuresNoImage, setFiguresNoImage] = useState<Figura[]>([]);

    async function create({ id, name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour, logo, music, email, instagram, figures }:
        { id: string; name: string; entity: string; foundationYear: number; description: string; type: string, neighbourhood:
                string; primaryColour: string; secondaryColour: string; logo: File | null; music: string; email: string; instagram: string; figures: string }) {
        await storeColla(repository, { id, name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour, logo, music, email, instagram, figures });
        await getColles();
    }

    async function getColles() {
        return getAllColles(repository).then((colles) => {
            setColles(colles);
        });
    }

    async function getFiguresNoImage() {
        return getAllFiguresNoImage_collaRepo(repository).then((figures) => {
            setFiguresNoImage(figures);
        });
    }

    async function update({ id, name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour, logo, music, email, instagram, figures }:
        { id: string; name: string; entity: string; foundationYear: number; description: string; type: string, neighbourhood:
                string; primaryColour: string; secondaryColour: string; logo: File | null; music: string; email: string; instagram: string; figures: string }) {
        await updateColla(repository, { id, name, entity, foundationYear, description, type, neighbourhood, primaryColour, secondaryColour, logo, music, email, instagram, figures });
        await getColles();
    }

    async function deleteC(collaId: string) {
        await deleteColla(repository, collaId);
    }

    useEffect(() => {
        getColles();
        getFiguresNoImage();
    }, []);

    return (
        <CollesContext.Provider value={{ colles, figuresNoImage, createColla: create, updateColla: update, deleteColla: deleteC }}>
            {children}
        </CollesContext.Provider>
    );
}

export const useCollesContext = () => useContext(CollesContext);

