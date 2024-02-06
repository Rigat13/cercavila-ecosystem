import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {Colla} from "@/modules/colles/domain/Colla";

export function createApiCollaRepository(): CollaRepository {
    return {
        storeColla, getCollaById, getCollaByName, getAllCollesByName,
        getAllCollesByFoundationYear, getAllColles,
    };
}

async function storeColla(colla: Colla) {
    await fetch("/api/colles", {
        method: "POST",
        body: JSON.stringify({
            id: colla.id,
            name: colla.name,
            entity: colla.entity,
            foundationYear: colla.foundationYear,
        }),
    });
}

async function getCollaById(id: string) {
    const colla = await fetch(`/api/colles/id/${id}`).then(
        (response) => response.json() as Promise<Colla>
    );
    return colla;
}

async function getCollaByName(name: string) {
    const colla = await fetch(`/api/colles/name/${name}`).then(
        (response) => response.json() as Promise<Colla>
    );
    return colla;
}

async function getAllCollesByName() {
    const collas = await fetch(`/api/colles/name`).then(
        (response) => response.json() as Promise<Colla[]>
    );
    return collas;
}

async function getAllCollesByFoundationYear() {
    const collas = await fetch(`/api/colles/foundationYear`).then(
        (response) => response.json() as Promise<Colla[]>
    );
    return collas;
}

async function getAllColles() {
    const collas = await fetch(`/api/colles`).then(
        (response) => response.json() as Promise<Colla[]>
    );
    return collas;
}