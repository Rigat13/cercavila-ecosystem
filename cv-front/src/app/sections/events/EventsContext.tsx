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
import {getAllUsers_digiProduRepo} from "@/modules/users/application/get-all/getAllUsers";
import {updateUser_digiProduRepo} from "@/modules/users/application/update/updateUser";

export interface ContextState {
    events: Event[];
    eventsNoImage: Event[];
    users: User[];
    createEvent: (event: { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) => Promise<void>;
    updateEvent: (event: { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) => Promise<void>;
    deleteEvent: (eventId: string) => Promise<void>;

    updateUser: (user: { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string;
        password: string; roles: string[]; coins: number; events: string[]; activeUserImage: string; activeUserImageFrame: string;
        activeUserBackgroundImage: string; activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) => Promise<void>;
}

export const EventsContext = createContext({} as ContextState);

export const EventsContextProvider = ({
    children,
    repository,
}: React.PropsWithChildren<{ repository: EventRepository }>) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [eventsNoImage, setEventsNoImage] = useState<Event[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    async function create({ id, name, description, image, primaryColour, secondaryColour, price, type }:
        { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) {
        await storeEvent(repository, { id, name, description, image, primaryColour, secondaryColour, price, type });
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

    async function getUsers() {
        return getAllUsers_digiProduRepo(repository).then((users) => {
            setUsers(users);
        });
    }

    async function update({ id, name, description, image, primaryColour, secondaryColour, price, type }:
        { id: string; name: string; description: string; image: File | null; primaryColour: string; secondaryColour: string; price: number; type: string; }) {
        await updateEvent(repository, { id, name, description, image, primaryColour, secondaryColour, price, type });
        await getEvents();
    }

    async function deleteC(eventId: string) {
        await deleteEvent(repository, eventId);
    }

    async function updateU({ id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, events, activeUserImage,
                              activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins }:
                              { id: string; nickname: string; name: string; firstSurname: string; secondSurname: string; email: string; password: string; roles: string[];
                                  coins: number; events: string[]; activeUserImage: string; activeUserImageFrame: string; activeUserBackgroundImage: string;
                                  activeUserTitle: string; activeUserBackgroundColour: string; activePins: string[]; }) {
        try { await updateUser_digiProduRepo(repository, { id, nickname, name, firstSurname, secondSurname, email, password, roles, coins, events, activeUserImage,
            activeUserImageFrame, activeUserBackgroundImage, activeUserTitle, activeUserBackgroundColour, activePins });
        } catch (e) { throw "L'error en l'actualització de l'usuari és: "+e; }
        await getUsers();
    }

    useEffect(() => {
        getEventsNoImage();
        getEvents();
        getUsers();
    }, []);

    return (
        <EventsContext.Provider value={{ events, eventsNoImage, users, createEvent: create, updateEvent: update, deleteEvent: deleteC, updateUser: updateU }}>
            {children}
        </EventsContext.Provider>
    );
}

export const useEventsContext = () => useContext(EventsContext);

