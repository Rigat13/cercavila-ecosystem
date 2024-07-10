export const lang = ["ca", "es", "en"];
export const defaultLang = "ca";

interface DictionaryEntry {
    // -------------------------------------------------------------------------------------------- GENERAL
    cercavilaTitle: string;
    cercavilaTagline: string;
    cercavilaWelcome: string;
    errorFound: string;
    unreachablePage: string;
    retry: string;
    maxFileSize: string;
    sinceYear: string;
    coinAcronym: string;

    loading: string;
    successUpdate: string;
    errorUpdate: string;

    start: string;
    end: string;
    days: string;
    hours: string;
    remain: string;

    // -------------------------------------------------------------------------------------------- LOGIN
    loginTitle: string;
    loginButton: string;
    loginError: string;
    registerTitle: string;
    registerButton: string;
    registerError: string;
    logoutButton: string;
    incorrectPasswordError: string;
    userNotFoundError: string;

    // -------------------------------------------------------------------------------------------- CCGM
    ccgmAcronym: string;
    ccgmName: string;

    // -------------------------------------------------------------------------------------------- FILTERS

    collaFilterByName: string;
    collaFilterWriteName: string;

    collaFilterByType: string;
    collaFilterSelectType: string;

    collaFilterByNeighbourhood: string;
    collaFilterSelectNeighbourhood: string;

    collaFilterByMusic: string;
    collaFilterSelectMusic: string;

    userFilterByRole: string;
    userFilterSelectRole: string;

    userFilterByColla: string;
    userFilterSelectColla: string;

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

    digitalProductEventExclusive: string;

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
    storeTitle: string;
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

    // -------------------------------------------------------------------------------------------- DIGITAL PRODUCT STORE

    digitalProductStoreBuyButton: string;
    digitalProductConfirmBuyTitle: string;
    digitalProductConfirmBuyMessage: string;
    digitalProductProductPrice: string;
    digitalProductInsufficientCoins: string;
    digitalProductCancelBuyButton: string;
    digitalProductSuccessBuyMessage: string;

    // -------------------------------------------------------------------------------------------- USER
    userNickname: string;
    userName: string;
    userFirstSurname: string;
    userSecondSurname: string;
    userEmail: string;
    userPassword: string;
    userRoles: string;
    userRoles_Role: string;
    userRoles_Colla: string;
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
    selectUserColla: string;
    userCollaRoleCap: string;
    userCollaRoleSotscap: string;
    userCollaRoleCapMusics: string;
    userCollaRolePortador: string;
    userCollaRoleMusician: string;
    userCollaRoleSupport: string;
    userCollaOuterRoleFollower: string;
    userCCGMPresident: string;
    userCCGMSecretary: string;
    userCCGMTreasurer: string;
    userCCGMBoardMember: string;

    // --- USER DIGITAL PRODUCTS
    selectUserDigitalProduct: string;
    // --- USER ACTIVE USER IMAGE
    selectUserActiveUserImage: string;
    // --- USER ACTIVE USER IMAGE FRAME
    selectUserActiveUserImageFrame: string;
    // --- USER ACTIVE USER BACKGROUND IMAGE
    selectUserActiveUserBackgroundImage: string;
    // --- USER ACTIVE USER TITLE
    selectUserActiveUserTitle: string;
    // --- USER ACTIVE USER BACKGROUND COLOUR
    selectUserActiveUserBackgroundColour: string;
    // --- USER ACTIVE PINS
    selectUserActivePins: string;
    selectUserActivePin: string;

    // CREATE USER
    usersTitle: string;
    createUserTitle: string;
    createUserButton: string;

    userNicknameInvalid: string;
    userNicknameNotUnique: string;
    userNameInvalid: string;
    userFirstSurnameInvalid: string;
    userSecondSurnameInvalid: string;
    userEmailInvalid: string;
    userEmailNotUnique: string;
    userPasswordInvalid: string;
    userPasswordWeak: string;
    userPasswordMedium: string;
    userPasswordStrong: string;
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
    goToUserPageButton: string;
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

    // -------------------------------------------------------------------------------------------- ACTIVITY

    activityQuestion: string;
    activityType: string;
    activityImage: string;
    activityCorrectAnswer: string;
    activityFirstIncorrectAnswer: string;
    activitySecondIncorrectAnswer: string;

    // --- ACTIVITY TYPE
    selectActivityType: string;
    activityTypeCercatrivia: string;
    activityTypeGeganquesta: string;

    // CREATE ACTIVITY
    activitiesTitle: string;
    createActivityTitle: string;
    createActivityButton: string;

    activityQuestionInvalid: string;
    activityTypeInvalid: string;
    activityImageInvalid: string;
    activityCorrectAnswerInvalid: string;
    activityFirstIncorrectAnswerInvalid: string;
    activitySecondIncorrectAnswerInvalid: string;

    successCreateActivityMessage: string;
    errorCreateActivityMessage: string;
    createAnotherActivityButton: string;
    retryCreateActivityButton: string;

    // UPDATE ACTIVITY
    updateActivityTitle: string;
    updateActivityButton: string;
    goToActivitiesButton: string;
    deleteActivityButton: string;
    warningDeleteActivityMessage: string;
    cancelDeleteActivityButton: string;
    confirmDeleteActivityButton: string;
    successUpdateActivityMessage: string;
    errorUpdateActivityMessage: string;
    successDeleteActivityMessage: string;
    errorDeleteActivityMessage: string;
    activityNotFoundWithId: string;
    errorRetrievingActivityMessage: string;
    errorRetrievingActivitiesMessage: string;

    // ANSWER ACTIVITY
    activityCorrect: string;
    activityIncorrect: string;
    activityThanks: string;

    // -------------------------------------------------------------------------------------------- EVENT
    eventName: string;
    eventDescription: string;
    eventImage: string;
    eventPrimaryColour: string;
    eventSecondaryColour: string;
    eventType: string;
    eventStartDate: string;
    eventEndDate: string;
    eventCercatrivies: string;
    eventFirstCoinsReward: string;
    eventFirstDigitalProductsReward: string;
    eventSecondCoinsReward: string;
    eventSecondDigitalProductsReward: string;
    eventThirdCoinsReward: string;
    eventThirdDigitalProductsReward: string;
    eventFourthTenthCoinsReward: string;
    eventFourthTenthDigitalProductsReward: string;
    eventAllCoinsReward: string;
    eventAllDigitalProductsReward: string;

    // --- EVENT TYPE
    selectEventType: string;
    eventTypeCercampionatMensual: string;
    eventTypeCercampionatAnual: string;
    eventTypeCelebracio: string;
    eventTypeCompensacio: string;

    selectEventCercatrivies: string;
    selectEventFirstDigitalProductsReward: string;
    selectEventSecondDigitalProductsReward: string;
    selectEventThirdDigitalProductsReward: string;
    selectEventFourthTenthDigitalProductsReward: string;
    selectEventAllDigitalProductsReward: string;

    // CREATE EVENT
    eventsTitle: string;
    createEventTitle: string;
    createEventButton: string;

