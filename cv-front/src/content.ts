export const lang = ["ca", "es", "en"];
export const defaultLang = "ca";

interface DictionaryEntry {
    // -------------------------------------------------------------------------------------------- GENERAL
    cercavilaTitle: string;
    errorFound: string;
    unreachablePage: string;
    retry: string;
    maxFileSize: string;
    sinceYear: string;
    coinAcronym: string;

    // -------------------------------------------------------------------------------------------- CCGM
    ccgmAcronym: string;
    ccgmName: string;

    collaFilterByName: string;
    collaFilterWriteName: string;

    collaFilterByType: string;
    collaFilterSelectType: string;

    collaFilterByNeighbourhood: string;
    collaFilterSelectNeighbourhood: string;

    collaFilterByMusic: string;
    collaFilterSelectMusic: string;

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
    collaFigures: string;

    // --- COLLA TYPE
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

    // --- COLLA NEIGHBOURHOOD
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

    // --- MUSIC TYPES
    selectMusic: string;
    musicFlabiol: string;
    musicGralla: string;
    musicBatucada: string;
    musicBand: string;
    musicGrallaBand: string;
    musicOther: string;
    musicNone: string;

    selectFigures: string;

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
    collesFiguresInvalid: string;

    successCreateCollaMessage: string;
    errorCreateCollaMessage: string;
    createAnotherCollaButton: string;
    retryCreateCollaButton: string;

    // UPDATE COLLA
    updateCollaTitle: string;
    updateCollaButton: string;
    goToCollesButton: string;
    goToCollaPageButton: string;
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

    // --- FIGURA TYPE
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
    errorRetrievingFiguresMessage: string;

    // -------------------------------------------------------------------------------------------- DIGITAL PRODUCT
    digitalProductName: string;
    digitalProductDescription: string;
    digitalProductImage: string;
    digitalProductPrimaryColour: string;
    digitalProductSecondaryColour: string;
    digitalProductPrice: string;
    digitalProductType: string;

    // --- DIGITAL PRODUCT TYPE
    selectDigitalProductType: string;
    digitalProductTypeUserImage: string;
    digitalProductTypeUserImageFrame: string;
    digitalProductTypeUserBackgroundImage: string;
    digitalProductTypeUserTitle: string;
    digitalProductTypeUserBackgroundColour: string;
    digitalProductTypeSticker: string;
    digitalProductTypePin: string;

    // CREATE DIGITAL PRODUCT
    digitalProductsTitle: string;
    createDigitalProductTitle: string;
    createDigitalProductButton: string;

    digitalProductNameInvalid: string;
    digitalProductDescriptionInvalid: string;
    digitalProductImageInvalid: string;
    digitalProductPrimaryColourInvalid: string;
    digitalProductSecondaryColourInvalid: string;
    digitalProductPriceInvalid: string;
    digitalProductTypeInvalid: string;

    successCreateDigitalProductMessage: string;
    errorCreateDigitalProductMessage: string;
    createAnotherDigitalProductButton: string;
    retryCreateDigitalProductButton: string;

    // UPDATE DIGITAL PRODUCT
    updateDigitalProductTitle: string;
    updateDigitalProductButton: string;
    goToDigitalProductsButton: string;
    deleteDigitalProductButton: string;
    warningDeleteDigitalProductMessage: string;
    cancelDeleteDigitalProductButton: string;
    confirmDeleteDigitalProductButton: string;
    successUpdateDigitalProductMessage: string;
    errorUpdateDigitalProductMessage: string;
    successDeleteDigitalProductMessage: string;
    errorDeleteDigitalProductMessage: string;
    digitalProductNotFoundWithId: string;
    errorRetrievingDigitalProductMessage: string;
    errorRetrievingDigitalProductsMessage: string;

    // -------------------------------------------------------------------------------------------- USER
    userNickname: string;
    userName: string;
    userFirstSurname: string;
    userSecondSurname: string;
    userEmail: string;
    userPassword: string;
    userRoles: string;
    userCoins: string;
    userDigitalProducts: string;
    userActiveUserImage: string;
    userActiveUserImageFrame: string;
    userActiveUserBackgroundImage: string;
    userActiveUserTitle: string;
    userActiveUserBackgroundColour: string;
    userActivePins: string;

    // --- USER COLLA ROLES
    selectUserCollaRole: string;
    userCollaRoleCap: string;
    userCollaRoleSotscap: string;
    userCollaRoleCapMusics: string;
    userCollaRolePortador: string;
    userCollaRoleMusician: string;
    userCollaRoleSupport: string;
    userCollaOuterRoleFollower: string;

    // CREATE USER
    usersTitle: string;
    createUserTitle: string;
    createUserButton: string;

    userNicknameInvalid: string;
    userNameInvalid: string;
    userFirstSurnameInvalid: string;
    userSecondSurnameInvalid: string;
    userEmailInvalid: string;
    userPasswordInvalid: string;
    userRolesInvalid: string;
    userCoinsInvalid: string;
    userDigitalProductsInvalid: string;
    userActiveUserImageInvalid: string;
    userActiveUserImageFrameInvalid: string;
    userActiveUserBackgroundImageInvalid: string;
    userActiveUserTitleInvalid: string;
    userActiveUserBackgroundColourInvalid: string;
    userActivePinsInvalid: string;

