import {Colla} from "@/modules/colles/domain/Colla";
import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getAllColles} from "@/modules/colles/application/get-all/getAllColles";
import {storeColla} from "@/modules/colles/application/store/storeColla";

export interface ContextState {
    colles: Colla[];
    createColla: (colla: { id: string; name: string; entity: string, foundationYear: number; }) => Promise<void>;
}

export const CollesContext = createContext({} as ContextState);

export const CollesContextProvider = ({
    children,
    repository,
}: React.PropsWithChildren<{ repository: CollaRepository }>) => {
    const [colles, setColles] = useState<Colla[]>([]);

    async function create({ id, name, entity, foundationYear }: { id: string; name: string; entity: string; foundationYear: number }) {
        await storeColla(repository, { id, name, entity, foundationYear });
        await getColles();
    }

    async function getColles() {
        return getAllColles(repository).then((colles) => {
            setColles(colles);
        });
    }

    useEffect(() => {
        getColles();
    }, []);

    return (
        <CollesContext.Provider value={{ colles, createColla: create }}>
            {children}
        </CollesContext.Provider>
    );
}

export const useCollesContext = () => useContext(CollesContext);