    eventNameInvalid: string;
    eventDescriptionInvalid: string;
    eventImageInvalid: string;
    eventPrimaryColourInvalid: string;
    eventSecondaryColourInvalid: string;
    eventTypeInvalid: string;
    eventStartDateInvalid: string;
    eventEndDateInvalid: string;
    eventCercatriviesInvalid: string;
    eventFirstCoinsRewardInvalid: string;
    eventFirstDigitalProductsRewardInvalid: string;
    eventSecondCoinsRewardInvalid: string;
    eventSecondDigitalProductsRewardInvalid: string;
    eventThirdCoinsRewardInvalid: string;
    eventThirdDigitalProductsRewardInvalid: string;
    eventFourthTenthCoinsRewardInvalid: string;
    eventFourthTenthDigitalProductsRewardInvalid: string;
    eventAllCoinsRewardInvalid: string;
    eventAllDigitalProductsRewardInvalid: string;

    successCreateEventMessage: string;
    errorCreateEventMessage: string;
    createAnotherEventButton: string;
    retryCreateEventButton: string;

    // UPDATE EVENT
    updateEventTitle: string;
    updateEventButton: string;
    goToEventsButton: string;
    deleteEventButton: string;
    warningDeleteEventMessage: string;
    cancelDeleteEventButton: string;
    confirmDeleteEventButton: string;
    successUpdateEventMessage: string;
    errorUpdateEventMessage: string;
    successDeleteEventMessage: string;
    errorDeleteEventMessage: string;
    eventNotFoundWithId: string;
    errorRetrievingEventMessage: string;
    errorRetrievingEventsMessage: string;

    // CHAMPIONSHIP PLACES
    firstPlace: string;
    secondPlace: string;
    thirdPlace: string;
    fourthToTenthPlace: string;
    allParticipants: string;

    // --------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------- IMANTS
    downloadImageButton: string;

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
        cercavilaTagline: "La plataforma de les colles geganteres de Mataró",
        cercavilaWelcome: "Heu arribat a Cercavila, ",
        errorFound: "Hi ha hagut un error",
        unreachablePage: "No s'esperava arribar aquí",
        retry: "Torna a intentar",
        maxFileSize: "Mida màxima del fitxer: ",
        sinceYear: "Des de l'any ",
        coinAcronym: "C",

        loading: "Carregant...",
        successUpdate: "Actualització feta!",
        errorUpdate: "Error en l'actualització :(",

        start: "Inici",
        end: "Fi",
        days: "dies",
        hours: "h",
        remain: "Queden",

        // -------------------------------------------------------------------------------------------- LOGIN
        loginTitle: "És hora d'entrar a Cercavila!",
        loginButton: "Inicia sessió",
        loginError: "Error en iniciar sessió",
        registerTitle: "Registra't",
        registerButton: "Registra't",
        registerError: "Error en registrar-se",
        logoutButton: "Tanca sessió",
        incorrectPasswordError: "Contrasenya incorrecta",
        userNotFoundError: "No s'ha trobat cap usuari/a amb aquest nom",

        // -------------------------------------------------------------------------------------------- CCGM
        ccgmAcronym: "CCGM",
        ccgmName: "Coordinadora de Colles Geganteres de Mataró",

        // -------------------------------------------------------------------------------------------- FILTERS

        collaFilterByName: "Filtra per nom",
        collaFilterWriteName: "Escriu un nom",

        collaFilterByType: "Filtra per tipus",
        collaFilterSelectType: "Selecciona un tipus",

        collaFilterByNeighbourhood: "Filtra per barri",
        collaFilterSelectNeighbourhood: "Selecciona un barri",

        collaFilterByMusic: "Filtra per acompanyament musical",
        collaFilterSelectMusic: "Selecciona un acompanyament musical",

        userFilterByRole: "Filtra per rol",
        userFilterSelectRole: "Selecciona un rol",

        userFilterByColla: "Filtra per colla",
        userFilterSelectColla: "Selecciona una colla",

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
        collesTitle: "Colles",
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

        digitalProductEventExclusive: "Exclusiu d'esdeveniment",

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
        storeTitle: "Botiga",
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

        // -------------------------------------------------------------------------------------------- DIGITAL PRODUCT STORE

        digitalProductStoreBuyButton: "Comprar",
        digitalProductConfirmBuyTitle: "Confirmar compra",
        digitalProductConfirmBuyMessage: "Voleu comprar l'article {product}?",
        digitalProductProductPrice: "El preu és de {price} monedes.",
        digitalProductInsufficientCoins: "Us falten {remaining} monedes per poder comprar l'article. No passa res, aviat les podreu aconseguir!",
        digitalProductCancelBuyButton: "Cancel·lar",
        digitalProductSuccessBuyMessage: "Fet! Ja ho tens!",

        // -------------------------------------------------------------------------------------------- USER
        userNickname: "Nom d'usuari",
        userName: "Nom",
        userFirstSurname: "Primer cognom",
        userSecondSurname: "Segon cognom",
        userEmail: "Correu electrònic",
        userPassword: "Contrasenya",
        userRoles: "Rols",
        userRoles_Role: "Rol",
        userRoles_Colla: "Colla",
        userCoins: "Monedes",
        userDigitalProducts: "Productes digitals",
        userActiveUserImage: "Imatge de perfil",
        userActiveUserImageFrame: "Marc d'imatge de perfil",
        userActiveUserBackgroundImage: "Imatge de fons",
        userActiveUserTitle: "Títol",
        userActiveUserBackgroundColour: "Color de fons",
        userActivePins: "Pins",

        // --- USER COLLA ROLES
        selectUserCollaRole: "-- Rol --",
        selectUserColla: "-- Colla --",
        userCollaRoleCap: "Cap de colla",
        userCollaRoleSotscap: "Sotscap de colla",
        userCollaRoleCapMusics: "Cap de músics",
        userCollaRolePortador: "Portador/a",
        userCollaRoleMusician: "Músic/a",
        userCollaRoleSupport: "Suport",
        userCollaOuterRoleFollower: "Seguidor/a",
        userCCGMPresident: "President/a",
        userCCGMSecretary: "Secretari/a",
        userCCGMTreasurer: "Tresorer/a",
        userCCGMBoardMember: "Vocal",

        // --- USER DIGITAL PRODUCTS
        selectUserDigitalProduct: "-- Producte digital --",
        // --- USER ACTIVE USER IMAGE
        selectUserActiveUserImage: "-- Imatge d'usuari --",
        // --- USER ACTIVE USER IMAGE FRAME
        selectUserActiveUserImageFrame: "-- Marc d'imatge d'usuari --",
        // --- USER ACTIVE USER BACKGROUND IMAGE
        selectUserActiveUserBackgroundImage: "-- Imatge de fons d'usuari --",
        // --- USER ACTIVE USER TITLE
        selectUserActiveUserTitle: "-- Títol d'usuari --",
        // --- USER ACTIVE USER BACKGROUND COLOUR
        selectUserActiveUserBackgroundColour: "-- Color de fons d'usuari --",
        // --- USER ACTIVE PINS
        selectUserActivePins: "-- Pins --",
        selectUserActivePin: "Seleccioneu el pin a col·locar:",

        // CREATE USER
        usersTitle: "Usuaris",
        createUserTitle: "Crea un nou usuari",
        createUserButton: "Crea l'usuari",

