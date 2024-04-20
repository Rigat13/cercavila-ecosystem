export const lang = ["ca", "es", "en"];
export const defaultLang = "ca";

interface DictionaryEntry {
    // GENERAL
    cercavilaTitle: string;
    errorFound: string;
    unreachablePage: string;
    retry: string;
    maxFileSize: string;

    // COLLA
    collaName: string;
    collaEntity: string;
    collaFoundationYear: string;
    collaDescription: string;
    collaType: string;
    collaNeighbourhood: string;
    collaLogo: string;

    // COLLA TYPE
    selectCollaType: string;
    collaTypeInstitutional: string;
    collaTypeNeighbourhood: string;
    collaTypeStreet: string;
    collaTypeEntity: string;
    collaTypeTheatrical: string;
    collaTypeScout: string;
    collaTypeNursingHome: string;
    collaTypeSportsClub: string;
    collaTypeSchool: string;
    collaTypeInstitute: string;
    collaTypeNursery: string;
    collaTypePrivate: string;

    // COLLA NEIGHBOURHOOD
    selectNeighbourhood: string;
    neighbourhoodCentre: string;
    neighbourhoodEixample: string;
    neighbourhoodPlaDenBoet: string;
    neighbourhoodCerdanyola: string;
    neighbourhoodPeramasEsmandies: string;
    neighbourhoodLaLlantia: string;
    neighbourhoodViaEuropaNouParcCentral: string;
    neighbourhoodCirera: string;
    neighbourhoodElsMolins: string;
    neighbourhoodVistaAlegre: string;
    neighbourhoodRocafonda: string;
    neighbourhoodElPalau: string;
    neighbourhoodLesSantesEscorxador: string;
    neighbourhoodLHavana: string;
    neighbourhoodLesCincSenies: string;
    neighbourhoodVallveric: string;

    // CREATE COLLA
    collesTitle: string;
    createCollaTitle: string;
    createCollaButton: string;

    collesNameInvalid: string;
    collesEntityInvalid: string;
    collesFoundationYearInvalid: string;
    collesDescriptionInvalid: string;
    collesTypeInvalid: string;
    collesNeighbourhoodInvalid: string;

    successCreateCollaMessage: string;
    errorCreateCollaMessage: string;
    createAnotherCollaButton: string;
    retryCreateCollaButton: string;

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
    collaNotFoundWithId: string;
    errorRetrievingCollaMessage: string;
}

