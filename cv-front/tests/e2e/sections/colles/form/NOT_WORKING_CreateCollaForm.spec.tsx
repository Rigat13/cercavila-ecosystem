import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {createApiCollaRepository} from "@/modules/colles/infrastructure/ApiCollaRepository";
import {CreateCollaForm} from "@/sections/colles/form/CreateCollaForm";
import {CollesContextProvider} from "@/sections/colles/CollesContext";
import {CollaMother} from "../../../modules/colles/domain/CollesMother";
import {expect} from "sucrase/dist/types/parser/traverser/util";
import {NAME_ERROR_MESSAGE} from "@/modules/colles/domain/colla-attributes/CollaName";
import {describe, it} from "@jest/globals";

//TODO Fix or remove
describe("CreateCollaForm component", () => {
    it("mostra missatge d'èxit quan les dades són correctes", () => {
        const repository = createApiCollaRepository();
        const colla = CollaMother.create();

        render(
            <CollesContextProvider repository={repository}>
                <CreateCollaForm />
            </CollesContextProvider>
        );

        const nameInput = screen.getByLabelText(/name/i);
        userEvent.type(nameInput, colla.name);

        const entityInput = screen.getByLabelText(/entity/i);
        userEvent.type(entityInput, colla.entity);

        const foundationYearInput = screen.getByLabelText(/foundationYear/i);
        userEvent.type(foundationYearInput, colla.foundationYear.toString());

        const submitButton = screen.getByText(/Crea la colla/i);
        userEvent.click(submitButton);

        const successMessage = screen.getByRole("heading", { name: /Colla creada amb èxit/i });
        expect(successMessage).toBeInTheDocument();
    });

    it("mostra missatge d'error si el nom és massa curt", () => {
        const repository = createApiCollaRepository();
        const { name: invalidName } = CollaMother.createWithTooShortName();

        render(
            <CollesContextProvider repository={repository}>
                <CreateCollaForm />
            </CollesContextProvider>
        );

        const nameInput = screen.getByLabelText(/name/i);
        userEvent.type(nameInput, invalidName);

        const errorMessage = screen.getByText(NAME_ERROR_MESSAGE);
        expect(errorMessage).toBeInTheDocument();
    });

    it("mostra missatge d'error si el nom és massa llarg", () => {
        const repository = createApiCollaRepository();
        const { name: invalidName } = CollaMother.createWithTooLongName();

        render(
            <CollesContextProvider repository={repository}>
                <CreateCollaForm />
            </CollesContextProvider>
        );

        const nameInput = screen.getByLabelText(/name/i);
        userEvent.type(nameInput, invalidName);

        const errorMessage = screen.getByText(NAME_ERROR_MESSAGE);
        expect(errorMessage).toBeInTheDocument();
    });

    it("mostra missatge d'error si l'entitat és massa curta", () => {
        const repository = createApiCollaRepository();
        const { entity: invalidEntity } = CollaMother.createWithTooShortEntity();

        render(
            <CollesContextProvider repository={repository}>
                <CreateCollaForm />
            </CollesContextProvider>
        );

        const entityInput = screen.getByLabelText(/entity/i);
        userEvent.type(entityInput, invalidEntity);

        const errorMessage = screen.getByText("Entity must be between 1 and 100 characters");
        expect(errorMessage).toBeInTheDocument();
    });

    it("mostra missatge d'error si l'entitat és massa llarga", () => {
        const repository = createApiCollaRepository();
        const { entity: invalidEntity } = CollaMother.createWithTooLongEntity();

        render(
            <CollesContextProvider repository={repository}>
                <CreateCollaForm />
            </CollesContextProvider>
        );

        const entityInput = screen.getByLabelText(/entity/i);
        userEvent.type(entityInput, invalidEntity);

        const errorMessage = screen.getByText("Entity must be between 1 and 100 characters");
        expect(errorMessage).toBeInTheDocument();
    });

    it("mostra missatge d'error si l'any de fundació és massa petit", () => {
        const repository = createApiCollaRepository();
        const { foundationYear: invalidFoundationYear } = CollaMother.createWithTooSmallFoundationYear();

        render(
            <CollesContextProvider repository={repository}>
                <CreateCollaForm />
            </CollesContextProvider>
        );

        const foundationYearInput = screen.getByLabelText(/foundationYear/i);
        userEvent.type(foundationYearInput, invalidFoundationYear.toString());

        const errorMessage = screen.getByText("Foundation year must be between 1900 and 2100");
        expect(errorMessage).toBeInTheDocument();
    });

    it("mostra missatge d'error si l'any de fundació és massa gran", () => {
        const repository = createApiCollaRepository();
        const { foundationYear: invalidFoundationYear } = CollaMother.createWithTooBigFoundationYear();

        render(
            <CollesContextProvider repository={repository}>
                <CreateCollaForm />
            </CollesContextProvider>
        );

        const foundationYearInput = screen.getByLabelText(/foundationYear/i);
        userEvent.type(foundationYearInput, invalidFoundationYear.toString());

        const errorMessage = screen.getByText("Foundation year must be between 1900 and 2100");
        expect(errorMessage).toBeInTheDocument();
    });
});