import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {Colla} from "@/modules/colles/domain/Colla";
import {URL_PREFIX} from "@/modules/colles/infrastructure/configuration";
import {Figura} from "@/modules/figures/domain/Figura";

export function createApiCollaRepository(): CollaRepository {
    return {
        storeColla, getCollaById, getCollaByName, getAllCollesByName,
        getAllCollesByFoundationYear, getAllColles, updateColla, deleteColla, getAllFiguresNoImage, getAllFigures
    };
}

async function storeColla(colla: Colla) {
    try {
        const formData = new FormData();
        formData.append("id", colla.id);
        formData.append("name", colla.name);
        formData.append("entity", colla.entity);
        formData.append("foundationYear", colla.foundationYear.toString());
        formData.append("description", colla.description);
        formData.append("type", colla.type);
        formData.append("neighbourhood", colla.neighbourhood);
        formData.append("primaryColour", colla.primaryColour);
        formData.append("secondaryColour", colla.secondaryColour);
        if (colla.logo) formData.append("logo", colla.logo, colla.logo.name);
        formData.append("music", colla.music);
        formData.append("email", colla.email);
        formData.append("instagram", colla.instagram);
        formData.append("figures", colla.figures);

        const token = localStorage.getItem('token');

        const headers = new Headers();
        if (token) { headers.append('Authorization', 'Bearer ' + token); }

        const response = await fetch(URL_PREFIX + "/api/colles", {
            method: "POST",
            body: formData,
            headers: headers,
        });
        if (!response.ok) { throw new Error("La resposta del servidor no ha estat OK.");}
    } catch (error) {
        throw new Error("No s'ha pogut crear la colla. \nMotiu: " + error);
    }
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

async function updateColla(colla: Colla) {
    try {
        const formData = new FormData();
        formData.append("id", colla.id);
        formData.append("name", colla.name);
        formData.append("entity", colla.entity);
        formData.append("foundationYear", colla.foundationYear.toString());
        formData.append("description", colla.description);
        formData.append("type", colla.type);
        formData.append("neighbourhood", colla.neighbourhood);
        formData.append("primaryColour", colla.primaryColour);
        formData.append("secondaryColour", colla.secondaryColour);
        if (colla.logo) formData.append("logo", colla.logo, colla.logo.name);
        formData.append("music", colla.music);
        formData.append("email", colla.email);
        formData.append("instagram", colla.instagram);
        formData.append("figures", colla.figures);

        await fetch(URL_PREFIX + "/api/colles", {
            method: "PUT",
            body: formData,
        });
    } catch (error) { throw new Error("No s'ha pogut actualitzar la colla. \nMotiu: " + error); }
}

async function deleteColla(id: string) {
    try {
        await fetch(URL_PREFIX + "/api/colles", {
            method: "DELETE",
            headers: new Headers({
                accept: "application/json",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                id: id,
            }),
        });
    } catch (error) { throw new Error("No s'ha pogut eliminar la colla. \nMotiu: " + error); }
}


async function getAllFiguresNoImage() {
    try {
        const figures = await fetch(URL_PREFIX + `/api/figures/noimage`).then(
            (response) => response.json() as Promise<Figura[]>
        );
        return figures;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir totes les figures sense imatge. \nMotiu: " + error);
    }
}

async function getAllFigures() {
    try {
        const figures = await fetch(URL_PREFIX + `/api/figures`).then(
            (response) => response.json() as Promise<Figura[]>
        );
        return figures;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir totes les figures. \nMotiu: " + error);
    }
}