        userNicknameInvalid: "El nom d'usuari no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        userNicknameNotUnique: "El nom d'usuari ja existeix. Si us plau, provi amb un altre.",
        userNameInvalid: "El nom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        userFirstSurnameInvalid: "El primer cognom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        userSecondSurnameInvalid: "El segon cognom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        userEmailInvalid: "El correu electrònic no és vàlid. Ha de seguir el format de correu amb caràcters vàlids entre: ",
        userEmailNotUnique: "El correu electrònic ja existeix. Si us plau, provi amb un altre.",
        userPasswordInvalid: "La contrasenya no és vàlida. Ha de tenir caràcters vàlids entre: ",
        userPasswordWeak: "La contrasenya és massa feble. Ha de contenir prou caràcters vàlids amb lletres i números",
        userPasswordMedium: 'La contrasenya és prou segura. Però si hi afegiu caràcters especials, serà encara més segura!',
        userPasswordStrong: 'Genial, la contrasenya és molt segura!',
        userRolesInvalid: "Els rols no són vàlids. Han de ser un de la llista.",
        userCoinsInvalid: "Les monedes no són vàlides. Han de ser un número flotant positiu.",
        userDigitalProductsInvalid: "Els productes digitals no són vàlids",
        userActiveUserImageInvalid: "La imatge de perfil no és vàlida. Ha de ser un fitxer vàlid amb mida inferior a: ",
        userActiveUserImageFrameInvalid: "El marc d'imatge de perfil no és vàlid. Ha de ser un fitxer vàlid amb mida inferior a: ",
        userActiveUserBackgroundImageInvalid: "La imatge de fons no és vàlida. Ha de ser un fitxer vàlid amb mida inferior a: ",
        userActiveUserTitleInvalid: "El títol no és vàlid. Ha de tenir caràcters vàlids entre: ",
        userActiveUserBackgroundColourInvalid: "El color de fons no és vàlid. Ha de seguir el format hexadecimal.",
        userActivePinsInvalid: "Els pins no són vàlids.",

        successCreateUserMessage: "L'usuari s'ha creat amb èxit",
        errorCreateUserMessage: "Ho sentim, no s'ha pogut crear l'usuari.",
        createAnotherUserButton: "Crear un altre usuari",
        retryCreateUserButton: "Torna a intentar",

        // UPDATE USER
        updateUserTitle: "Edita l'usuari",
        updateUserButton: "Edita l'usuari",
        goToUsersButton: "Torna als usuaris",
        goToUserPageButton: "Pàgina de l'Usuari",
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
        errorRetrievingUsersMessage: "Error en obtenir la informació dels usuaris. \nMotiu: ",

        // -------------------------------------------------------------------------------------------- ACTIVITY

        activityQuestion: "Pregunta",
        activityType: "Tipus",
        activityImage: "Imatge",
        activityCorrectAnswer: "Resposta correcta",
        activityFirstIncorrectAnswer: "Primera resposta incorrecta",
        activitySecondIncorrectAnswer: "Segona resposta incorrecta",

        // --- ACTIVITY TYPE
        selectActivityType: "-- Tipus d'activitat --",
        activityTypeCercatrivia: "Cercatrivia",
        activityTypeGeganquesta: "Geganquesta",

        // CREATE ACTIVITY
        activitiesTitle: "Activitats registrades",
        createActivityTitle: "Crea una nova activitat",
        createActivityButton: "Crea l'activitat",

        activityQuestionInvalid: "La pregunta no és vàlida. Ha de tenir caràcters vàlids entre: ",
        activityTypeInvalid: "El tipus no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",
        activityImageInvalid: "La imatge no és vàlida. Ha de ser un fitxer vàlid amb mida inferior a: ",
        activityCorrectAnswerInvalid: "La resposta correcta no és vàlida. Ha de tenir caràcters vàlids entre: ",
        activityFirstIncorrectAnswerInvalid: "La primera resposta incorrecta no és vàlida. Ha de tenir caràcters vàlids entre: ",
        activitySecondIncorrectAnswerInvalid: "La segona resposta incorrecta no és vàlida. Ha de tenir caràcters vàlids entre: ",

        successCreateActivityMessage: "L'activitat s'ha creat amb èxit",
        errorCreateActivityMessage: "L'activitat no s'ha pogut crear. \nMotiu: ",
        createAnotherActivityButton: "Crear una altra activitat",
        retryCreateActivityButton: "Torna a intentar",

        // UPDATE ACTIVITY
        updateActivityTitle: "Edita l'activitat",
        updateActivityButton: "Edita l'activitat",
        goToActivitiesButton: "Torna a les activitats",
        deleteActivityButton: "Esborrar l'activitat",
        warningDeleteActivityMessage: "Voleu esborrar l'activitat de manera permanent? No es pot desfer aquesta acció.",
        cancelDeleteActivityButton: "Cancel·lar",
        confirmDeleteActivityButton: "Esborrar permanentment",
        successUpdateActivityMessage: "L'activitat s'ha editat amb èxit",
        errorUpdateActivityMessage: "L'activitat no s'ha pogut editar. \nMotiu: ",
        successDeleteActivityMessage: "L'activitat s'ha esborrat amb èxit",
        errorDeleteActivityMessage: "L'activitat no s'ha pogut esborrar. \nMotiu: ",
        activityNotFoundWithId: "Activitat no trobada amb id: ",
        errorRetrievingActivityMessage: "Error en obtenir la informació de l'activitat. \nMotiu: ",
        errorRetrievingActivitiesMessage: "Error en obtenir la informació de les activitats. \nMotiu: ",

        // ANSWER ACTIVITY
        activityCorrect: "Correcta!",
        activityIncorrect: "Llàstima :(",
        activityThanks: "Gràcies!",

        // -------------------------------------------------------------------------------------------- EVENT
        eventName: "Nom",
        eventDescription: "Descripció",
        eventImage: "Imatge",
        eventPrimaryColour: "Color primari",
        eventSecondaryColour: "Color secundari",
        eventType: "Tipus",
        eventStartDate: "Data d'inici",
        eventEndDate: "Data de finalització",
        eventCercatrivies: "Cercatrivies",
        eventFirstCoinsReward: "1r lloc - Premi en monedes",
        eventFirstDigitalProductsReward: "1r lloc - Premi en productes digitals",
        eventSecondCoinsReward: "2n lloc - Premi en monedes",
        eventSecondDigitalProductsReward: "2n lloc - Premi en productes digitals",
        eventThirdCoinsReward: "3r lloc - Premi en monedes",
        eventThirdDigitalProductsReward: "3r lloc - Premi en productes digitals",
        eventFourthTenthCoinsReward: "4t-10è lloc - Premi en monedes",
        eventFourthTenthDigitalProductsReward: "4t-10è lloc - Premi en productes digitals",
        eventAllCoinsReward: "Tots els participants - Premi en monedes",
        eventAllDigitalProductsReward: "Tots els participants - Premi en productes digitals",

        // --- EVENT TYPE
        selectEventType: "-- Tipus d'esdeveniment --",
        eventTypeCercampionatMensual: "Cercampionat mensual",
        eventTypeCercampionatAnual: "Cercampionat anual",
        eventTypeCelebracio: "Celebració",
        eventTypeCompensacio: "Compensació",

        selectEventCercatrivies: "-- Cercatrivies --",
        selectEventFirstDigitalProductsReward: "-- 1r lloc - Productes digitals de premi --",
        selectEventSecondDigitalProductsReward: "-- 2n lloc - Productes digitals de premi --",
        selectEventThirdDigitalProductsReward: "-- 3r lloc - Productes digitals de premi --",
        selectEventFourthTenthDigitalProductsReward: "-- 4t-10è lloc - Productes digitals de premi --",
        selectEventAllDigitalProductsReward: "-- Participants - Productes digitals de premi --",

