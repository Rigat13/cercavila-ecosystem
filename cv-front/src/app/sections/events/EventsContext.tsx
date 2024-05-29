'use client';

import {Event} from "@/modules/events/domain/Event";
import {EventRepository} from "@/modules/events/domain/EventRepository";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getAllEvents} from "@/modules/events/application/get-all/getAllEvents";
import {getAllEventsNoImage} from "@/modules/events/application/get-all/getAllEventsNoImage";
import {storeEvent} from "@/modules/events/application/store/storeEvent";
import {updateEvent} from "@/modules/events/application/update/updateEvent";
import {deleteEvent} from "@/modules/events/application/delete/deleteEvent";
import {User} from "@/modules/users/domain/User";
import {getAllUsers_eventRepo} from "@/modules/users/application/get-all/getAllUsers";
import {updateUser_eventRepo} from "@/modules/users/application/update/updateUser";
import {Activity} from "../../../modules/activities/domain/Activity";
import {getAllActivitiesNoImage_eventRepo} from "../../../modules/activities/application/get-all/getAllActivitiesNoImage";
import {getAllDigitalProducts_eventRepo} from "../../../modules/digitalproducts/application/get-all/getAllDigitalProducts";
import {DigitalProduct} from "../../../modules/digitalproducts/domain/DigitalProduct";

export interface ContextState {
    events: Event[];
    eventsNoImage: Event[];
    cercatrivies: Activity[];
    digitalProducts: DigitalProduct[];
    users: User[];

    createEvent: (event: { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string;
        type: string; startDate: string; endDate: string; cercatrivies: string[]; firstCoinsReward: number; firstDigitalProductsReward: string[];
        secondCoinsReward: number; secondDigitalProductsReward: string[]; thirdCoinsReward: number; thirdDigitalProductsReward: string[];
        fourthTenthCoinsReward: number; fourthTenthDigitalProductsReward: string[]; allCoinsReward: number; allDigitalProductsReward: string[]; }) => Promise<void>;

    updateEvent: (event: { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string;
        type: string; startDate: string; endDate: string; cercatrivies: string[]; firstCoinsReward: number; firstDigitalProductsReward: string[];
        secondCoinsReward: number; secondDigitalProductsReward: string[]; thirdCoinsReward: number; thirdDigitalProductsReward: string[];
        fourthTenthCoinsReward: number; fourthTenthDigitalProductsReward: string[]; allCoinsReward: number; allDigitalProductsReward: string[]; }) => Promise<void>;

    deleteEvent: (eventId: string) => Promise<void>;

    updateUser: (user: { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string;
        password: string; roles: string[]; coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string;
        activeUserBackgroundImage: string; activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) => Promise<void>;
}


export const EventsContext = createContext({} as ContextState);

export const EventsContextProvider = ({
    children,
    repository,
}: React.PropsWithChildren<{ repository: EventRepository }>) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [eventsNoImage, setEventsNoImage] = useState<Event[]>([]);
    const [cercatrivies, setCercatrivies] = useState<Activity[]>([]);
    const [digitalProducts, setDigitalProducts] = useState<DigitalProduct[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    async function create({id, name, description, image, primaryColour, secondaryColour, type, startDate, endDate, cercatrivies,
                              firstCoinsReward, firstDigitalProductsReward, secondCoinsReward, secondDigitalProductsReward,
                              thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward,
                              allCoinsReward, allDigitalProductsReward}:
                              { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string;
                                  type: string; startDate: string; endDate: string; cercatrivies: string[]; firstCoinsReward: number; firstDigitalProductsReward: string[];
                                  secondCoinsReward: number; secondDigitalProductsReward: string[]; thirdCoinsReward: number; thirdDigitalProductsReward: string[];
                                  fourthTenthCoinsReward: number; fourthTenthDigitalProductsReward: string[]; allCoinsReward: number; allDigitalProductsReward: string[]; }) {
        await storeEvent(repository, { id, name, description, image, primaryColour, secondaryColour, type, startDate, endDate, cercatrivies,
            firstCoinsReward, firstDigitalProductsReward, secondCoinsReward, secondDigitalProductsReward,
            thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward,
            allCoinsReward, allDigitalProductsReward});

        await getEvents();
    }

    async function getEvents() {
        return getAllEvents(repository).then((events) => {
            setEvents(events);
        });
    }

    async function getEventsNoImage() {
        return getAllEventsNoImage(repository).then((events) => {
            setEventsNoImage(events);
        });
    }

    async function getCercatrivies() {
        return getAllActivitiesNoImage_eventRepo(repository).then((activities) => {
            setCercatrivies(activities.filter(activity => activity.type === "activityTypeCercatrivia"));
        });
    }

    async function getUsers() {
        return getAllUsers_eventRepo(repository).then((users) => {
            setUsers(users);
        });
    }

    async function getDigitalProducts() {
        return getAllDigitalProducts_eventRepo(repository).then((digitalProducts) => {
            setDigitalProducts(digitalProducts);
        });
    }

    async function update({id, name, description, image, primaryColour, secondaryColour, type, startDate, endDate, cercatrivies,
                              firstCoinsReward, firstDigitalProductsReward, secondCoinsReward, secondDigitalProductsReward,
                              thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward,
                              allCoinsReward, allDigitalProductsReward}:
                              { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string;
                                  type: string; startDate: string; endDate: string; cercatrivies: string[]; firstCoinsReward: number; firstDigitalProductsReward: string[];
                                  secondCoinsReward: number; secondDigitalProductsReward: string[]; thirdCoinsReward: number; thirdDigitalProductsReward: string[];
                                  fourthTenthCoinsReward: number; fourthTenthDigitalProductsReward: string[]; allCoinsReward: number; allDigitalProductsReward: string[]; }) {

        await updateEvent(repository, { id, name, description, image, primaryColour, secondaryColour, type, startDate, endDate, cercatrivies,
            firstCoinsReward, firstDigitalProductsReward, secondCoinsReward, secondDigitalProductsReward,
            thirdCoinsReward, thirdDigitalProductsReward, fourthTenthCoinsReward, fourthTenthDigitalProductsReward,
            allCoinsReward, allDigitalProductsReward});
        await getEvents();
    }

    async function deleteC(eventId: string) {
        await deleteEvent(repository, eventId);
    }

    async function updateU({ id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
                              activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins }:
                              { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string; password: string; roles: string[];
                                  coins: number; digitalProducts: string[]; activeUserImage: string; activeUserImageFrame: string; activeUserBackgroundImage: string;
                                  activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) {
        try { await updateUser_eventRepo(repository, { id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, digitalProducts, activeUserImage,
            activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins });
        } catch (e) { throw "L'error en l'actualització de l'usuari és: "+e; }
        await getUsers();
    }

    useEffect(() => {
        getEventsNoImage();
        getEvents();
        getCercatrivies();
        getDigitalProducts();
        getUsers();
    }, []);

    return (
        <EventsContext.Provider value={{ events, eventsNoImage, cercatrivies, digitalProducts, users, createEvent: create, updateEvent: update, deleteEvent: deleteC, updateUser: updateU }}>
            {children}
        </EventsContext.Provider>
    );
}

export const useEventsContext = () => useContext(EventsContext);

