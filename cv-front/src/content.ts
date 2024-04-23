export const lang = ["ca", "es", "en"];
export const defaultLang = "ca";

interface DictionaryEntry {
    // -------------------------------------------------------------------------------------------- GENERAL
    cercavilaTitle: string;
    errorFound: string;
    unreachablePage: string;
    retry: string;
    maxFileSize: string;

    // -------------------------------------------------------------------------------------------- COLLA
    collaName: string;
    collaEntity: string;
    collaFoundationYear: string;
    collaDescription: string;
    collaType: string;
    collaNeighbourhood: string;
    collaPrimaryColour: string;
    collaSecondaryColour: string;
    collaLogo: string;
    collaMusic: string;
    collaEmail: string;
    collaInstagram: string;

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

    // MUSIC TYPES
    selectMusic: string;
    musicFlabiol: string;
    musicGralla: string;
    musicBatucada: string;
    musicBand: string;
    musicGrallaBand: string;
    musicOther: string;
    musicNone: string;

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
    collesPrimaryColourInvalid: string;
    collesSecondaryColourInvalid: string;
    collesMusicInvalid: string;
    collesEmailInvalid: string;
    collesInstagramInvalid: string;

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

    // -------------------------------------------------------------------------------------------- FIGURA
    figuraName: string;
    figuraYear: string;
    figuraType: string;
    figuraImage: string;
    figuraWebUrl: string;

    // FIGURA TYPE
    selectFiguraType: string;
    figuraTypeGegant: string;
    figuraTypeGeganto: string;
    figuraTypeCapgros: string;
    figuraTypeNan: string;
    figuraTypeBestia: string;
    figuraTypeMotxilla: string;

    // CREATE FIGURA
    figuresTitle: string;
    createFiguraTitle: string;
    createFiguraButton: string;

    figuraNameInvalid: string;
    figuraYearInvalid: string;
    figuraTypeInvalid: string;
    figuraImageInvalid: string;
    figuraWebUrlInvalid: string;

    successCreateFiguraMessage: string;
    errorCreateFiguraMessage: string;
    createAnotherFiguraButton: string;
    retryCreateFiguraButton: string;

    // UPDATE FIGURA
    updateFiguraTitle: string;
    updateFiguraButton: string;
    goToFiguresButton: string;
    deleteFiguraButton: string;
    warningDeleteFiguraMessage: string;
    cancelDeleteFiguraButton: string;
    confirmDeleteFiguraButton: string;
    successUpdateFiguraMessage: string;
    errorUpdateFiguraMessage: string;
    successDeleteFiguraMessage: string;
    errorDeleteFiguraMessage: string;
    figuraNotFoundWithId: string;
    errorRetrievingFiguraMessage: string;
}