        // CREATE EVENT
        eventsTitle: "Esdeveniments",
        createEventTitle: "Crea un nou esdeveniment",
        createEventButton: "Crea l'esdeveniment",

        eventNameInvalid: "El nom no és vàlid. Ha de contenir caràcters vàlids i tenir entre: ",
        eventDescriptionInvalid: "La descripció no és vàlida. Ha de tenir caràcters vàlids entre: ",
        eventImageInvalid: "La imatge no és vàlida. Ha de ser un fitxer vàlid amb mida inferior a: ",
        eventPrimaryColourInvalid: "El color primari no és vàlid. Ha de seguir el format hexadecimal.",
        eventSecondaryColourInvalid: "El color secundari no és vàlid. Ha de seguir el format hexadecimal.",
        eventTypeInvalid: "El tipus no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",
        eventStartDateInvalid: "La data d'inici no és vàlida. Ha de ser una data vàlida.",
        eventEndDateInvalid: "La data de finalització no és vàlida. Ha de ser una data vàlida i posterior a la data d'inici.",
        eventCercatriviesInvalid: "Les Cercatrivies no són vàlides.",
        eventFirstCoinsRewardInvalid: "El premi en monedes del 1r lloc no és vàlid. Ha de ser un número positiu.",
        eventFirstDigitalProductsRewardInvalid: "El premi en productes digitals del 1r lloc no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",
        eventSecondCoinsRewardInvalid: "El premi en monedes del 2n lloc no és vàlid. Ha de ser un número positiu.",
        eventSecondDigitalProductsRewardInvalid: "El premi en productes digitals del 2n lloc no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",
        eventThirdCoinsRewardInvalid: "El premi en monedes del 3r lloc no és vàlid. Ha de ser un número positiu.",
        eventThirdDigitalProductsRewardInvalid: "El premi en productes digitals del 3r lloc no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",
        eventFourthTenthCoinsRewardInvalid: "El premi en monedes del 4t-10è lloc no és vàlid. Ha de ser un número positiu.",
        eventFourthTenthDigitalProductsRewardInvalid: "El premi en productes digitals del 4t-10è lloc no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",
        eventAllCoinsRewardInvalid: "El premi en monedes de tots els participants no és vàlid. Ha de ser un número positiu.",
        eventAllDigitalProductsRewardInvalid: "El premi en productes digitals de tots els participants no és vàlid. Ha de ser un de la llista, amb caràcters vàlids entre: ",

        successCreateEventMessage: "L'esdeveniment s'ha creat amb èxit",
        errorCreateEventMessage: "L'esdeveniment no s'ha pogut crear. \nMotiu: ",
        createAnotherEventButton: "Crear un altre esdeveniment",
        retryCreateEventButton: "Torna a intentar",

        // UPDATE EVENT
        updateEventTitle: "Edita l'esdeveniment",
        updateEventButton: "Edita l'esdeveniment",
        goToEventsButton: "Torna als esdeveniments",
        deleteEventButton: "Esborrar l'esdeveniment",
        warningDeleteEventMessage: "Voleu esborrar l'esdeveniment de manera permanent? No es pot desfer aquesta acció.",
        cancelDeleteEventButton: "Cancel·lar",
        confirmDeleteEventButton: "Esborrar permanentment",
        successUpdateEventMessage: "L'esdeveniment s'ha editat amb èxit",
        errorUpdateEventMessage: "L'esdeveniment no s'ha pogut editar. \nMotiu: ",
        successDeleteEventMessage: "L'esdeveniment s'ha esborrat amb èxit",
        errorDeleteEventMessage: "L'esdeveniment no s'ha pogut esborrar. \nMotiu: ",
        eventNotFoundWithId: "Esdeveniment no trobat amb id: ",
        errorRetrievingEventMessage: "Error en obtenir la informació de l'esdeveniment. \nMotiu: ",
        errorRetrievingEventsMessage: "Error en obtenir la informació dels esdeveniments. \nMotiu: ",

        // CHAMPIONSHIP PLACES
        firstPlace: "1r lloc",
        secondPlace: "2n lloc",
        thirdPlace: "3r lloc",
        fourthToTenthPlace: "4t-10è lloc",
        allParticipants: "Participants",

        // --------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------------- IMANTS
        downloadImageButton: "Descarregar"
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
        cercavilaTagline: "La plataforma de las collas de gigantes de Mataró",
        cercavilaWelcome: "Ha llegado a Cercavila, ",
        errorFound: "Ha habido un error",
        unreachablePage: "No se esperaba llegar aquí",
        retry: "Vuelve a intentar",
        maxFileSize: "Tamaño máximo del archivo: ",
        sinceYear: "Desde el año ",
        coinAcronym: "C",

        loading: "Cargando...",
        successUpdate: "Actualización hecha!",
        errorUpdate: "Error en la actualización :(",

        start: "Inicio",
        end: "Fin",
        days: "días",
        hours: "h",
        remain: "m",

        // -------------------------------------------------------------------------------------------- LOGIN
        loginTitle: "Es hora de entrar en Cercavila!",
        loginButton: "Inicia sesión",
        loginError: "Error en iniciar sesión",
        registerTitle: "Regístrate",
        registerButton: "Regístrate",
        registerError: "Error en registrarse",
        logoutButton: "Cierra sesión",
        incorrectPasswordError: "Contraseña incorrecta",
        userNotFoundError: "No se ha encontrado al usuario/a con este nombre",

        // -------------------------------------------------------------------------------------------- CCGM
        ccgmAcronym: "CCGM",
        ccgmName: "Coordinadora de Colles Geganteres de Mataró",

        // -------------------------------------------------------------------------------------------- FILTERS

        collaFilterByName: "Filtra por nombre",
        collaFilterWriteName: "Escribe un nombre",

        collaFilterByType: "Filtra por tipo",
        collaFilterSelectType: "Selecciona un tipo",

        collaFilterByNeighbourhood: "Filtra por barrio",
        collaFilterSelectNeighbourhood: "Selecciona un barrio",

        collaFilterByMusic: "Filtra por acompañamiento musical",
        collaFilterSelectMusic: "Selecciona un acompañamiento musical",

        userFilterByRole: "Filtra por rol",
        userFilterSelectRole: "Selecciona un rol",

        userFilterByColla: "Filtra por colla",
        userFilterSelectColla: "Selecciona una colla",

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
        collesTitle: "Collas",
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

        digitalProductEventExclusive: "Exclusivo de evento",

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
        storeTitle: "Tienda",
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

        // -------------------------------------------------------------------------------------------- DIGITAL PRODUCT STORE

        digitalProductStoreBuyButton: "Comprar",
        digitalProductConfirmBuyTitle: "Confirmar compra",
        digitalProductConfirmBuyMessage: "¿Quiere comprar el artículo {product}?",
        digitalProductProductPrice: "El precio es de {price} monedas.",
        digitalProductInsufficientCoins: "Le faltan {remaining} monedas para poder comprar el artículo. ¡No pasa nada, pronto las podrá conseguir!",
        digitalProductCancelBuyButton: "Cancelar",
        digitalProductSuccessBuyMessage: "¡Hecho! ¡Ya lo tienes!",

