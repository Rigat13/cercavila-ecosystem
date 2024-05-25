import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {URL_PREFIX} from "@/modules/digitalproducts/infrastructure/configuration";
import {User} from "@/modules/users/domain/User";

export function createApiDigitalProductRepository(): DigitalProductRepository {
    return {
        storeDigitalProduct, getDigitalProductById, getDigitalProductByName, getAllDigitalProductsByName,
        getAllDigitalProductsByPrice, getAllDigitalProductsByType, getAllDigitalProducts, updateDigitalProduct, deleteDigitalProduct, getAllDigitalProductsNoImage,
        getAllUsers, updateUser
    };
}

async function storeDigitalProduct(digitalProduct: DigitalProduct) {
    try {
        const formData = new FormData();
        formData.append("id", digitalProduct.id);
        formData.append("name", digitalProduct.name);
        formData.append("description", digitalProduct.description);
        if (digitalProduct.image) formData.append("image", digitalProduct.image, digitalProduct.image.name);
        formData.append("primaryColour", digitalProduct.primaryColour);
        formData.append("secondaryColour", digitalProduct.secondaryColour);
        formData.append("price", digitalProduct.price.toString());
        formData.append("type", digitalProduct.type);

        await fetch(URL_PREFIX + "/api/digitalproducts", {
            method: "POST",
            body: formData,
        });
    } catch (error) {
        throw new Error("No s'ha pogut crear el producte digital. \nMotiu: " + error);
    }
}

async function getDigitalProductById(id: string) {
    try {
        const digitalProduct = await fetch(URL_PREFIX + `/api/digitalproducts/id/${id}`).then(
        (response) => response.json() as Promise<DigitalProduct>
        );
        return digitalProduct;
    } catch (error) { throw new Error("No s'ha pogut obtenir el producte digital amb l'id. \nMotiu: " + error); }
}

async function getDigitalProductByName(name: string) {
    try {
        const digitalProduct = await fetch(URL_PREFIX + `/api/digitalproducts/name/${name}`).then(
        (response) => response.json() as Promise<DigitalProduct>
        );
        return digitalProduct;
    } catch (error) { throw new Error("No s'ha pogut obtenir el producte digital amb el nom. \nMotiu: " + error); }
}

async function getAllDigitalProductsByName() {
    try {
        const digitalProducts = await fetch(URL_PREFIX + `/api/digitalproducts/name`).then(
            (response) => response.json() as Promise<DigitalProduct[]>
        );
        return digitalProducts;
    } catch (error) { throw new Error("No s'ha pogut obtenir tots els producte digitals ordenats per nom. \nMotiu: " + error); }
}

async function getAllDigitalProductsByPrice() {
    try {
        const digitalProducts = await fetch(URL_PREFIX + `/api/digitalproducts/price`).then(
            (response) => response.json() as Promise<DigitalProduct[]>
        );
        return digitalProducts;
    } catch (error) { throw new Error("No s'ha pogut obtenir tots els producte digitals ordenats per preu. \nMotiu: " + error); }
}

async function getAllDigitalProductsByType() {
    try {
        const digitalProducts = await fetch(URL_PREFIX + `/api/digitalproducts/type`).then(
            (response) => response.json() as Promise<DigitalProduct[]>
        );
        return digitalProducts;
    } catch (error) { throw new Error("No s'ha pogut obtenir tots els producte digitals ordenats per tipus. \nMotiu: " + error); }

}

async function getAllDigitalProducts() {
    try {
        const digitalProducts = await fetch(URL_PREFIX + `/api/digitalproducts`).then(
            (response) => response.json() as Promise<DigitalProduct[]>
        );
        return digitalProducts;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir tots els producte digitals. \nMotiu: " + error);
    }
}

async function getAllDigitalProductsNoImage() {
    try {
        const digitalProducts = await fetch(URL_PREFIX + `/api/digitalproducts/noimage`).then(
            (response) => response.json() as Promise<DigitalProduct[]>
        );
        return digitalProducts;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir tots els producte digitals sense imatge. \nMotiu: " + error);
    }
}

async function updateDigitalProduct(digitalProduct: DigitalProduct) {
    try {
        const formData = new FormData();
        formData.append("id", digitalProduct.id);
        formData.append("name", digitalProduct.name);
        formData.append("description", digitalProduct.description);
        if (digitalProduct.image) formData.append("image", digitalProduct.image, digitalProduct.image.name);
        formData.append("primaryColour", digitalProduct.primaryColour);
        formData.append("secondaryColour", digitalProduct.secondaryColour);
        formData.append("price", digitalProduct.price.toString());
        formData.append("type", digitalProduct.type);

        await fetch(URL_PREFIX + "/api/digitalproducts", {
            method: "PUT",
            body: formData,
        });
    } catch (error) { throw new Error("No s'ha pogut actualitzar el producte digital. \nMotiu: " + error); }
}

async function deleteDigitalProduct(id: string) {
    try {
        await fetch(URL_PREFIX + "/api/digitalproducts", {
            method: "DELETE",
            headers: new Headers({
                accept: "application/json",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                id: id,
            }),
        });
    } catch (error) { throw new Error("No s'ha pogut eliminar el producte digital. \nMotiu: " + error); }
}

async function getAllUsers() {
    try {
        const users = await fetch(URL_PREFIX + `/api/users`).then(
            (response) => response.json() as Promise<User[]>
        );
        return users;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir totes els usuaris. \nMotiu: " + error);
    }
}

async function updateUser(user: User) {
    try {
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("nickname", user.nickname);
        formData.append("name", user.name);
        formData.append("firstSurname", user.firstSurname);
        formData.append("secondSurname", user.secondSurname);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("roles", user.roles.join(","));
        formData.append("coins", user.coins.toString());
        formData.append("digitalProducts", user.digitalProducts.join(","));
        formData.append("activeUserImage", user.activeUserImage);
        formData.append("activeUserImageFrame", user.activeUserImageFrame);
        formData.append("activeUserBackgroundImage", user.activeUserBackgroundImage);
        formData.append("activeUserTitle", user.activeUserTitle);
        formData.append("activeUserBackgroundColour", user.activeUserBackgroundColour);
        formData.append("activePins", user.activePins.toString().split(",").join(","));

        const response = await fetch(URL_PREFIX + "/api/users", {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            if (response.status === 409) { throw new Error("El nom d'usuari o el correu ja existeixen."); }
            else { throw new Error("Error de servidor inesperat.");}
        }
    } catch (error) { throw new Error("No s'ha pogut actualitzar l'usuari. \nMotiu: " + error); }
}
