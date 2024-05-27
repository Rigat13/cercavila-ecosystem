import {EventRepository} from "@/modules/events/domain/EventRepository";
import {Event} from "@/modules/events/domain/Event";
import {URL_PREFIX} from "@/modules/events/infrastructure/configuration";
import {User} from "@/modules/users/domain/User";
import {Activity} from "../../activities/domain/Activity";
import {DigitalProduct} from "../../digitalproducts/domain/DigitalProduct";

export function createApiEventRepository(): EventRepository {
    return {
        storeEvent, getEventById, getEventByName, getAllEventsByName,
        getAllEventsByType, getAllEvents, updateEvent, deleteEvent, getAllEventsNoImage,
        getAllUsers, updateUser
    };
}

async function storeEvent(event: Event) {
    try {
        const formData = new FormData();
        formData.append("id", event.id);
        formData.append("name", event.name);
        formData.append("description", event.description);
        if (event.image) formData.append("image", event.image, event.image.name);
        formData.append("primaryColour", event.primaryColour);
        formData.append("secondaryColour", event.secondaryColour);
        formData.append("type", event.type);
        formData.append("startDate", event.startDate);
        formData.append("endDate", event.endDate);
        formData.append("cercatrivies", event.cercatrivies.join(","));
        formData.append("firstCoinsReward", event.firstCoinsReward.toString());
        formData.append("firstDigitalProductsReward", event.firstDigitalProductsReward.join(","));
        formData.append("secondCoinsReward", event.secondCoinsReward.toString());
        formData.append("secondDigitalProductsReward", event.secondDigitalProductsReward.join(","));
        formData.append("thirdCoinsReward", event.thirdCoinsReward.toString());
        formData.append("thirdDigitalProductsReward", event.thirdDigitalProductsReward.join(","));
        formData.append("fourthTenthCoinsReward", event.fourthTenthCoinsReward.toString());
        formData.append("fourthTenthDigitalProductsReward", event.fourthTenthDigitalProductsReward.join(","));
        formData.append("allCoinsReward", event.allCoinsReward.toString());
        formData.append("allDigitalProductsReward", event.allDigitalProductsReward.join(","));

        await fetch(URL_PREFIX + "/api/events", {
            method: "POST",
            body: formData,
        });
    } catch (error) {
        throw new Error("No s'ha pogut crear el producte digital. \nMotiu: " + error);
    }
}

async function getEventById(id: string) {
    try {
        const event = await fetch(URL_PREFIX + `/api/events/id/${id}`).then(
        (response) => response.json() as Promise<Event>
        );
        return event;
    } catch (error) { throw new Error("No s'ha pogut obtenir el producte digital amb l'id. \nMotiu: " + error); }
}

async function getEventByName(name: string) {
    try {
        const event = await fetch(URL_PREFIX + `/api/events/name/${name}`).then(
        (response) => response.json() as Promise<Event>
        );
        return event;
    } catch (error) { throw new Error("No s'ha pogut obtenir el producte digital amb el nom. \nMotiu: " + error); }
}

async function getAllEventsByName() {
    try {
        const events = await fetch(URL_PREFIX + `/api/events/name`).then(
            (response) => response.json() as Promise<Event[]>
        );
        return events;
    } catch (error) { throw new Error("No s'ha pogut obtenir tots els producte digitals ordenats per nom. \nMotiu: " + error); }
}

async function getAllEventsByType() {
    try {
        const events = await fetch(URL_PREFIX + `/api/events/type`).then(
            (response) => response.json() as Promise<Event[]>
        );
        return events;
    } catch (error) { throw new Error("No s'ha pogut obtenir tots els producte digitals ordenats per tipus. \nMotiu: " + error); }

}

async function getAllEvents() {
    try {
        const events = await fetch(URL_PREFIX + `/api/events`).then(
            (response) => response.json() as Promise<Event[]>
        );
        return events;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir tots els producte digitals. \nMotiu: " + error);
    }
}

async function getAllEventsNoImage() {
    try {
        const events = await fetch(URL_PREFIX + `/api/events/noimage`).then(
            (response) => response.json() as Promise<Event[]>
        );
        return events;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir tots els producte digitals sense imatge. \nMotiu: " + error);
    }
}

async function updateEvent(event: Event) {
    try {
        const formData = new FormData();
        formData.append("id", event.id);
        formData.append("name", event.name);
        formData.append("description", event.description);
        if (event.image) formData.append("image", event.image, event.image.name);
        formData.append("primaryColour", event.primaryColour);
        formData.append("secondaryColour", event.secondaryColour);
        formData.append("type", event.type);
        formData.append("startDate", event.startDate);
        formData.append("endDate", event.endDate);
        formData.append("cercatrivies", event.cercatrivies.join(","));
        formData.append("firstCoinsReward", event.firstCoinsReward.toString());
        formData.append("firstDigitalProductsReward", event.firstDigitalProductsReward.join(","));
        formData.append("secondCoinsReward", event.secondCoinsReward.toString());
        formData.append("secondDigitalProductsReward", event.secondDigitalProductsReward.join(","));
        formData.append("thirdCoinsReward", event.thirdCoinsReward.toString());
        formData.append("thirdDigitalProductsReward", event.thirdDigitalProductsReward.join(","));
        formData.append("fourthTenthCoinsReward", event.fourthTenthCoinsReward.toString());
        formData.append("fourthTenthDigitalProductsReward", event.fourthTenthDigitalProductsReward.join(","));
        formData.append("allCoinsReward", event.allCoinsReward.toString());
        formData.append("allDigitalProductsReward", event.allDigitalProductsReward.join(","));

        await fetch(URL_PREFIX + "/api/events", {
            method: "PUT",
            body: formData,
        });
    } catch (error) { throw new Error("No s'ha pogut actualitzar el producte digital. \nMotiu: " + error); }
}

async function deleteEvent(id: string) {
    try {
        await fetch(URL_PREFIX + "/api/events", {
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

async function getAllActivitiesNoImage() {
    try {
        const activities = await fetch(URL_PREFIX + `/api/activities/noimage`).then(
            (response) => response.json() as Promise<Activity[]>
        );
        return activities;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir totes les activities sense imatge. \nMotiu: " + error);
    }
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