        // -------------------------------------------------------------------------------------------- USER
        userNickname: "Nombre de usuario",
        userName: "Nombre",
        userFirstSurname: "Primer apellido",
        userSecondSurname: "Segundo apellido",
        userEmail: "Correo electrónico",
        userPassword: "Contraseña",
        userRoles: "Roles",
        userRoles_Role: "Rol",
        userRoles_Colla: "Colla",
        userCoins: "Monedas",
        userDigitalProducts: "Productos digitales",
        userActiveUserImage: "Imagen de perfil",
        userActiveUserImageFrame: "Marco de imagen de perfil",
        userActiveUserBackgroundImage: "Imagen de fondo",
        userActiveUserTitle: "Título",
        userActiveUserBackgroundColour: "Color de fondo",
        userActivePins: "Pins",

        // --- USER COLLA ROLES
        selectUserCollaRole: "-- Rol --",
        selectUserColla: "-- Colla --",
        userCollaRoleCap: "Cap de colla",
        userCollaRoleSotscap: "Sotscap de colla",
        userCollaRoleCapMusics: "Cap de músicos",
        userCollaRolePortador: "Portador/a",
        userCollaRoleMusician: "Músico/a",
        userCollaRoleSupport: "Soporte",
        userCollaOuterRoleFollower: "Seguidor/a",
        userCCGMPresident: "Presidente/a",
        userCCGMSecretary: "Secretario/a",
        userCCGMTreasurer: "Tesorero/a",
        userCCGMBoardMember: "Vocal",

        // --- USER DIGITAL PRODUCTS
        selectUserDigitalProduct: "-- Producto digital --",
        // --- USER ACTIVE USER IMAGE
        selectUserActiveUserImage: "-- Imagen de usuario --",
        // --- USER ACTIVE USER IMAGE FRAME
        selectUserActiveUserImageFrame: "-- Marco de imagen de usuario --",
        // --- USER ACTIVE USER BACKGROUND IMAGE
        selectUserActiveUserBackgroundImage: "-- Imagen de fondo de usuario --",
        // --- USER ACTIVE USER TITLE
        selectUserActiveUserTitle: "-- Título de usuario --",
        // --- USER ACTIVE USER BACKGROUND COLOUR
        selectUserActiveUserBackgroundColour: "-- Color de fondo de usuario --",
        // --- USER ACTIVE PINS
        selectUserActivePins: "-- Pins --",
        selectUserActivePin: "Selecciona el pin a colocar:",

        // CREATE USER
        usersTitle: "Usuarios",
        createUserTitle: "Crea un nuevo usuario",
        createUserButton: "Crea el usuario",

        userNicknameInvalid: "El nombre de usuario no es válido. Debe contener carácteres válidos y tener entre: ",
        userNicknameNotUnique: "El nombre de usuario ya existe. Por favor, pruebe con otro.",
        userNameInvalid: "El nombre no es válido. Debe contener carácteres válidos y tener entre: ",
        userFirstSurnameInvalid: "El primer apellido no es válido. Debe contener carácteres válidos y tener entre: ",
        userSecondSurnameInvalid: "El segundo apellido no es válido. Debe contener carácteres válidos y tener entre: ",
        userEmailInvalid: "El correo electrónico no es válido. Debe seguir el formato de correo con carácteres válidos entre: ",
        userEmailNotUnique: "El correo electrónico ya existe. Por favor, pruebe con otro.",
        userPasswordInvalid: "La contraseña no es válida. Debe tener carácteres válidos entre: ",
        userPasswordWeak: "La contraseña es demasiado débil. Debe contener suficientes carácteres válidos con letras y números",
        userPasswordMedium: 'La contraseña es suficientemente segura. Pero si añade carácteres especiales, ¡será aún más segura!',
        userPasswordStrong: '¡Genial, la contraseña es muy segura!',
        userRolesInvalid: "Los roles no son válidos. Deben ser uno de la lista.",
        userCoinsInvalid: "Las monedas no son válidas. Deben ser un número flotante positivo.",
        userDigitalProductsInvalid: "Los productos digitales no son válidos",
        userActiveUserImageInvalid: "La imagen de perfil no es válida. Debe ser un archivo válido con tamaño inferior a: ",
        userActiveUserImageFrameInvalid: "El marco de imagen de perfil no es válido. Debe ser un archivo válido con tamaño inferior a: ",
        userActiveUserBackgroundImageInvalid: "La imagen de fondo no es válida. Debe ser un archivo válido con tamaño inferior a: ",
        userActiveUserTitleInvalid: "El título no es válido. Debe tener carácteres válidos entre: ",
        userActiveUserBackgroundColourInvalid: "El color de fondo no es válido. Debe seguir el formato hexadecimal.",
        userActivePinsInvalid: "Los pins no son válidos.",

        successCreateUserMessage: "El usuario se ha creado con éxito",
        errorCreateUserMessage: "Lo sentimos, no se ha podido crear el usuario.",
        createAnotherUserButton: "Crear otro usuario",
        retryCreateUserButton: "Volver a intentar",

        // UPDATE USER
        updateUserTitle: "Edita el usuario",
        updateUserButton: "Edita el usuario",
        goToUsersButton: "Vuelve a los usuarios",
        goToUserPageButton: "Página del Usuario",
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
        errorRetrievingUsersMessage: "Error al obtener la información de los usuarios. \nMotivo: ",

        // -------------------------------------------------------------------------------------------- ACTIVITY

        activityQuestion: "Pregunta",
        activityType: "Tipo",
        activityImage: "Imagen",
        activityCorrectAnswer: "Respuesta correcta",
        activityFirstIncorrectAnswer: "Primera respuesta incorrecta",
        activitySecondIncorrectAnswer: "Segunda respuesta incorrecta",

        // --- ACTIVITY TYPE
        selectActivityType: "-- Tipo de actividad --",
        activityTypeCercatrivia: "Cercatrivia",
        activityTypeGeganquesta: "Geganquesta",

        // CREATE ACTIVITY
        activitiesTitle: "Actividades registradas",
        createActivityTitle: "Crea una nueva actividad",
        createActivityButton: "Crea la actividad",

        activityQuestionInvalid: "La pregunta no es válida. Debe tener carácteres válidos entre: ",
        activityTypeInvalid: "El tipo no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",
        activityImageInvalid: "La imagen no es válida. Debe ser un archivo válido con tamaño inferior a: ",
        activityCorrectAnswerInvalid: "La respuesta correcta no es válida. Debe tener carácteres válidos entre: ",
        activityFirstIncorrectAnswerInvalid: "La primera respuesta incorrecta no es válida. Debe tener carácteres válidos entre: ",
        activitySecondIncorrectAnswerInvalid: "La segunda respuesta incorrecta no es válida. Debe tener carácteres válidos entre: ",

        successCreateActivityMessage: "La actividad se ha creado con éxito",
        errorCreateActivityMessage: "La actividad no se ha podido crear. \nMotivo: ",
        createAnotherActivityButton: "Crear otra actividad",
        retryCreateActivityButton: "Volver a intentar",