    successCreateUserMessage: string;
    errorCreateUserMessage: string;
    createAnotherUserButton: string;
    retryCreateUserButton: string;

    // UPDATE USER
    updateUserTitle: string;
    updateUserButton: string;
    goToUsersButton: string;
    deleteUserButton: string;
    warningDeleteUserMessage: string;
    cancelDeleteUserButton: string;
    confirmDeleteUserButton: string;
    successUpdateUserMessage: string;
    errorUpdateUserMessage: string;
    successDeleteUserMessage: string;
    errorDeleteUserMessage: string;
    userNotFoundWithId: string;
    errorRetrievingUserMessage: string;
    errorRetrievingUsersMessage: string;

}

export const dictionary: Record<string, DictionaryEntry> = {
    //
    //
    //         CCCCCCCCCCCCC               AAA         TTTTTTTTTTTTTTTTTTTTTTT
    //      CCC::::::::::::C              A:::A        T:::::::::::::::::::::T
    //    CC:::::::::::::::C             A:::::A       T:::::::::::::::::::::T
    //   C:::::CCCCCCCC::::C            A:::::::A      T:::::TT:::::::TT:::::T
    //  C:::::C       CCCCCC           A:::::::::A     TTTTTT  T:::::T  TTTTTT
    // C:::::C                        A:::::A:::::A            T:::::T
    // C:::::C                       A:::::A A:::::A           T:::::T
    // C:::::C                      A:::::A   A:::::A          T:::::T
    // C:::::C                     A:::::A     A:::::A         T:::::T
    // C:::::C                    A:::::AAAAAAAAA:::::A        T:::::T
    // C:::::C                   A:::::::::::::::::::::A       T:::::T
    //  C:::::C       CCCCCC    A:::::AAAAAAAAAAAAA:::::A      T:::::T
    //   C:::::CCCCCCCC::::C   A:::::A             A:::::A   TT:::::::TT
    //    CC:::::::::::::::C  A:::::A               A:::::A  T:::::::::T
    //      CCC::::::::::::C A:::::A                 A:::::A T:::::::::T
    //         CCCCCCCCCCCCCAAAAAAA                   AAAAAAATTTTTTTTTTT
    //
    //
    ca: {
        // -------------------------------------------------------------------------------------------- GENERAL
        cercavilaTitle: "Cercavila",
        errorFound: "Hi ha hagut un error",
        unreachablePage: "No s'esperava arribar aquí",
        retry: "Torna a intentar",
        maxFileSize: "Mida màxima del fitxer: ",
        sinceYear: "Des de l'any ",
        coinAcronym: "C",

        // -------------------------------------------------------------------------------------------- CCGM
        ccgmAcronym: "CCGM",
        ccgmName: "Coordinadora de Colles Geganteres de Mataró",

        collaFilterByName: "Filtra per nom",
        collaFilterWriteName: "Escriu un nom",

        collaFilterByType: "Filtra per tipus",
        collaFilterSelectType: "Selecciona un tipus",

        collaFilterByNeighbourhood: "Filtra per barri",
        collaFilterSelectNeighbourhood: "Selecciona un barri",

        collaFilterByMusic: "Filtra per acompanyament musical",
        collaFilterSelectMusic: "Selecciona un acompanyament musical",

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
        collaFigures: "Figures",

        // --- COLLA TYPE
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

        // --- COLLA NEIGHBOURHOOD
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

        // --- MUSIC TYPES
        selectMusic: "-- Acompanyament musical --",
        musicFlabiol: "Flabiol i tamborí",
        musicGralla: "Gralla i percussió",
        musicBatucada: "Batucada",
        musicBand: "Banda",
        musicGrallaBand: "Gralla i banda",
        musicOther: "Altres",
        musicNone: "Sense música",

        selectFigures: "-- Figura --",

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
        collesFiguresInvalid: "Les figures no són vàlides.",

        successCreateCollaMessage: "La colla s'ha creat amb èxit",
        errorCreateCollaMessage: "La colla no s'ha pogut crear. \nMotiu: ",
        createAnotherCollaButton: "Crear una altra colla",
        retryCreateCollaButton: "Torna a intentar",

        // UPDATE COLLA
        updateCollaTitle: "Edita la colla",
        updateCollaButton: "Edita la colla",
        goToCollesButton: "Pàgina de Colles",
        goToCollaPageButton: "Pàgina de la Colla",
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

        // --- FIGURA TYPE
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
        errorRetrievingFiguresMessage: "Error en obtenir la informació de les figures. \nMotiu:",

        // -------------------------------------------------------------------------------------------- DIGITAL PRODUCT
        digitalProductName: "Nom",
        digitalProductDescription: "Descripció",
        digitalProductImage: "Imatge",
        digitalProductPrimaryColour: "Color primari",
        digitalProductSecondaryColour: "Color secundari",
        digitalProductPrice: "Preu",
        digitalProductType: "Tipus",

        // --- DIGITAL PRODUCT TYPE
        selectDigitalProductType: "-- Tipus de producte digital --",
        digitalProductTypeUserImage: "Imatge d'usuari",
        digitalProductTypeUserImageFrame: "Marc d'imatge d'usuari",
        digitalProductTypeUserBackgroundImage: "Imatge de fons d'usuari",
        digitalProductTypeUserTitle: "Títol d'usuari",
        digitalProductTypeUserBackgroundColour: "Color de fons d'usuari",
        digitalProductTypeSticker: "Adhesiu",
        digitalProductTypePin: "Pin",

        // CREATE DIGITAL PRODUCT
        digitalProductsTitle: "Productes digitals registrats",
        createDigitalProductTitle: "Crea un nou producte digital",
        createDigitalProductButton: "Crea el producte digital",

        digitalProductNameInvalid: "El nom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        digitalProductDescriptionInvalid: "La descripció no és vàlida. Ha de tenir caràcters vàlids entre: ",
        digitalProductImageInvalid: "La imatge no és vàlida. Ha de ser un fitxer vàlid amb mida inferior a: ",
        digitalProductPrimaryColourInvalid: "El color primari no és vàlid. Ha de seguir el format hexadecimal.",
        digitalProductSecondaryColourInvalid: "El color secundari no és vàlid. Ha de seguir el format hexadecimal.",
        digitalProductPriceInvalid: "El preu no és vàlid. Ha de ser un número positiu.",
        digitalProductTypeInvalid: "El tipus no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",

        successCreateDigitalProductMessage: "El producte digital s'ha creat amb èxit",
        errorCreateDigitalProductMessage: "El producte digital no s'ha pogut crear. \nMotiu: ",
        createAnotherDigitalProductButton: "Crear un altre producte digital",
        retryCreateDigitalProductButton: "Torna a intentar",

        // UPDATE DIGITAL PRODUCT
        updateDigitalProductTitle: "Edita el producte digital",
        updateDigitalProductButton: "Edita el producte digital",
        goToDigitalProductsButton: "Torna als productes digitals",
        deleteDigitalProductButton: "Esborrar el producte digital",
        warningDeleteDigitalProductMessage: "Voleu esborrar el producte digital de manera permanent? No es pot desfer aquesta acció.",
        cancelDeleteDigitalProductButton: "Cancel·lar",
        confirmDeleteDigitalProductButton: "Esborrar permanentment",
        successUpdateDigitalProductMessage: "El producte digital s'ha editat amb èxit",
        errorUpdateDigitalProductMessage: "El producte digital no s'ha pogut editar. \nMotiu: ",
        successDeleteDigitalProductMessage: "El producte digital s'ha esborrat amb èxit",
        errorDeleteDigitalProductMessage: "El producte digital no s'ha pogut esborrar. \nMotiu: ",
        digitalProductNotFoundWithId: "Producte digital no trobat amb id: ",
        errorRetrievingDigitalProductMessage: "Error en obtenir la informació del producte digital. \nMotiu: ",
        errorRetrievingDigitalProductsMessage: "Error en obtenir la informació dels productes digitals. \nMotiu: ",

        // -------------------------------------------------------------------------------------------- USER
        userNickname: "Nom d'usuari",
        userName: "Nom",
        userFirstSurname: "Primer cognom",
        userSecondSurname: "Segon cognom",
        userEmail: "Correu electrònic",
        userPassword: "Contrasenya",
        userRoles: "Rols",
        userCoins: "Monedes",
        userDigitalProducts: "Productes digitals",
        userActiveUserImage: "Imatge de perfil",
        userActiveUserImageFrame: "Marc d'imatge de perfil",
        userActiveUserBackgroundImage: "Imatge de fons",
        userActiveUserTitle: "Títol",
        userActiveUserBackgroundColour: "Color de fons",
        userActivePins: "Pins",

        // --- USER COLLA ROLES
        selectUserCollaRole: "-- Rol de colla --",
        userCollaRoleCap: "Cap de colla",
        userCollaRoleSotscap: "Sotscap de colla",
        userCollaRoleCapMusics: "Cap de músics",
        userCollaRolePortador: "Portador/a",
        userCollaRoleMusician: "Músic/a",
        userCollaRoleSupport: "Suport",
        userCollaOuterRoleFollower: "Seguidor/a",

        // CREATE USER
        usersTitle: "Usuaris registrats",
        createUserTitle: "Crea un nou usuari",
        createUserButton: "Crea l'usuari",

        userNicknameInvalid: "El nom d'usuari no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        userNameInvalid: "El nom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        userFirstSurnameInvalid: "El primer cognom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        userSecondSurnameInvalid: "El segon cognom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        userEmailInvalid: "El correu electrònic no és vàlid. Ha de seguir el format de correu amb caràcters vàlids entre: ",
        userPasswordInvalid: "La contrasenya no és vàlida. Ha de tenir entre: ",
        userRolesInvalid: "Els rols no són vàlids. Han de ser un de la llista, amb caràcters vàlids entre: ",
        userCoinsInvalid: "Les monedes no són vàlides. Han de ser un número flotant positiu.",
        userDigitalProductsInvalid: "Els productes digitals no són vàlids",
        userActiveUserImageInvalid: "La imatge de perfil no és vàlida. Ha de ser un fitxer vàlid amb mida inferior a: ",
        userActiveUserImageFrameInvalid: "El marc d'imatge de perfil no és vàlid. Ha de ser un fitxer vàlid amb mida inferior a: ",
        userActiveUserBackgroundImageInvalid: "La imatge de fons no és vàlida. Ha de ser un fitxer vàlid amb mida inferior a: ",
        userActiveUserTitleInvalid: "El títol no és vàlid. Ha de tenir caràcters vàlids entre: ",
        userActiveUserBackgroundColourInvalid: "El color de fons no és vàlid. Ha de seguir el format hexadecimal.",
        userActivePinsInvalid: "Els pins no són vàlids.",

        successCreateUserMessage: "L'usuari s'ha creat amb èxit",
        errorCreateUserMessage: "L'usuari no s'ha pogut crear. \nMotiu: ",
        createAnotherUserButton: "Crear un altre usuari",
        retryCreateUserButton: "Torna a intentar",

        // UPDATE USER
        updateUserTitle: "Edita l'usuari",
        updateUserButton: "Edita l'usuari",
        goToUsersButton: "Torna als usuaris",
        deleteUserButton: "Esborrar l'usuari",
        warningDeleteUserMessage: "Voleu esborrar l'usuari de manera permanent? No es pot desfer aquesta acció.",
        cancelDeleteUserButton: "Cancel·lar",
        confirmDeleteUserButton: "Esborrar permanentment",
        successUpdateUserMessage: "L'usuari s'ha editat amb èxit",
        errorUpdateUserMessage: "L'usuari no s'ha pogut editar. \nMotiu: ",
        successDeleteUserMessage: "L'usuari s'ha esborrat amb èxit",
        errorDeleteUserMessage: "L'usuari no s'ha pogut esborrar. \nMotiu: ",
        userNotFoundWithId: "Usuari no trobat amb id: ",
        errorRetrievingUserMessage: "Error en obtenir la informació de l'usuari. \nMotiu: ",
        errorRetrievingUsersMessage: "Error en obtenir la informació dels usuaris. \nMotiu: "
    },
    // ------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    //
    //
    // EEEEEEEEEEEEEEEEEEEEEE   SSSSSSSSSSSSSSS PPPPPPPPPPPPPPPPP
    // E::::::::::::::::::::E SS:::::::::::::::SP::::::::::::::::P
    // E::::::::::::::::::::ES:::::SSSSSS::::::SP::::::PPPPPP:::::P
    // EE::::::EEEEEEEEE::::ES:::::S     SSSSSSSPP:::::P     P:::::P
    //   E:::::E       EEEEEES:::::S              P::::P     P:::::P
    //   E:::::E             S:::::S              P::::P     P:::::P
    //   E::::::EEEEEEEEEE    S::::SSSS           P::::PPPPPP:::::P
    //   E:::::::::::::::E     SS::::::SSSSS      P:::::::::::::PP
    //   E:::::::::::::::E       SSS::::::::SS    P::::PPPPPPPPP
    //   E::::::EEEEEEEEEE          SSSSSS::::S   P::::P
    //   E:::::E                         S:::::S  P::::P
    //   E:::::E       EEEEEE            S:::::S  P::::P
    // EE::::::EEEEEEEE:::::ESSSSSSS     S:::::SPP::::::PP
    // E::::::::::::::::::::ES::::::SSSSSS:::::SP::::::::P
    // E::::::::::::::::::::ES:::::::::::::::SS P::::::::P
    // EEEEEEEEEEEEEEEEEEEEEE SSSSSSSSSSSSSSS   PPPPPPPPPP
    //
    //
    es: {
        // -------------------------------------------------------------------------------------------- GENERAL
        cercavilaTitle: "Cercavila",
        errorFound: "Ha habido un error",
        unreachablePage: "No se esperaba llegar aquí",
        retry: "Vuelve a intentar",
        maxFileSize: "Tamaño máximo del archivo: ",
        sinceYear: "Desde el año ",
        coinAcronym: "C",

        // -------------------------------------------------------------------------------------------- CCGM
        ccgmAcronym: "CCGM",
        ccgmName: "Coordinadora de Colles Geganteres de Mataró",

        collaFilterByName: "Filtra por nombre",
        collaFilterWriteName: "Escribe un nombre",

        collaFilterByType: "Filtra por tipo",
        collaFilterSelectType: "Selecciona un tipo",

        collaFilterByNeighbourhood: "Filtra por barrio",
        collaFilterSelectNeighbourhood: "Selecciona un barrio",

        collaFilterByMusic: "Filtra por acompañamiento musical",
        collaFilterSelectMusic: "Selecciona un acompañamiento musical",

        // -------------------------------------------------------------------------------------------- COLLA
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
        collaFigures: "Figuras",

        // --- COLLA TYPE
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

        // --- COLLA NEIGHBOURHOOD
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

        // --- MUSIC TYPES
        selectMusic: "-- Acompañamiento musical --",
        musicFlabiol: "Flabiol y tamborí",
        musicGralla: "Gralla y percusión",
        musicBatucada: "Batucada",
        musicBand: "Banda",
        musicGrallaBand: "Gralla y banda",
        musicOther: "Otros",
        musicNone: "Sin música",

        selectFigures: "-- Figura --",

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
        collesFiguresInvalid: "Las figuras no son válidas.",

        successCreateCollaMessage: "La colla se ha creado con éxito",
        errorCreateCollaMessage: "La colla no se ha podido crear. \nMotivo: ",
        createAnotherCollaButton: "Crear otra colla",
        retryCreateCollaButton: "Volver a intentar",

        // UPDATE COLLA
        updateCollaTitle: "Edita la colla",
        updateCollaButton: "Edita la colla",
        goToCollesButton: "Página de Colles",
        goToCollaPageButton: "Página de la Colla",
        deleteCollaButton: "Borrar la colla",
        warningDeleteCollaMessage: "¿Quiere borrar la colla de manera permanente? No se puede deshacer esta acción.",
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

        // --- FIGURA TYPE
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
        warningDeleteFiguraMessage: "¿Quiere borrar la figura de manera permanente? No se puede deshacer esta acción.",
        cancelDeleteFiguraButton: "Cancelar",
        confirmDeleteFiguraButton: "Borrar permanentemente",
        successUpdateFiguraMessage: "La figura se ha editado con éxito",
        errorUpdateFiguraMessage: "La figura no se ha podido editar. \nMotivo: ",
        successDeleteFiguraMessage: "La figura se ha borrado con éxito",
        errorDeleteFiguraMessage: "La figura no se ha podido borrar. \nMotivo: ",
        figuraNotFoundWithId: "Figura no encontrada con id: ",
        errorRetrievingFiguraMessage: "Error al obtener la información de la figura. \nMotivo: ",
        errorRetrievingFiguresMessage: "Error al obtener la información de las figuras. \nMotivo: ",

        // -------------------------------------------------------------------------------------------- DIGITAL PRODUCT
        digitalProductName: "Nombre",
        digitalProductDescription: "Descripción",
        digitalProductImage: "Imagen",
        digitalProductPrimaryColour: "Color primario",
        digitalProductSecondaryColour: "Color secundario",
        digitalProductPrice: "Precio",
        digitalProductType: "Tipo",

        // --- DIGITAL PRODUCT TYPE
        selectDigitalProductType: "-- Tipo de producto digital --",
        digitalProductTypeUserImage: "Imagen de usuario",
        digitalProductTypeUserImageFrame: "Marco de imagen de usuario",
        digitalProductTypeUserBackgroundImage: "Imagen de fondo de usuario",
        digitalProductTypeUserTitle: "Título de usuario",
        digitalProductTypeUserBackgroundColour: "Color de fondo de usuario",
        digitalProductTypeSticker: "Adhesivo",
        digitalProductTypePin: "Pin",

        // CREATE DIGITAL PRODUCT
        digitalProductsTitle: "Productos digitales registrados",
        createDigitalProductTitle: "Crea un nuevo producto digital",
        createDigitalProductButton: "Crea el producto digital",

        digitalProductNameInvalid: "El nombre no es válido. Debe contener carácteres válidos y tener entre: ",
        digitalProductDescriptionInvalid: "La descripción no es válida. Debe tener carácteres válidos entre: ",
        digitalProductImageInvalid: "La imagen no es válida. Debe ser un archivo válido con tamaño inferior a: ",
        digitalProductPrimaryColourInvalid: "El color primario no es válido. Debe seguir el formato hexadecimal.",
        digitalProductSecondaryColourInvalid: "El color secundario no es válido. Debe seguir el formato hexadecimal.",
        digitalProductPriceInvalid: "El precio no es válido. Debe ser un número positivo.",
        digitalProductTypeInvalid: "El tipo no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",

        successCreateDigitalProductMessage: "El producto digital se ha creado con éxito",
        errorCreateDigitalProductMessage: "El producto digital no se ha podido crear. \nMotivo: ",
        createAnotherDigitalProductButton: "Crear otro producto digital",
        retryCreateDigitalProductButton: "Volver a intentar",

        // UPDATE DIGITAL PRODUCT
        updateDigitalProductTitle: "Edita el producto digital",
        updateDigitalProductButton: "Edita el producto digital",
        goToDigitalProductsButton: "Vuelve a los productos digitales",
        deleteDigitalProductButton: "Borrar el producto digital",
        warningDeleteDigitalProductMessage: "¿Quiere borrar el producto digital de manera permanente? No se puede deshacer esta acción.",
        cancelDeleteDigitalProductButton: "Cancelar",
        confirmDeleteDigitalProductButton: "Borrar permanentemente",
        successUpdateDigitalProductMessage: "El producto digital se ha editado con éxito",
        errorUpdateDigitalProductMessage: "El producto digital no se ha podido editar. \nMotivo: ",
        successDeleteDigitalProductMessage: "El producto digital se ha borrado con éxito",
        errorDeleteDigitalProductMessage: "El producto digital no se ha podido borrar. \nMotivo: ",
        digitalProductNotFoundWithId: "Producto digital no encontrado con id: ",
        errorRetrievingDigitalProductMessage: "Error al obtener la información del producto digital. \nMotivo: ",
        errorRetrievingDigitalProductsMessage: "Error al obtener la información de los productos digitales. \nMotivo: ",

        // -------------------------------------------------------------------------------------------- USER
        userNickname: "Nombre de usuario",
        userName: "Nombre",
        userFirstSurname: "Primer apellido",
        userSecondSurname: "Segundo apellido",
        userEmail: "Correo electrónico",
        userPassword: "Contraseña",
        userRoles: "Roles",
        userCoins: "Monedas",
        userDigitalProducts: "Productos digitales",
        userActiveUserImage: "Imagen de perfil",
        userActiveUserImageFrame: "Marco de imagen de perfil",
        userActiveUserBackgroundImage: "Imagen de fondo",
        userActiveUserTitle: "Título",
        userActiveUserBackgroundColour: "Color de fondo",
        userActivePins: "Pins",

        // --- USER COLLA ROLES
        selectUserCollaRole: "-- Rol de colla --",
        userCollaRoleCap: "Cap de colla",
        userCollaRoleSotscap: "Sotscap de colla",
        userCollaRoleCapMusics: "Cap de músicos",
        userCollaRolePortador: "Portador/a",
        userCollaRoleMusician: "Músico/a",
        userCollaRoleSupport: "Soporte",
        userCollaOuterRoleFollower: "Seguidor/a",

        // CREATE USER
        usersTitle: "Usuarios registrados",
        createUserTitle: "Crea un nuevo usuario",
        createUserButton: "Crea el usuario",

        userNicknameInvalid: "El nombre de usuario no es válido. Debe contener carácteres válidos y tener entre: ",
        userNameInvalid: "El nombre no es válido. Debe contener carácteres válidos y tener entre: ",
        userFirstSurnameInvalid: "El primer apellido no es válido. Debe contener carácteres válidos y tener entre: ",
        userSecondSurnameInvalid: "El segundo apellido no es válido. Debe contener carácteres válidos y tener entre: ",
        userEmailInvalid: "El correo electrónico no es válido. Debe seguir el formato de correo con carácteres válidos entre: ",
        userPasswordInvalid: "La contraseña no es válida. Debe tener entre: ",
        userRolesInvalid: "Los roles no son válidos. Deben ser uno de la lista, con carácteres válidos entre: ",
        userCoinsInvalid: "Las monedas no son válidas. Deben ser un número flotante positivo.",
        userDigitalProductsInvalid: "Los productos digitales no son válidos",
        userActiveUserImageInvalid: "La imagen de perfil no es válida. Debe ser un archivo válido con tamaño inferior a: ",
        userActiveUserImageFrameInvalid: "El marco de imagen de perfil no es válido. Debe ser un archivo válido con tamaño inferior a: ",
        userActiveUserBackgroundImageInvalid: "La imagen de fondo no es válida. Debe ser un archivo válido con tamaño inferior a: ",
        userActiveUserTitleInvalid: "El título no es válido. Debe tener carácteres válidos entre: ",
        userActiveUserBackgroundColourInvalid: "El color de fondo no es válido. Debe seguir el formato hexadecimal.",
        userActivePinsInvalid: "Los pins no son válidos.",

        successCreateUserMessage: "El usuario se ha creado con éxito",
        errorCreateUserMessage: "El usuario no se ha podido crear. \nMotivo: ",
        createAnotherUserButton: "Crear otro usuario",
        retryCreateUserButton: "Volver a intentar",

        // UPDATE USER
        updateUserTitle: "Edita el usuario",
        updateUserButton: "Edita el usuario",
        goToUsersButton: "Vuelve a los usuarios",
        deleteUserButton: "Borrar el usuario",
        warningDeleteUserMessage: "¿Quiere borrar el usuario de manera permanente? No se puede deshacer esta acción.",
        cancelDeleteUserButton: "Cancelar",
        confirmDeleteUserButton: "Borrar permanentemente",
        successUpdateUserMessage: "El usuario se ha editado con éxito",
        errorUpdateUserMessage: "El usuario no se ha podido editar. \nMotivo: ",
        successDeleteUserMessage: "El usuario se ha borrado con éxito",
        errorDeleteUserMessage: "El usuario no se ha podido borrar. \nMotivo: ",
        userNotFoundWithId: "Usuario no encontrado con id: ",
        errorRetrievingUserMessage: "Error al obtener la información del usuario. \nMotivo: ",
        errorRetrievingUsersMessage: "Error al obtener la información de los usuarios. \nMotivo: "
    },
    // ------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    //
    //
    // EEEEEEEEEEEEEEEEEEEEEENNNNNNNN        NNNNNNNN        GGGGGGGGGGGGG
    // E::::::::::::::::::::EN:::::::N       N::::::N     GGG::::::::::::G
    // E::::::::::::::::::::EN::::::::N      N::::::N   GG:::::::::::::::G
    // EE::::::EEEEEEEEE::::EN:::::::::N     N::::::N  G:::::GGGGGGGG::::G
    //   E:::::E       EEEEEEN::::::::::N    N::::::N G:::::G       GGGGGG
    //   E:::::E             N:::::::::::N   N::::::NG:::::G
    //   E::::::EEEEEEEEEE   N:::::::N::::N  N::::::NG:::::G
    //   E:::::::::::::::E   N::::::N N::::N N::::::NG:::::G    GGGGGGGGGG
    //   E:::::::::::::::E   N::::::N  N::::N:::::::NG:::::G    G::::::::G
    //   E::::::EEEEEEEEEE   N::::::N   N:::::::::::NG:::::G    GGGGG::::G
    //   E:::::E             N::::::N    N::::::::::NG:::::G        G::::G
    //   E:::::E       EEEEEEN::::::N     N:::::::::N G:::::G       G::::G
    // EE::::::EEEEEEEE:::::EN::::::N      N::::::::N  G:::::GGGGGGGG::::G
    // E::::::::::::::::::::EN::::::N       N:::::::N   GG:::::::::::::::G
    // E::::::::::::::::::::EN::::::N        N::::::N     GGG::::::GGG:::G
    // EEEEEEEEEEEEEEEEEEEEEENNNNNNNN         NNNNNNN        GGGGGG   GGGG
    //
    //
    en: {
        // -------------------------------------------------------------------------------------------- GENERAL
        cercavilaTitle: "Cercavila",
        errorFound: "An error has occurred",
        unreachablePage: "Unexpected path",
        retry: "Retry",
        maxFileSize: "Maximum file size: ",
        sinceYear: "Since year ",
        coinAcronym: "C",

        // -------------------------------------------------------------------------------------------- CCGM
        ccgmAcronym: "CCGM",
        ccgmName: "Coordinadora de Colles Geganteres de Mataró",

        collaFilterByName: "Filter by name",
        collaFilterWriteName: "Write a name",

        collaFilterByType: "Filter by type",
        collaFilterSelectType: "Select a type",

        collaFilterByNeighbourhood: "Filter by neighbourhood",
        collaFilterSelectNeighbourhood: "Select a neighbourhood",

        collaFilterByMusic: "Filter by music type",
        collaFilterSelectMusic: "Select a music type",

        // -------------------------------------------------------------------------------------------- COLLA
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
        collaFigures: "Figures",

        // --- COLLA TYPE
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

        // --- COLLA NEIGHBOURHOOD
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

        // --- MUSIC TYPES
        selectMusic: "-- Music --",
        musicFlabiol: "Flabiol and tamborí",
        musicGralla: "Gralla and percussion",
        musicBatucada: "Batucada",
        musicBand: "Band",
        musicGrallaBand: "Gralla and band",
        musicOther: "Other",
        musicNone: "No music",

        selectFigures: "-- Figure --",

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
        collesFiguresInvalid: "The figures are not valid.",

        successCreateCollaMessage: "The colla has been created successfully",
        errorCreateCollaMessage: "The colla could not be created. \nReason: ",
        createAnotherCollaButton: "Create another colla",
        retryCreateCollaButton: "Retry",

        // UPDATE COLLA
        updateCollaTitle: "Edit colla",
        updateCollaButton: "Edit colla",
        goToCollesButton: "Go to Colles page",
        goToCollaPageButton: "Go to Colla page",
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

        // --- FIGURA TYPE
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
        errorRetrievingFiguresMessage: "Error retrieving figures information. \nReason: ",

        // -------------------------------------------------------------------------------------------- DIGITAL PRODUCT
        digitalProductName: "Name",
        digitalProductDescription: "Description",
        digitalProductImage: "Image",
        digitalProductPrimaryColour: "Primary colour",
        digitalProductSecondaryColour: "Secondary colour",
        digitalProductPrice: "Price",
        digitalProductType: "Type",

        // --- DIGITAL PRODUCT TYPE
        selectDigitalProductType: "-- Digital product type --",
        digitalProductTypeUserImage: "User image",
        digitalProductTypeUserImageFrame: "User image frame",
        digitalProductTypeUserBackgroundImage: "User background image",
        digitalProductTypeUserTitle: "User title",
        digitalProductTypeUserBackgroundColour: "User background colour",
        digitalProductTypeSticker: "Sticker",
        digitalProductTypePin: "Pin",

        // CREATE DIGITAL PRODUCT
        digitalProductsTitle: "Registered digital products",
        createDigitalProductTitle: "Create a new digital product",
        createDigitalProductButton: "Create digital product",

        digitalProductNameInvalid: "The name is not valid. It must contain valid characters and be between: ",
        digitalProductDescriptionInvalid: "The description is not valid. It must have valid characters between: ",
        digitalProductImageInvalid: "The image is not valid. It must be a valid file with size lower than: ",
        digitalProductPrimaryColourInvalid: "The primary colour is not valid. It must follow the hexadecimal format.",
        digitalProductSecondaryColourInvalid: "The secondary colour is not valid. It must follow the hexadecimal format.",
        digitalProductPriceInvalid: "The price is not valid. It must be a positive number.",
        digitalProductTypeInvalid: "The type is not valid. It must be one from the list, with valid characters between: ",

        successCreateDigitalProductMessage: "The digital product has been created successfully",
        errorCreateDigitalProductMessage: "The digital product could not be created. \nReason: ",
        createAnotherDigitalProductButton: "Create another digital product",
        retryCreateDigitalProductButton: "Retry",

        // UPDATE DIGITAL PRODUCT
        updateDigitalProductTitle: "Edit digital product",
        updateDigitalProductButton: "Edit digital product",
        goToDigitalProductsButton: "Go back to digital products",
        deleteDigitalProductButton: "Delete digital product",
        warningDeleteDigitalProductMessage: "Do you want to delete the digital product permanently? This action cannot be undone.",
        cancelDeleteDigitalProductButton: "Cancel",
        confirmDeleteDigitalProductButton: "Delete permanently",
        successUpdateDigitalProductMessage: "The digital product has been edited successfully",
        errorUpdateDigitalProductMessage: "The digital product could not be edited. \nReason: ",
        successDeleteDigitalProductMessage: "The digital product has been deleted successfully",
        errorDeleteDigitalProductMessage: "The digital product could not be deleted. \nReason: ",
        digitalProductNotFoundWithId: "Digital product not found with id: ",
        errorRetrievingDigitalProductMessage: "Error retrieving digital product information. \nReason: ",
        errorRetrievingDigitalProductsMessage: "Error retrieving digital products information. \nReason: ",

        // -------------------------------------------------------------------------------------------- USER
        userNickname: "Nickname",
        userName: "Name",
        userFirstSurname: "First surname",
        userSecondSurname: "Second surname",
        userEmail: "Email",
        userPassword: "Password",
        userRoles: "Roles",
        userCoins: "Coins",
        userDigitalProducts: "Digital products",
        userActiveUserImage: "Profile image",
        userActiveUserImageFrame: "Profile image frame",
        userActiveUserBackgroundImage: "Background image",
        userActiveUserTitle: "Title",
        userActiveUserBackgroundColour: "Background colour",
        userActivePins: "Pins",

        // --- USER COLLA ROLES
        selectUserCollaRole: "-- Colla role --",
        userCollaRoleCap: "Colla captain",
        userCollaRoleSotscap: "Colla vice-captain",
        userCollaRoleCapMusics: "Music captain",
        userCollaRolePortador: "Carrier",
        userCollaRoleMusician: "Musician",
        userCollaRoleSupport: "Support",
        userCollaOuterRoleFollower: "Follower",

        // CREATE USER
        usersTitle: "Registered users",
        createUserTitle: "Create a new user",
        createUserButton: "Create user",

        userNicknameInvalid: "The nickname is not valid. It must contain valid characters and be between: ",
        userNameInvalid: "The name is not valid. It must contain valid characters and be between: ",
        userFirstSurnameInvalid: "The first surname is not valid. It must contain valid characters and be between: ",
        userSecondSurnameInvalid: "The second surname is not valid. It must contain valid characters and be between: ",
        userEmailInvalid: "The email is not valid. It must follow the email format with valid characters between: ",
        userPasswordInvalid: "The password is not valid. It must be between: ",
        userRolesInvalid: "The roles are not valid. They must be one from the list, with valid characters between: ",
        userCoinsInvalid: "The coins are not valid. They must be a positive float number.",
        userDigitalProductsInvalid: "The digital products are not valid",
        userActiveUserImageInvalid: "The profile image is not valid. It must be a valid file with size lower than: ",
        userActiveUserImageFrameInvalid: "The profile image frame is not valid. It must be a valid file with size lower than: ",
        userActiveUserBackgroundImageInvalid: "The background image is not valid. It must be a valid file with size lower than: ",
        userActiveUserTitleInvalid: "The title is not valid. It must have valid characters between: ",
        userActiveUserBackgroundColourInvalid: "The background colour is not valid. It must follow the hexadecimal format.",
        userActivePinsInvalid: "The pins are not valid.",

        successCreateUserMessage: "The user has been created successfully",
        errorCreateUserMessage: "The user could not be created. \nReason: ",
        createAnotherUserButton: "Create another user",
        retryCreateUserButton: "Retry",

        // UPDATE USER
        updateUserTitle: "Edit user",
        updateUserButton: "Edit user",
        goToUsersButton: "Go back to users",
        deleteUserButton: "Delete user",
        warningDeleteUserMessage: "Do you want to delete the user permanently? This action cannot be undone.",
        cancelDeleteUserButton: "Cancel",
        confirmDeleteUserButton: "Delete permanently",
        successUpdateUserMessage: "The user has been edited successfully",
        errorUpdateUserMessage: "The user could not be edited. \nReason: ",
        successDeleteUserMessage: "The user has been deleted successfully",
        errorDeleteUserMessage: "The user could not be deleted. \nReason: ",
        userNotFoundWithId: "User not found with id: ",
        errorRetrievingUserMessage: "Error retrieving user information. \nReason: ",
        errorRetrievingUsersMessage: "Error retrieving users information. \nReason: "
    }
}