import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";
import {Figura} from "@/modules/figures/domain/Figura";
import {URL_PREFIX} from "@/modules/figures/infrastructure/configuration";

export function createApiFiguraRepository(): FiguraRepository {
    return {
        storeFigura, getFiguraById, getFiguraByName, getAllFiguresByName,
        getAllFiguresByYear, getAllFiguresByType, getAllFigures, updateFigura, deleteFigura
    };
}

async function storeFigura(figura: Figura) {
    try {
        const formData = new FormData();
        formData.append("id", figura.id);
        formData.append("name", figura.name);
        formData.append("year", figura.year.toString());
        formData.append("type", figura.type);
        if (figura.image) formData.append("image", figura.image, figura.image.name);
        formData.append("webUrl", figura.webUrl);

        await fetch(URL_PREFIX + "/api/figures", {
            method: "POST",
            body: formData,
        });
    } catch (error) {
        throw new Error("No s'ha pogut crear la figura. \nMotiu: " + error);
    }
}

async function getFiguraById(id: string) {
    try {
        const figura = await fetch(URL_PREFIX + `/api/figures/id/${id}`).then(
        (response) => response.json() as Promise<Figura>
        );
        return figura;
    } catch (error) { throw new Error("No s'ha pogut obtenir la figura amb l'id. \nMotiu: " + error); }
}

async function getFiguraByName(name: string) {
    try {
        const figura = await fetch(URL_PREFIX + `/api/figures/name/${name}`).then(
        (response) => response.json() as Promise<Figura>
        );
        return figura;
    } catch (error) { throw new Error("No s'ha pogut obtenir la figura amb el nom. \nMotiu: " + error); }
}

async function getAllFiguresByName() {
    try {
        const figures = await fetch(URL_PREFIX + `/api/figures/name`).then(
            (response) => response.json() as Promise<Figura[]>
        );
        return figures;
    } catch (error) { throw new Error("No s'ha pogut obtenir totes les figures ordenades per nom. \nMotiu: " + error); }
}

async function getAllFiguresByYear() {
    try {
        const figures = await fetch(URL_PREFIX + `/api/figures/year`).then(
            (response) => response.json() as Promise<Figura[]>
        );
        return figures;
    } catch (error) { throw new Error("No s'ha pogut obtenir totes les figures ordenades per any de fundació. \nMotiu: " + error); }
}

async function getAllFiguresByType() {
    try {
        const figures = await fetch(URL_PREFIX + `/api/figures/type`).then(
            (response) => response.json() as Promise<Figura[]>
        );
        return figures;
    } catch (error) { throw new Error("No s'ha pogut obtenir totes les figures ordenades per tipus. \nMotiu: " + error); }

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

async function updateFigura(figura: Figura) {
    try {
        const formData = new FormData();
        formData.append("id", figura.id);
        formData.append("name", figura.name);
        formData.append("year", figura.year.toString());
        formData.append("type", figura.type);
        if (figura.image) formData.append("image", figura.image, figura.image.name);
        formData.append("webUrl", figura.webUrl);

        await fetch(URL_PREFIX + "/api/figures", {
            method: "PUT",
            body: formData,
        });
    } catch (error) { throw new Error("No s'ha pogut actualitzar la figura. \nMotiu: " + error); }
}

async function deleteFigura(id: string) {
    try {
        await fetch(URL_PREFIX + "/api/figures", {
            method: "DELETE",
            headers: new Headers({
                accept: "application/json",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                id: id,
            }),
        });
    } catch (error) { throw new Error("No s'ha pogut eliminar la figura. \nMotiu: " + error); }
}