        // UPDATE ACTIVITY
        updateActivityTitle: "Edita la actividad",
        updateActivityButton: "Edita la actividad",
        goToActivitiesButton: "Vuelve a las actividades",
        deleteActivityButton: "Borrar la actividad",
        warningDeleteActivityMessage: "¿Quiere borrar la actividad de manera permanente? No se puede deshacer esta acción.",
        cancelDeleteActivityButton: "Cancelar",
        confirmDeleteActivityButton: "Borrar permanentemente",
        successUpdateActivityMessage: "La actividad se ha editado con éxito",
        errorUpdateActivityMessage: "La actividad no se ha podido editar. \nMotivo: ",
        successDeleteActivityMessage: "La actividad se ha borrado con éxito",
        errorDeleteActivityMessage: "La actividad no se ha podido borrar. \nMotivo: ",
        activityNotFoundWithId: "Actividad no encontrada con id: ",
        errorRetrievingActivityMessage: "Error al obtener la información de la actividad. \nMotivo: ",
        errorRetrievingActivitiesMessage: "Error al obtener la información de las actividades. \nMotivo: ",

        // ANSWER ACTIVITY
        activityCorrect: "¡Correcta!",
        activityIncorrect: "Lástima :(",
        activityThanks: "¡Gracias!",

        // -------------------------------------------------------------------------------------------- EVENT
        eventName: "Nombre",
        eventDescription: "Descripción",
        eventImage: "Imagen",
        eventPrimaryColour: "Color primario",
        eventSecondaryColour: "Color secundario",
        eventType: "Tipo",
        eventStartDate: "Fecha de inicio",
        eventEndDate: "Fecha de finalización",
        eventCercatrivies: "Cercatrivias",
        eventFirstCoinsReward: "1r lugar - Premio en monedas",
        eventFirstDigitalProductsReward: "1r lugar - Premio en productos digitales",
        eventSecondCoinsReward: "2n lugar - Premio en monedas",
        eventSecondDigitalProductsReward: "2n lugar - Premio en productos digitales",
        eventThirdCoinsReward: "3r lugar - Premio en monedas",
        eventThirdDigitalProductsReward: "3r lugar - Premio en productos digitales",
        eventFourthTenthCoinsReward: "4t-10º lugar - Premio en monedas",
        eventFourthTenthDigitalProductsReward: "4t-10º lugar - Premio en productos digitales",
        eventAllCoinsReward: "Todos los participantes - Premio en monedas",
        eventAllDigitalProductsReward: "Todos los participantes - Premio en productos digitales",

        // --- EVENT TYPE
        selectEventType: "-- Tipo de evento --",
        eventTypeCercampionatMensual: "Cercampionat mensual",
        eventTypeCercampionatAnual: "Cercampionat anual",
        eventTypeCelebracio: "Celebración",
        eventTypeCompensacio: "Compensación",

        selectEventCercatrivies: "-- Cercatrivies --",
        selectEventFirstDigitalProductsReward: "-- 1r lugar - Productos digitales de premio --",
        selectEventSecondDigitalProductsReward: "-- 2n lugar - Productos digitales de premio --",
        selectEventThirdDigitalProductsReward: "-- 3r lugar - Productos digitales de premio --",
        selectEventFourthTenthDigitalProductsReward: "-- 4º-10º lugar - Productos digitales de premio --",
        selectEventAllDigitalProductsReward: "-- Todos los participantes - Productos digitales de premio --",

        // CREATE EVENT
        eventsTitle: "Eventos",
        createEventTitle: "Crea un nuevo evento",
        createEventButton: "Crea el evento",

        eventNameInvalid: "El nombre no es válido. Debe contener carácteres válidos y tener entre: ",
        eventDescriptionInvalid: "La descripción no es válida. Debe tener carácteres válidos entre: ",
        eventImageInvalid: "La imagen no es válida. Debe ser un archivo válido con tamaño inferior a: ",
        eventPrimaryColourInvalid: "El color primario no es válido. Debe seguir el formato hexadecimal.",
        eventSecondaryColourInvalid: "El color secundario no es válido. Debe seguir el formato hexadecimal.",
        eventTypeInvalid: "El tipo no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",
        eventStartDateInvalid: "La fecha de inicio no es válida. Debe ser una fecha válida.",
        eventEndDateInvalid: "La fecha de finalización no es válida. Debe ser una fecha válida y posterior a la fecha de inicio.",
        eventCercatriviesInvalid: "Los Cercatrivies no son válidos.",
        eventFirstCoinsRewardInvalid: "El premio en monedas del 1r lugar no es válido. Debe ser un número positivo.",
        eventFirstDigitalProductsRewardInvalid: "El premio en productos digitales del 1r lugar no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",
        eventSecondCoinsRewardInvalid: "El premio en monedas del 2n lugar no es válido. Debe ser un número positivo.",
        eventSecondDigitalProductsRewardInvalid: "El premio en productos digitales del 2n lugar no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",
        eventThirdCoinsRewardInvalid: "El premio en monedas del 3r lugar no es válido. Debe ser un número positivo.",
        eventThirdDigitalProductsRewardInvalid: "El premio en productos digitales del 3r lugar no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",
        eventFourthTenthCoinsRewardInvalid: "El premio en monedas del 4t-10è lugar no es válido. Debe ser un número positivo.",
        eventFourthTenthDigitalProductsRewardInvalid: "El premio en productos digitales del 4t-10è lugar no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",
        eventAllCoinsRewardInvalid: "El premio en monedas de todos los participantes no es válido. Debe ser un número positivo.",
        eventAllDigitalProductsRewardInvalid: "El premio en productos digitales de todos los participantes no es válido. Debe ser uno de la lista, con carácteres válidos entre: ",

        successCreateEventMessage: "El evento se ha creado con éxito",
        errorCreateEventMessage: "El evento no se ha podido crear. \nMotivo: ",
        createAnotherEventButton: "Crear otro evento",
        retryCreateEventButton: "Volver a intentar",

        // UPDATE EVENT
        updateEventTitle: "Edita el evento",
        updateEventButton: "Edita el evento",
        goToEventsButton: "Vuelve a los eventos",
        deleteEventButton: "Borrar el evento",
        warningDeleteEventMessage: "¿Quiere borrar el evento de manera permanente? No se puede deshacer esta acción.",
        cancelDeleteEventButton: "Cancelar",
        confirmDeleteEventButton: "Borrar permanentemente",
        successUpdateEventMessage: "El evento se ha editado con éxito",
        errorUpdateEventMessage: "El evento no se ha podido editar. \nMotivo: ",
        successDeleteEventMessage: "El evento se ha borrado con éxito",
        errorDeleteEventMessage: "El evento no se ha podido borrar. \nMotivo: ",
        eventNotFoundWithId: "Evento no encontrado con id: ",
        errorRetrievingEventMessage: "Error al obtener la información del evento. \nMotivo: ",
        errorRetrievingEventsMessage: "Error al obtener la información de los eventos. \nMotivo: ",

        // CHAMPIONSHIP PLACES
        firstPlace: "1r lugar",
        secondPlace: "2º lugar",
        thirdPlace: "3r lugar",
        fourthToTenthPlace: "4º-10º lugar",
        allParticipants: "Participantes",

        // --------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------------- IMANTS
        downloadImageButton: "Descargar"
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
        cercavilaTagline: "The platform for Mataró giants' guilds",
        cercavilaWelcome: "You have arrived at Cercavila, ",
        errorFound: "An error has occurred",
        unreachablePage: "Unexpected path",
        retry: "Retry",
        maxFileSize: "Maximum file size: ",
        sinceYear: "Since year ",
        coinAcronym: "C",

