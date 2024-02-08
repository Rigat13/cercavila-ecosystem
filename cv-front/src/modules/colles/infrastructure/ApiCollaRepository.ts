import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {Colla} from "@/modules/colles/domain/Colla";
import {URL_PREFIX} from "@/modules/colles/infrastructure/configuration";

export function createApiCollaRepository(): CollaRepository {
    return {
        storeColla, getCollaById, getCollaByName, getAllCollesByName,
        getAllCollesByFoundationYear, getAllColles,
    };
}

async function storeColla(colla: Colla) {
    try {
        await fetch(URL_PREFIX + "/api/colles", {
            method: "POST",
            headers: new Headers({
                accept: "application/json",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                id: colla.id,
                name: colla.name,
                entity: colla.entity,
                foundationYear: colla.foundationYear,
            }),
        });
    } catch (error) { throw new Error("No s'ha pogut crear la colla. \nMotiu: " + error); }
}

async function getCollaById(id: string) {
    try {
        const colla = await fetch(URL_PREFIX + `/api/colles/id/${id}`).then(
        (response) => response.json() as Promise<Colla>
        );
        return colla;
    } catch (error) { throw new Error("No s'ha pogut obtenir la colla amb l'id. \nMotiu: " + error); }
}

async function getCollaByName(name: string) {
    try {
        const colla = await fetch(URL_PREFIX + `/api/colles/name/${name}`).then(
        (response) => response.json() as Promise<Colla>
        );
        return colla;
    } catch (error) { throw new Error("No s'ha pogut obtenir la colla amb el nom. \nMotiu: " + error); }
}

async function getAllCollesByName() {
    try {
        const colles = await fetch(URL_PREFIX + `/api/colles/name`).then(
            (response) => response.json() as Promise<Colla[]>
        );
        return colles;
    } catch (error) { throw new Error("No s'ha pogut obtenir totes les colles ordenades per nom. \nMotiu: " + error); }
}

async function getAllCollesByFoundationYear() {
    try {
        const colles = await fetch(URL_PREFIX + `/api/colles/foundationYear`).then(
            (response) => response.json() as Promise<Colla[]>
        );
        return colles;
    } catch (error) { throw new Error("No s'ha pogut obtenir totes les colles ordenades per any de fundació. \nMotiu: " + error); }
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