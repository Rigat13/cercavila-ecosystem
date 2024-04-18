'use client';

import {Colla} from "@/modules/colles/domain/Colla";
import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getAllColles} from "@/modules/colles/application/get-all/getAllColles";
import {storeColla} from "@/modules/colles/application/store/storeColla";
import {updateColla} from "@/modules/colles/application/update/updateColla";
import {deleteColla} from "@/modules/colles/application/delete/deleteColla";

export interface ContextState {
    colles: Colla[];
    createColla: (colla: { id: string; name: string; entity: string, foundationYear: number, description: string; type: string, neighbourhood: string; logo: File | null; }) => Promise<void>;
    updateColla: (colla: { id: string; name: string; entity: string, foundationYear: number, description: string; type: string, neighbourhood: string; logo: File | null; }) => Promise<void>;
    deleteColla: (collaId: string) => Promise<void>;
}

export const CollesContext = createContext({} as ContextState);

export const CollesContextProvider = ({
    children,
    repository,
}: React.PropsWithChildren<{ repository: CollaRepository }>) => {
    const [colles, setColles] = useState<Colla[]>([]);

    async function create({ id, name, entity, foundationYear, description, type, neighbourhood, logo }: { id: string; name: string; entity: string; foundationYear: number; description: string; type: string, neighbourhood: string; logo: File | null }) {
        await storeColla(repository, { id, name, entity, foundationYear, description, type, neighbourhood, logo });
        await getColles();
    }

    async function getColles() {
        return getAllColles(repository).then((colles) => {
            setColles(colles);
        });
    }

    async function update({ id, name, entity, foundationYear, description, type, neighbourhood, logo }: { id: string; name: string; entity: string; foundationYear: number; description: string; type: string, neighbourhood: string; logo: File | null }) {
        await updateColla(repository, { id, name, entity, foundationYear, description, type, neighbourhood, logo });
        await getColles();
    }

    async function deleteC(collaId: string) {
        await deleteColla(repository, collaId);
    }

    useEffect(() => {
        getColles();
    }, []);

    return (
        <CollesContext.Provider value={{ colles, createColla: create, updateColla: update, deleteColla: deleteC }}>
            {children}
        </CollesContext.Provider>
    );
}

export const useCollesContext = () => useContext(CollesContext);