export const dictionary: Record<string, DictionaryEntry> = {
    ca: {
        // GENERAL
        cercavilaTitle: "Cercavila",
        errorFound: "Hi ha hagut un error",
        unreachablePage: "No s'esperava arribar aquí",
        retry: "Torna a intentar",
        maxFileSize: "Mida màxima del fitxer: ",

        // COLLA
        collaName: "Nom",
        collaEntity: "Entitat",
        collaFoundationYear: "Any de fundació",
        collaDescription: "Descripció",
        collaType: "Tipus",
        collaNeighbourhood: "Barri",
        collaLogo: "Logotip",

        // COLLA TYPE
        selectCollaType: "Tipus de colla",
        collaTypeInstitutional: "Institucional",
        collaTypeNeighbourhood: "Barri",
        collaTypeStreet: "Carrer",
        collaTypeEntity: "Entitat",
        collaTypeTheatrical: "Grup d'animació",
        collaTypeScout: "Esplai",
        collaTypeNursingHome: "Casals i residències",
        collaTypeSportsClub: "Club esportiu",
        collaTypeSchool: "Escola",
        collaTypeInstitute: "Institut",
        collaTypeNursery: "Escola bressol",
        collaTypePrivate: "Particular",

        // COLLA NEIGHBOURHOOD
        selectNeighbourhood: "Barri",
        neighbourhoodCentre: "Centre",
        neighbourhoodEixample: "Eixample",
        neighbourhoodPlaDenBoet: "Pla d'en Boet",
        neighbourhoodCerdanyola: "Cerdanyola",
        neighbourhoodPeramasEsmandies: "Peramàs-Esmandies",
        neighbourhoodLaLlantia: "La Llàntia",
        neighbourhoodViaEuropaNouParcCentral: "Via Europa-Nou Parc Central",
        neighbourhoodCirera: "Cirera",
        neighbourhoodElsMolins: "Els Molins",
        neighbourhoodVistaAlegre: "Vista Alegre",
        neighbourhoodRocafonda: "Rocafonda",
        neighbourhoodElPalau: "El Palau",
        neighbourhoodLesSantesEscorxador: "Les Santes-Escorxador",
        neighbourhoodLHavana: "L'Havana",
        neighbourhoodLesCincSenies: "Les Cinc Sénies",
        neighbourhoodVallveric: "Vallveric",

        // CREATE COLLA
        collesTitle: "Colles registrades",
        createCollaTitle: "Crea una nova colla",
        createCollaButton: "Crea la colla",

        collesNameInvalid: "El nom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        collesEntityInvalid: "L'entitat no és vàlida. Ha de començar en majúscula i tenir caràcters entre: ",
        collesFoundationYearInvalid: "L'any de fundació no és vàlid. Ha de ser un número entre: ",
        collesDescriptionInvalid: "La descripció no és vàlida. Ha de tenir caràcters vàlids entre: ",
        collesTypeInvalid: "El tipus no és vàlid. Ha de tenir caràcters vàlids entre: ",
        collesNeighbourhoodInvalid: "El barri no és vàlid. Ha de tenir caràcters vàlids entre: ",

        successCreateCollaMessage: "La colla s'ha creat amb èxit",
        errorCreateCollaMessage: "La colla no s'ha pogut crear. \nMotiu: ",
        createAnotherCollaButton: "Crear una altra colla",
        retryCreateCollaButton: "Torna a intentar",

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
        collaNotFoundWithId: "No s'ha trobat la colla amb l'identificador: ",
        errorRetrievingCollaMessage: "Error en obtenir la informació de la colla. \nMotiu: ",
    },
    es: {
        // GENERAL
        cercavilaTitle: "Cercavila",
        errorFound: "Ha habido un error",
        unreachablePage: "No se esperaba llegar aquí",
        retry: "Vuelve a intentar",
        maxFileSize: "Tamaño máximo del archivo: ",

        // COLLA
        collaName: "Nombre",
        collaEntity: "Entidad",
        collaFoundationYear: "Año de fundación",
        collaDescription: "Descripción",
        collaType: "Tipo",
        collaNeighbourhood: "Barrio",
        collaLogo: "Logotipo",

        // COLLA TYPE
        selectCollaType: "Tipo de colla",
        collaTypeInstitutional: "Institucional",
        collaTypeNeighbourhood: "Barrio",
        collaTypeStreet: "Calle",
        collaTypeEntity: "Entidad",
        collaTypeTheatrical: "Grupo de animación",
        collaTypeScout: "Esplai",
        collaTypeNursingHome: "Casales y residencias",
        collaTypeSportsClub: "Club deportivo",
        collaTypeSchool: "Escuela",
        collaTypeInstitute: "Instituto",
        collaTypeNursery: "Guardería",
        collaTypePrivate: "Particular",

        // COLLA NEIGHBOURHOOD
        selectNeighbourhood: "Barrio",
        neighbourhoodCentre: "Centre",
        neighbourhoodEixample: "Eixample",
        neighbourhoodPlaDenBoet: "Pla d'en Boet",
        neighbourhoodCerdanyola: "Cerdanyola",
        neighbourhoodPeramasEsmandies: "Peramàs-Esmandies",
        neighbourhoodLaLlantia: "La Llàntia",
        neighbourhoodViaEuropaNouParcCentral: "Via Europa-Nou Parc Central",
        neighbourhoodCirera: "Cirera",
        neighbourhoodElsMolins: "Els Molins",
        neighbourhoodVistaAlegre: "Vista Alegre",
        neighbourhoodRocafonda: "Rocafonda",
        neighbourhoodElPalau: "El Palau",
        neighbourhoodLesSantesEscorxador: "Les Santes-Escorxador",
        neighbourhoodLHavana: "L'Havana",
        neighbourhoodLesCincSenies: "Les Cinc Sénies",
        neighbourhoodVallveric: "Vallveric",

        // CREATE COLLA
        collesTitle: "Collas registradas",
        createCollaTitle: "Crea una nueva colla",
        createCollaButton: "Crea la colla",

        collesNameInvalid: "El nombre no es válido. Debe contener carácteres válidos y tener entre: ",
        collesEntityInvalid: "La entidad no es válida. Debe empezar en mayúscula y tener carácteres entre: ",
        collesFoundationYearInvalid: "El año de fundación no es válido. Debe ser un número entre: ",
        collesDescriptionInvalid: "La descripción no es válida. Debe tener carácteres válidos entre: ",
        collesTypeInvalid: "El tipo no es válido. Debe tener carácteres válidos entre: ",
        collesNeighbourhoodInvalid: "El barrio no es válido. Debe tener carácteres válidos entre: ",

        successCreateCollaMessage: "La colla se ha creado con éxito",
        errorCreateCollaMessage: "La colla no se ha podido crear. \nMotivo: ",
        createAnotherCollaButton: "Crear otra colla",
        retryCreateCollaButton: "Volver a intentar",

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
        collaNotFoundWithId: "No se ha encontrado la colla con el identificador: ",
        errorRetrievingCollaMessage: "Error al obtener la información de la colla. \nMotivo: ",
    },
    en: {
        // GENERAL
        cercavilaTitle: "Cercavila",
        errorFound: "An error has occurred",
        unreachablePage: "Unexpected path",
        retry: "Retry",
        maxFileSize: "Maximum file size: ",

        // COLLA
        collaName: "Name",
        collaEntity: "Entity",
        collaFoundationYear: "Foundation year",
        collaDescription: "Description",
        collaType: "Type",
        collaNeighbourhood: "Neighbourhood",
        collaLogo: "Logo",

        // COLLA TYPE
        selectCollaType: "Colla type",
        collaTypeInstitutional: "Institutional",
        collaTypeNeighbourhood: "Neighbourhood",
        collaTypeStreet: "Street",
        collaTypeEntity: "Entity",
        collaTypeTheatrical: "Theatrical troupe",
        collaTypeScout: "Scout group",
        collaTypeNursingHome: "Nursing homes",
        collaTypeSportsClub: "Sports club",
        collaTypeSchool: "School",
        collaTypeInstitute: "Institute",
        collaTypeNursery: "Nursery",
        collaTypePrivate: "Private",

        // COLLA NEIGHBOURHOOD
        selectNeighbourhood: "Neighbourhood",
        neighbourhoodCentre: "Centre",
        neighbourhoodEixample: "Eixample",
        neighbourhoodPlaDenBoet: "Pla d'en Boet",
        neighbourhoodCerdanyola: "Cerdanyola",
        neighbourhoodPeramasEsmandies: "Peramàs-Esmandies",
        neighbourhoodLaLlantia: "La Llàntia",
        neighbourhoodViaEuropaNouParcCentral: "Via Europa-Nou Parc Central",
        neighbourhoodCirera: "Cirera",
        neighbourhoodElsMolins: "Els Molins",
        neighbourhoodVistaAlegre: "Vista Alegre",
        neighbourhoodRocafonda: "Rocafonda",
        neighbourhoodElPalau: "El Palau",
        neighbourhoodLesSantesEscorxador: "Les Santes-Escorxador",
        neighbourhoodLHavana: "L'Havana",
        neighbourhoodLesCincSenies: "Les Cinc Sénies",
        neighbourhoodVallveric: "Vallveric",

        // CREATE COLLA
        collesTitle: "Registered colles",
        createCollaTitle: "Create a new colla",
        createCollaButton: "Create colla",

        collesNameInvalid: "The name is not valid. It must contain valid characters and be between: ",
        collesEntityInvalid: "The entity is not valid. It must start with an uppercase letter and have characters between: ",
        collesFoundationYearInvalid: "The foundation year is not valid. It must be a number between: ",
        collesDescriptionInvalid: "The description is not valid. It must have valid characters between: ",
        collesTypeInvalid: "The type is not valid. It must have valid characters between: ",
        collesNeighbourhoodInvalid: "The neighbourhood is not valid. It must have valid characters between: ",

        successCreateCollaMessage: "The colla has been created successfully",
        errorCreateCollaMessage: "The colla could not be created. \nReason: ",
        createAnotherCollaButton: "Create another colla",
        retryCreateCollaButton: "Retry",

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
        collaNotFoundWithId: "Colla not found with id: ",
        errorRetrievingCollaMessage: "Error retrieving colla information. \nReason: ",
    }
}