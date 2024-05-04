package cat.cercavila.cvapi.digitalProducts.application.service;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.FiguraListing;
import cat.cercavila.cvapi.digitalProducts.domain.Figura;

public class MapperFiguraFiguraListing {
    public static Figura figuraListingToFigura (FiguraListing figuraListing) {
        Figura figura = new Figura(figuraListing.name(), figuraListing.year(), figuraListing.type(), figuraListing.imageKey(), figuraListing.webUrl());
        // NOTE: We don't set the id because it is autogenerated by the database
        return figura;
    }

    public static FiguraListing figuraToFiguraListing (Figura figura, byte[] image) {
        FiguraListing figuraListing = new FiguraListing(figura.getId(), figura.getName(), figura.getYear(), figura.getType(),  figura.getImageKey(), image, figura.getWebUrl());
        return figuraListing;
    }
}