        loading: "Loading...",
        successUpdate: "Update done!",
        errorUpdate: "Update error :(",

        start: "Start",
        end: "End",
        days: "days",
        hours: "h",
        remain: "Remain",

        // -------------------------------------------------------------------------------------------- LOGIN
        loginTitle: "It's time to enter Cercavila!",
        loginButton: "Log in",
        loginError: "Error logging in",
        registerTitle: "Register",
        registerButton: "Register",
        registerError: "Error registering",
        logoutButton: "Log out",
        incorrectPasswordError: "Incorrect password",
        userNotFoundError: "No user found with this nickname",

        // -------------------------------------------------------------------------------------------- CCGM
        ccgmAcronym: "CCGM",
        ccgmName: "Coordinadora de Colles Geganteres de Mataró",

        // -------------------------------------------------------------------------------------------- FILTERS

        collaFilterByName: "Filter by name",
        collaFilterWriteName: "Write a name",

        collaFilterByType: "Filter by type",
        collaFilterSelectType: "Select a type",

        collaFilterByNeighbourhood: "Filter by neighbourhood",
        collaFilterSelectNeighbourhood: "Select a neighbourhood",

        collaFilterByMusic: "Filter by music type",
        collaFilterSelectMusic: "Select a music type",

        userFilterByRole: "Filter by role",
        userFilterSelectRole: "Select a role",

        userFilterByColla: "Filter by colla",
        userFilterSelectColla: "Select a colla",

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
        collesTitle: "Colles",
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

        digitalProductEventExclusive: "Event exclusive",

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
        storeTitle: "Store",
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

        // -------------------------------------------------------------------------------------------- DIGITAL PRODUCT STORE

        digitalProductStoreBuyButton: "Buy",
        digitalProductConfirmBuyTitle: "Confirm purchase",
        digitalProductConfirmBuyMessage: "Do you want to buy the item {product}?",
        digitalProductProductPrice: "The price is {price} coins.",
        digitalProductInsufficientCoins: "You need {remaining} coins to buy the item. Don't worry, you'll get them soon!",
        digitalProductCancelBuyButton: "Cancel",
        digitalProductSuccessBuyMessage: "Done! You have it!",

        // -------------------------------------------------------------------------------------------- USER
        userNickname: "Nickname",
        userName: "Name",
        userFirstSurname: "First surname",
        userSecondSurname: "Second surname",
        userEmail: "Email",
        userPassword: "Password",
        userRoles: "Roles",
        userRoles_Role: "Role",
        userRoles_Colla: "Colla",
        userCoins: "Coins",
        userDigitalProducts: "Digital products",
        userActiveUserImage: "Profile image",
        userActiveUserImageFrame: "Profile image frame",
        userActiveUserBackgroundImage: "Background image",
        userActiveUserTitle: "Title",
        userActiveUserBackgroundColour: "Background colour",
        userActivePins: "Pins",

        // --- USER COLLA ROLES
        selectUserCollaRole: "-- Role --",
        selectUserColla: "-- Colla --",
        userCollaRoleCap: "Colla captain",
        userCollaRoleSotscap: "Colla vice-captain",
        userCollaRoleCapMusics: "Music captain",
        userCollaRolePortador: "Carrier",
        userCollaRoleMusician: "Musician",
        userCollaRoleSupport: "Support",
        userCollaOuterRoleFollower: "Follower",
        userCCGMPresident: "President",
        userCCGMSecretary: "Secretary",
        userCCGMTreasurer: "Treasurer",
        userCCGMBoardMember: "Board member",

        // --- USER DIGITAL PRODUCTS
        selectUserDigitalProduct: "-- Digital product --",
        // --- USER ACTIVE USER IMAGE
        selectUserActiveUserImage: "-- User image --",
        // --- USER ACTIVE USER IMAGE FRAME
        selectUserActiveUserImageFrame: "-- User image frame --",
        // --- USER ACTIVE USER BACKGROUND IMAGE
        selectUserActiveUserBackgroundImage: "-- User background image --",
        // --- USER ACTIVE USER TITLE
        selectUserActiveUserTitle: "-- User title --",
        // --- USER ACTIVE USER BACKGROUND COLOUR
        selectUserActiveUserBackgroundColour: "-- User background colour --",
        // --- USER ACTIVE PINS
        selectUserActivePins: "-- Pins --",
        selectUserActivePin: "Select the pin to place:",

        // CREATE USER
        usersTitle: "Users",
        createUserTitle: "Create a new user",
        createUserButton: "Create user",

        userNicknameInvalid: "The nickname is not valid. It must contain valid characters and be between: ",
        userNicknameNotUnique: "The nickname already exists. Please, try another one.",
        userNameInvalid: "The name is not valid. It must contain valid characters and be between: ",
        userFirstSurnameInvalid: "The first surname is not valid. It must contain valid characters and be between: ",
        userSecondSurnameInvalid: "The second surname is not valid. It must contain valid characters and be between: ",
        userEmailInvalid: "The email is not valid. It must follow the email format with valid characters between: ",
        userEmailNotUnique: "The email already exists. Please, try another one.",
        userPasswordInvalid: "The password is not valid. It must have valid characters between: ",
        userPasswordWeak: "The password is too weak. It must contain enough valid characters with letters and numbers",
        userPasswordMedium: 'The password is secure enough. But if you add special characters, it will be even more secure!',
        userPasswordStrong: 'Great, the password is very secure!',
        userRolesInvalid: "The roles are not valid. They must be one from the list.",
        userCoinsInvalid: "The coins are not valid. They must be a positive float number.",
        userDigitalProductsInvalid: "The digital products are not valid",
        userActiveUserImageInvalid: "The profile image is not valid. It must be a valid file with size lower than: ",
        userActiveUserImageFrameInvalid: "The profile image frame is not valid. It must be a valid file with size lower than: ",
        userActiveUserBackgroundImageInvalid: "The background image is not valid. It must be a valid file with size lower than: ",
        userActiveUserTitleInvalid: "The title is not valid. It must have valid characters between: ",
        userActiveUserBackgroundColourInvalid: "The background colour is not valid. It must follow the hexadecimal format.",
        userActivePinsInvalid: "The pins are not valid.",

        successCreateUserMessage: "User has been created successfully",
        errorCreateUserMessage: "Sorry, user could not be created.",
        createAnotherUserButton: "Create another user",
        retryCreateUserButton: "Retry",

        // UPDATE USER
        updateUserTitle: "Edit user",
        updateUserButton: "Edit user",
        goToUsersButton: "Go back to users",
        goToUserPageButton: "Go to User page",
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
        errorRetrievingUsersMessage: "Error retrieving users information. \nReason: ",

        // -------------------------------------------------------------------------------------------- ACTIVITY

        activityQuestion: "Question",
        activityType: "Type",
        activityImage: "Image",
        activityCorrectAnswer: "Correct answer",
        activityFirstIncorrectAnswer: "First incorrect answer",
        activitySecondIncorrectAnswer: "Second incorrect answer",

        // --- ACTIVITY TYPE
        selectActivityType: "-- Activity type --",
        activityTypeCercatrivia: "Cercatrivia",
        activityTypeGeganquesta: "Geganquesta",

        // CREATE ACTIVITY
        activitiesTitle: "Registered activities",
        createActivityTitle: "Create a new activity",
        createActivityButton: "Create activity",