export const dictionary: Record<string, DictionaryEntry> = {
    ca: {
        // -------------------------------------------------------------------------------------------- GENERAL
        cercavilaTitle: "Cercavila",
        errorFound: "Hi ha hagut un error",
        unreachablePage: "No s'esperava arribar aquí",
        retry: "Torna a intentar",
        maxFileSize: "Mida màxima del fitxer: ",

        // -------------------------------------------------------------------------------------------- COLLA
        collaName: "Nom",
        collaEntity: "Entitat",
        collaFoundationYear: "Any de fundació",
        collaDescription: "Descripció",
        collaType: "Tipus",
        collaNeighbourhood: "Barri",
        collaPrimaryColour: "Color primari",
        collaSecondaryColour: "Color secundari",
        collaLogo: "Logotip",
        collaMusic: "Acompanyament musical",
        collaEmail: "Correu electrònic",
        collaInstagram: "Enllaç o usuari d'Instagram",

        // COLLA TYPE
        selectCollaType: "-- Tipus de colla --",
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
        selectNeighbourhood: "-- Barri --",
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

        // MUSIC TYPES
        selectMusic: "-- Acompanyament musical --",
        musicFlabiol: "Flabiol i tamborí",
        musicGralla: "Gralla i percussió",
        musicBatucada: "Batucada",
        musicBand: "Banda",
        musicGrallaBand: "Gralla i banda",
        musicOther: "Altres",
        musicNone: "Sense música",

        // CREATE COLLA
        collesTitle: "Colles registrades",
        createCollaTitle: "Crea una nova colla",
        createCollaButton: "Crea la colla",

        collesNameInvalid: "El nom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        collesEntityInvalid: "L'entitat no és vàlida. Ha de començar en majúscula i tenir caràcters entre: ",
        collesFoundationYearInvalid: "L'any de fundació no és vàlid. Ha de ser un número entre: ",
        collesDescriptionInvalid: "La descripció no és vàlida. Ha de tenir caràcters vàlids entre: ",
        collesTypeInvalid: "El tipus no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",
        collesNeighbourhoodInvalid: "El barri no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",
        collesPrimaryColourInvalid: "El color primari no és vàlid. Ha de seguir el format hexadecimal.",
        collesSecondaryColourInvalid: "El color secundari no és vàlid. Ha de seguir el format hexadecimal.",
        collesMusicInvalid: "L'acompanyament musical no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",
        collesEmailInvalid: "El correu electrònic no és vàlid. Ha de seguir el format de correu amb caràcters vàlids entre: ",
        collesInstagramInvalid: "L'enllaç o usuari d'Instagram no és vàlid. Ha de tenir caràcters vàlids entre: ",

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

        // -------------------------------------------------------------------------------------------- FIGURA
        figuraName: "Nom",
        figuraYear: "Any",
        figuraType: "Tipus",
        figuraImage: "Imatge",
        figuraWebUrl: "Enllaç d'història",

        // FIGURA TYPE
        selectFiguraType: "-- Tipus de figura --",
        figuraTypeGegant: "Gegant",
        figuraTypeGeganto: "Gegantó",
        figuraTypeCapgros: "Capgròs",
        figuraTypeNan: "Nan",
        figuraTypeBestia: "Bestiari",
        figuraTypeMotxilla: "Motxilla",

        // CREATE FIGURA
        figuresTitle: "Figures registrades",
        createFiguraTitle: "Crea una nova figura",
        createFiguraButton: "Crea la figura",

        figuraNameInvalid: "El nom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        figuraYearInvalid: "L'any no és vàlid. Ha de ser un número entre: ",
        figuraTypeInvalid: "El tipus no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",
        figuraImageInvalid: "La imatge no és vàlida. Ha de ser un fitxer vàlid amb mida inferior a: ",
        figuraWebUrlInvalid: "L'enllaç d'història no és vàlid. Ha de tenir caràcters vàlids entre: ",

        successCreateFiguraMessage: "La figura s'ha creat amb èxit",
        errorCreateFiguraMessage: "La figura no s'ha pogut crear. \nMotiu: ",
        createAnotherFiguraButton: "Crear una altra figura",
        retryCreateFiguraButton: "Torna a intentar",

        // UPDATE FIGURA
        updateFiguraTitle: "Edita la figura",
        updateFiguraButton: "Edita la figura",
        goToFiguresButton: "Torna a les figures",
        deleteFiguraButton: "Esborrar la figura",
        warningDeleteFiguraMessage: "Voleu esborrar la figura de manera permanent? No es pot desfer aquesta acció.",
        cancelDeleteFiguraButton: "Cancel·lar",
        confirmDeleteFiguraButton: "Esborrar permanentment",
        successUpdateFiguraMessage: "La figura s'ha editat amb èxit",
        errorUpdateFiguraMessage: "La figura no s'ha pogut editar. \nMotiu: ",
        successDeleteFiguraMessage: "La figura s'ha esborrat amb èxit",
        errorDeleteFiguraMessage: "La figura no s'ha pogut esborrar. \nMotiu: ",
        figuraNotFoundWithId: "Figura no trobada amb id: ",
        errorRetrievingFiguraMessage: "Error en obtenir la informació de la figura. \nMotiu: ",
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
        collaPrimaryColour: "Color primario",
        collaSecondaryColour: "Color secundario",
        collaLogo: "Logotipo",
        collaMusic: "Acompañamiento musical",
        collaEmail: "Correo electrónico",
        collaInstagram: "Enlace o usuario de Instagram",

        // COLLA TYPE
        selectCollaType: "-- Tipo de colla --",
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
        selectNeighbourhood: "-- Barrio --",
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

        // MUSIC TYPES
        selectMusic: "-- Acompañamiento musical --",
        musicFlabiol: "Flabiol y tamborí",
        musicGralla: "Gralla y percusión",
        musicBatucada: "Batucada",
        musicBand: "Banda",
        musicGrallaBand: "Gralla y banda",
        musicOther: "Otros",
        musicNone: "Sin música",

        // CREATE COLLA
        collesTitle: "Collas registradas",
        createCollaTitle: "Crea una nueva colla",
        createCollaButton: "Crea la colla",

        collesNameInvalid: "El nombre no es válido. Debe contener carácteres válidos y tener entre: ",
        collesEntityInvalid: "La entidad no es válida. Debe empezar en mayúscula y tener carácteres entre: ",
        collesFoundationYearInvalid: "El año de fundación no es válido. Debe ser un número entre: ",
        collesDescriptionInvalid: "La descripción no es válida. Debe tener carácteres válidos entre: ",
        collesTypeInvalid: "El tipo no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",
        collesNeighbourhoodInvalid: "El barrio no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",
        collesPrimaryColourInvalid: "El color primario no es válido. Debe seguir el formato hexadecimal.",
        collesSecondaryColourInvalid: "El color secundario no es válido. Debe seguir el formato hexadecimal.",
        collesMusicInvalid: "El acompañamiento musical no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",
        collesEmailInvalid: "El correo electrónico no es válido. Debe seguir el formato de correo con carácteres válidos entre: ",
        collesInstagramInvalid: "El enlace o usuario de Instagram no es válido. Debe tener carácteres válidos entre: ",

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

        // -------------------------------------------------------------------------------------------- FIGURA
        figuraName: "Nombre",
        figuraYear: "Año",
        figuraType: "Tipo",
        figuraImage: "Imagen",
        figuraWebUrl: "Enlace de historia",

        // FIGURA TYPE
        selectFiguraType: "-- Tipo de figura --",
        figuraTypeGegant: "Gigante",
        figuraTypeGeganto: "Gigantón",
        figuraTypeCapgros: "Cabezudo",
        figuraTypeNan: "Enano",
        figuraTypeBestia: "Bestiario",
        figuraTypeMotxilla: "Mochila",

        // CREATE FIGURA
        figuresTitle: "Figuras registradas",
        createFiguraTitle: "Crea una nueva figura",
        createFiguraButton: "Crea la figura",

        figuraNameInvalid: "El nombre no es válido. Debe contener carácteres válidos y tener entre: ",
        figuraYearInvalid: "El año no es válido. Debe ser un número entre: ",
        figuraTypeInvalid: "El tipo no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",
        figuraImageInvalid: "La imagen no es válida. Debe ser un archivo válido con tamaño inferior a: ",
        figuraWebUrlInvalid: "El enlace de historia no es válido. Debe tener carácteres válidos entre: ",

        successCreateFiguraMessage: "La figura se ha creado con éxito",
        errorCreateFiguraMessage: "La figura no se ha podido crear. \nMotivo: ",
        createAnotherFiguraButton: "Crear otra figura",
        retryCreateFiguraButton: "Volver a intentar",

        // UPDATE FIGURA
        updateFiguraTitle: "Edita la figura",
        updateFiguraButton: "Edita la figura",
        goToFiguresButton: "Vuelve a las figures",
        deleteFiguraButton: "Borrar la figura",
        warningDeleteFiguraMessage: "¿Quieres borrar la figura de manera permanente? No se puede deshacer esta acción.",
        cancelDeleteFiguraButton: "Cancelar",
        confirmDeleteFiguraButton: "Borrar permanentemente",
        successUpdateFiguraMessage: "La figura se ha editado con éxito",
        errorUpdateFiguraMessage: "La figura no se ha podido editar. \nMotivo: ",
        successDeleteFiguraMessage: "La figura se ha borrado con éxito",
        errorDeleteFiguraMessage: "La figura no se ha podido borrar. \nMotivo: ",
        figuraNotFoundWithId: "Figura no encontrada con id: ",
        errorRetrievingFiguraMessage: "Error al obtener la información de la figura. \nMotivo: ",
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
        collaPrimaryColour: "Primary colour",
        collaSecondaryColour: "Secondary colour",
        collaLogo: "Logo",
        collaMusic: "Music",
        collaEmail: "Email",
        collaInstagram: "Instagram link or user",

        // COLLA TYPE
        selectCollaType: "-- Colla type --",
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
        selectNeighbourhood: "-- Neighbourhood --",
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

        // MUSIC TYPES
        selectMusic: "-- Music --",
        musicFlabiol: "Flabiol and tamborí",
        musicGralla: "Gralla and percussion",
        musicBatucada: "Batucada",
        musicBand: "Band",
        musicGrallaBand: "Gralla and band",
        musicOther: "Other",
        musicNone: "No music",

        // CREATE COLLA
        collesTitle: "Registered colles",
        createCollaTitle: "Create a new colla",
        createCollaButton: "Create colla",

        collesNameInvalid: "The name is not valid. It must contain valid characters and be between: ",
        collesEntityInvalid: "The entity is not valid. It must start with an uppercase letter and have characters between: ",
        collesFoundationYearInvalid: "The foundation year is not valid. It must be a number between: ",
        collesDescriptionInvalid: "The description is not valid. It must have valid characters between: ",
        collesTypeInvalid: "The type is not valid. It must be one from the list, with valid characters between: ",
        collesNeighbourhoodInvalid: "The neighbourhood is not valid. It must be one from the list, with valid characters between: ",
        collesPrimaryColourInvalid: "The primary colour is not valid. It must follow the hexadecimal format.",
        collesSecondaryColourInvalid: "The secondary colour is not valid. It must follow the hexadecimal format.",
        collesMusicInvalid: "The music is not valid. It must be one from the list, with valid characters between: ",
        collesEmailInvalid: "The email is not valid. It must follow the email format with valid characters between: ",
        collesInstagramInvalid: "The Instagram link or user is not valid. It must have valid characters between: ",

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

        // -------------------------------------------------------------------------------------------- FIGURA
        figuraName: "Name",
        figuraYear: "Year",
        figuraType: "Type",
        figuraImage: "Image",
        figuraWebUrl: "History link",

        // FIGURA TYPE
        selectFiguraType: "-- Figura type --",
        figuraTypeGegant: "Gegant",
        figuraTypeGeganto: "Gegantó",
        figuraTypeCapgros: "Capgròs",
        figuraTypeNan: "Nan",
        figuraTypeBestia: "Beast",
        figuraTypeMotxilla: "Backpack",

        // CREATE FIGURA
        figuresTitle: "Registered figures",
        createFiguraTitle: "Create a new figure",
        createFiguraButton: "Create figure",

        figuraNameInvalid: "The name is not valid. It must contain valid characters and be between: ",
        figuraYearInvalid: "The year is not valid. It must be a number between: ",
        figuraTypeInvalid: "The type is not valid. It must be one from the list, with valid characters between: ",
        figuraImageInvalid: "The image is not valid. It must be a valid file with size lower than: ",
        figuraWebUrlInvalid: "The history link is not valid. It must have valid characters between: ",

        successCreateFiguraMessage: "The figure has been created successfully",
        errorCreateFiguraMessage: "The figure could not be created. \nReason: ",
        createAnotherFiguraButton: "Create another figure",
        retryCreateFiguraButton: "Retry",

        // UPDATE FIGURA
        updateFiguraTitle: "Edit figure",
        updateFiguraButton: "Edit figure",
        goToFiguresButton: "Go back to figures",
        deleteFiguraButton: "Delete figure",
        warningDeleteFiguraMessage: "Do you want to delete the figure permanently? This action cannot be undone.",
        cancelDeleteFiguraButton: "Cancel",
        confirmDeleteFiguraButton: "Delete permanently",
        successUpdateFiguraMessage: "The figure has been edited successfully",
        errorUpdateFiguraMessage: "The figure could not be edited. \nReason: ",
        successDeleteFiguraMessage: "The figure has been deleted successfully",
        errorDeleteFiguraMessage: "The figure could not be deleted. \nReason: ",
        figuraNotFoundWithId: "Figure not found with id: ",
        errorRetrievingFiguraMessage: "Error retrieving figure information. \nReason: ",
    }
}