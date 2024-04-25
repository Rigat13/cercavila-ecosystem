'use client';

import {Figura} from "@/modules/figures/domain/Figura";
import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getAllFigures} from "@/modules/figures/application/get-all/getAllFigures";
import {getAllFiguresNoImage} from "@/modules/figures/application/get-all/getAllFiguresNoImage";
import {storeFigura} from "@/modules/figures/application/store/storeFigura";
import {updateFigura} from "@/modules/figures/application/update/updateFigura";
import {deleteFigura} from "@/modules/figures/application/delete/deleteFigura";

export interface ContextState {
    figures: Figura[];
    figuresNoImage: Figura[];
    createFigura: (figura: { id: string; name: string; year: number; type: string; image: File | null; webUrl: string; }) => Promise<void>;
    updateFigura: (figura: { id: string; name: string; year: number; type: string; image: File | null; webUrl: string; }) => Promise<void>;
    deleteFigura: (figuraId: string) => Promise<void>;
}

export const FiguresContext = createContext({} as ContextState);

export const FiguresContextProvider = ({
    children,
    repository,
}: React.PropsWithChildren<{ repository: FiguraRepository }>) => {
    const [figures, setFigures] = useState<Figura[]>([]);
    const [figuresNoImage, setFiguresNoImage] = useState<Figura[]>([]);

    async function create({ id, name, year, type, image, webUrl }:
        { id: string; name: string; year: number; type: string; image: File | null; webUrl: string; }) {
        await storeFigura(repository, { id, name, year, type, image, webUrl });
        await getFigures();
    }

    async function getFigures() {
        return getAllFigures(repository).then((figures) => {
            setFigures(figures);
        });
    }

    async function getFiguresNoImage() {
        return getAllFiguresNoImage(repository).then((figures) => {
            setFiguresNoImage(figures);
        });
    }

    async function update({ id, name, year, type, image, webUrl }:
        { id: string; name: string; year: number; type: string; image: File | null; webUrl: string; }) {
        await updateFigura(repository, { id, name, year, type, image, webUrl });
        await getFigures();
    }

    async function deleteC(figuraId: string) {
        await deleteFigura(repository, figuraId);
    }

    useEffect(() => {
        getFiguresNoImage();
        getFigures();
    }, []);

    return (
        <FiguresContext.Provider value={{ figures, figuresNoImage, createFigura: create, updateFigura: update, deleteFigura: deleteC }}>
            {children}
        </FiguresContext.Provider>
    );
}

export const useFiguresContext = () => useContext(FiguresContext);