        activityQuestionInvalid: "The question is not valid. It must have valid characters between: ",
        activityTypeInvalid: "The type is not valid. It must be one from the list, with valid characters between: ",
        activityImageInvalid: "The image is not valid. It must be a valid file with size lower than: ",
        activityCorrectAnswerInvalid: "The correct answer is not valid. It must have valid characters between: ",
        activityFirstIncorrectAnswerInvalid: "The first incorrect answer is not valid. It must have valid characters between: ",
        activitySecondIncorrectAnswerInvalid: "The second incorrect answer is not valid. It must have valid characters between: ",

        successCreateActivityMessage: "The activity has been created successfully",
        errorCreateActivityMessage: "The activity could not be created. \nReason: ",
        createAnotherActivityButton: "Create another activity",
        retryCreateActivityButton: "Retry",

        // UPDATE ACTIVITY
        updateActivityTitle: "Edit activity",
        updateActivityButton: "Edit activity",
        goToActivitiesButton: "Go back to activities",
        deleteActivityButton: "Delete activity",
        warningDeleteActivityMessage: "Do you want to delete the activity permanently? This action cannot be undone.",
        cancelDeleteActivityButton: "Cancel",
        confirmDeleteActivityButton: "Delete permanently",
        successUpdateActivityMessage: "The activity has been edited successfully",
        errorUpdateActivityMessage: "The activity could not be edited. \nReason: ",
        successDeleteActivityMessage: "The activity has been deleted successfully",
        errorDeleteActivityMessage: "The activity could not be deleted. \nReason: ",
        activityNotFoundWithId: "Activity not found with id: ",
        errorRetrievingActivityMessage: "Error retrieving activity information. \nReason: ",
        errorRetrievingActivitiesMessage: "Error retrieving activities information. \nReason: ",

        // ANSWER ACTIVITY
        activityCorrect: "You nailed it!",
        activityIncorrect: "Oh no :(",
        activityThanks: "Thanks!",

        // -------------------------------------------------------------------------------------------- EVENT
        eventName: "Name",
        eventDescription: "Description",
        eventImage: "Image",
        eventPrimaryColour: "Primary colour",
        eventSecondaryColour: "Secondary colour",
        eventType: "Type",
        eventStartDate: "Start date",
        eventEndDate: "End date",
        eventCercatrivies: "Cercatrivies",
        eventFirstCoinsReward: "1st place - Coins reward",
        eventFirstDigitalProductsReward: "1st place - Digital products reward",
        eventSecondCoinsReward: "2nd place - Coins reward",
        eventSecondDigitalProductsReward: "2nd place - Digital products reward",
        eventThirdCoinsReward: "3rd place - Coins reward",
        eventThirdDigitalProductsReward: "3rd place - Digital products reward",
        eventFourthTenthCoinsReward: "4th-10th place - Coins reward",
        eventFourthTenthDigitalProductsReward: "4th-10th place - Digital products reward",
        eventAllCoinsReward: "All participants - Coins reward",
        eventAllDigitalProductsReward: "All participants - Digital products reward",

        // --- EVENT TYPE
        selectEventType: "-- Event type --",
        eventTypeCercampionatMensual: "Monthly Cercampionat",
        eventTypeCercampionatAnual: "Annual Cercampionat",
        eventTypeCelebracio: "Celebration",
        eventTypeCompensacio: "Compensation",

        selectEventCercatrivies: "-- Cercatrivies --",
        selectEventFirstDigitalProductsReward: "-- 1st place - Digital products reward --",
        selectEventSecondDigitalProductsReward: "-- 2nd place - Digital products reward --",
        selectEventThirdDigitalProductsReward: "-- 3rd place - Digital products reward --",
        selectEventFourthTenthDigitalProductsReward: "-- 4th-10th place - Digital products reward --",
        selectEventAllDigitalProductsReward: "-- All participants - Digital products reward --",

        // CREATE EVENT
        eventsTitle: "Events",
        createEventTitle: "Create a new event",
        createEventButton: "Create event",

        eventNameInvalid: "The name is not valid. It must contain valid characters and be between: ",
        eventDescriptionInvalid: "The description is not valid. It must have valid characters between: ",
        eventImageInvalid: "The image is not valid. It must be a valid file with size lower than: ",
        eventPrimaryColourInvalid: "The primary colour is not valid. It must follow the hexadecimal format.",
        eventSecondaryColourInvalid: "The secondary colour is not valid. It must follow the hexadecimal format.",
        eventTypeInvalid: "The type is not valid. It must be one from the list, with valid characters between: ",
        eventStartDateInvalid: "The start date is not valid. It must be a valid date.",
        eventEndDateInvalid: "The end date is not valid. It must be a valid date and after the start date.",
        eventCercatriviesInvalid: "The Cercatrivies are not valid.",
        eventFirstCoinsRewardInvalid: "The 1st place coins reward is not valid. It must be a positive number.",
        eventFirstDigitalProductsRewardInvalid: "The 1st place digital products reward is not valid. It must be one from the list, with valid characters between: ",
        eventSecondCoinsRewardInvalid: "The 2nd place coins reward is not valid. It must be a positive number.",
        eventSecondDigitalProductsRewardInvalid: "The 2nd place digital products reward is not valid. It must be one from the list, with valid characters between: ",
        eventThirdCoinsRewardInvalid: "The 3rd place coins reward is not valid. It must be a positive number.",
        eventThirdDigitalProductsRewardInvalid: "The 3rd place digital products reward is not valid. It must be one from the list, with valid characters between: ",
        eventFourthTenthCoinsRewardInvalid: "The 4th-10th place coins reward is not valid. It must be a positive number.",
        eventFourthTenthDigitalProductsRewardInvalid: "The 4th-10th place digital products reward is not valid. It must be one from the list, with valid characters between: ",
        eventAllCoinsRewardInvalid: "The all participants coins reward is not valid. It must be a positive number.",
        eventAllDigitalProductsRewardInvalid: "The all participants digital products reward is not valid. It must be one from the list, with valid characters between: ",

        successCreateEventMessage: "The event has been created successfully",
        errorCreateEventMessage: "The event could not be created. \nReason: ",
        createAnotherEventButton: "Create another event",
        retryCreateEventButton: "Retry",

        // UPDATE EVENT
        updateEventTitle: "Edit event",
        updateEventButton: "Edit event",
        goToEventsButton: "Go back to events",
        deleteEventButton: "Delete event",
        warningDeleteEventMessage: "Do you want to delete the event permanently? This action cannot be undone.",
        cancelDeleteEventButton: "Cancel",
        confirmDeleteEventButton: "Delete permanently",
        successUpdateEventMessage: "The event has been edited successfully",
        errorUpdateEventMessage: "The event could not be edited. \nReason: ",
        successDeleteEventMessage: "The event has been deleted successfully",
        errorDeleteEventMessage: "The event could not be deleted. \nReason: ",
        eventNotFoundWithId: "Event not found with id: ",
        errorRetrievingEventMessage: "Error retrieving event information. \nReason: ",
        errorRetrievingEventsMessage: "Error retrieving events information. \nReason: ",

        // CHAMPIONSHIP PLACES
        firstPlace: "1st place",
        secondPlace: "2nd place",
        thirdPlace: "3rd place",
        fourthToTenthPlace: "4th-10th place",
        allParticipants: "All participants",

        // --------------------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------------------- IMANTS
        downloadImageButton: "Download"
    }
}