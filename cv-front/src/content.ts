interface DictionaryEntry {
    // GENERAL
    cercavilaTitle: string;

    // COLLA
    collaName: string;
    collaEntity: string;
    collaFoundationYear: string;

    // CREATE COLLA
    collesTitle: string;
    createCollaTitle: string;
    createCollaButton: string;

    collesNameNotValid: string;
    collesEntityNotValid: string;
    collesFoundationYearNotValid: string;

    successCreateCollaMessage: string;
    errorCreateCollaMessage: string;
    createAnotherCollaButton: string;

    // UPDATE COLLA
    updateCollaTitle: string;
    updateCollaButton: string;
    goToCollesButton: string;
    deleteCollaButton: string;
    warningDeleteCollaMessage: string;
    cancelDeleteCollaButton: string;
    confirmDeleteCollaButton: string;
    successUpdateCollaMessage: string;
    errorUpdateCollaMessage: string;
    successDeleteCollaMessage: string;
    errorDeleteCollaMessage: string;
}

export const dictionary: Record<string, DictionaryEntry> = {
    ca: {
        // GENERAL
        cercavilaTitle: "Cercavila",

        // COLLA
        collaName: "Nom",
        collaEntity: "Entitat",
        collaFoundationYear: "Any de fundació",

        // CREATE COLLA
        collesTitle: "Colles registrades",
        createCollaTitle: "Crea una nova colla",
        createCollaButton: "Crea la colla",

        collesNameNotValid: "El nom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        collesEntityNotValid: "L'entitat no és vàlida. Ha de començar en majúscula i tenir caràcters entre: ",
        collesFoundationYearNotValid: "L'any de fundació no és vàlid. Ha de ser un número entre: ",

        successCreateCollaMessage: "La colla s'ha creat amb èxit",
        errorCreateCollaMessage: "La colla no s'ha pogut crear. \nMotiu: ",
        createAnotherCollaButton: "Crear una altra colla",

        // UPDATE COLLA
        updateCollaTitle: "Edita la colla",
        updateCollaButton: "Edita la colla",
        goToCollesButton: "Torna a les colles",
        deleteCollaButton: "Esborrar la colla",
        warningDeleteCollaMessage: "Voleu esborrar la colla de manera permanent? No es pot desfer aquesta acció.",
        cancelDeleteCollaButton: "Cancel·lar",
        confirmDeleteCollaButton: "Esborrar permanentment",
        successUpdateCollaMessage: "La colla s'ha editat amb èxit",
        errorUpdateCollaMessage: "La colla no s'ha pogut editar. \nMotiu: ",
        successDeleteCollaMessage: "La colla s'ha esborrat amb èxit",
        errorDeleteCollaMessage: "La colla no s'ha pogut esborrar. \nMotiu: ",
    },
    es: {
        // GENERAL
        cercavilaTitle: "Cercavila",

        // COLLA
        collaName: "Nombre",
        collaEntity: "Entidad",
        collaFoundationYear: "Año de fundación",

        // CREATE COLLA
        collesTitle: "Collas registradas",
        createCollaTitle: "Crea una nueva colla",
        createCollaButton: "Crea la colla",

        collesNameNotValid: "El nombre no es válido. Debe contener caracteres válidos y tener entre: ",
        collesEntityNotValid: "La entidad no es válida. Debe empezar en mayúscula y tener caracteres entre: ",
        collesFoundationYearNotValid: "El año de fundación no es válido. Debe ser un número entre: ",

        successCreateCollaMessage: "La colla se ha creado con éxito",
        errorCreateCollaMessage: "La colla no se ha podido crear. \nMotivo: ",
        createAnotherCollaButton: "Crear otra colla",

        // UPDATE COLLA
        updateCollaTitle: "Edita la colla",
        updateCollaButton: "Edita la colla",
        goToCollesButton: "Vuelve a las colles",
        deleteCollaButton: "Borrar la colla",
        warningDeleteCollaMessage: "¿Quieres borrar la colla de manera permanente? No se puede deshacer esta acción.",
        cancelDeleteCollaButton: "Cancelar",
        confirmDeleteCollaButton: "Borrar permanentemente",
        successUpdateCollaMessage: "La colla se ha editado con éxito",
        errorUpdateCollaMessage: "La colla no se ha podido editar. \nMotivo: ",
        successDeleteCollaMessage: "La colla se ha borrado con éxito",
        errorDeleteCollaMessage: "La colla no se ha podido borrar. \nMotivo: ",
    },
    en: {
        // GENERAL
        cercavilaTitle: "Cercavila",

        // COLLA
        collaName: "Name",
        collaEntity: "Entity",
        collaFoundationYear: "Foundation year",

        // CREATE COLLA
        collesTitle: "Registered colles",
        createCollaTitle: "Create a new colla",
        createCollaButton: "Create colla",

        collesNameNotValid: "The name is not valid. It must contain valid characters and be between: ",
        collesEntityNotValid: "The entity is not valid. It must start with an uppercase letter and have characters between: ",
        collesFoundationYearNotValid: "The foundation year is not valid. It must be a number between: ",

        successCreateCollaMessage: "The colla has been created successfully",
        errorCreateCollaMessage: "The colla could not be created. \nReason: ",
        createAnotherCollaButton: "Create another colla",

        // UPDATE COLLA
        updateCollaTitle: "Edit colla",
        updateCollaButton: "Edit colla",
        goToCollesButton: "Go back to colles",
        deleteCollaButton: "Delete colla",
        warningDeleteCollaMessage: "Do you want to delete the colla permanently? This action cannot be undone.",
        cancelDeleteCollaButton: "Cancel",
        confirmDeleteCollaButton: "Delete permanently",
        successUpdateCollaMessage: "The colla has been edited successfully",
        errorUpdateCollaMessage: "The colla could not be edited. \nReason: ",
        successDeleteCollaMessage: "The colla has been deleted successfully",
        errorDeleteCollaMessage: "The colla could not be deleted. \nReason: ",
    }
}