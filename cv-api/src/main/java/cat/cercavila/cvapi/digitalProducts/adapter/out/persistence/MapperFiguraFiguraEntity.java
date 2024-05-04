package cat.cercavila.cvapi.digitalProducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.FiguraListing;
import cat.cercavila.cvapi.digitalProducts.domain.Figura;

public class MapperFiguraFiguraEntity {
    public static Figura figuraEntityToFigura(FiguraEntity figuraEntity) {
        Figura figura = new Figura(figuraEntity.getName(), figuraEntity.getYear(), figuraEntity.getType(), figuraEntity.getImageKey(), figuraEntity.getWebUrl());
        // NOTE: Created from zero, with new ID. // TODO Check if this is true
        return figura;
    }

    public static FiguraEntity figuraToFiguraEntity(Figura figura) {
        FiguraEntity figuraEntity = new FiguraEntity();
        figuraEntity.setId(figura.getId());
        figuraEntity.setName(figura.getName());
        figuraEntity.setYear(figura.getYear());
        figuraEntity.setType(figura.getType());
        figuraEntity.setImageKey(figura.getImageKey());
        figuraEntity.setWebUrl(figura.getWebUrl());

        return figuraEntity;
    }

    public static FiguraEntity figuraListingToFiguraEntity(FiguraListing currentFiguraListing) {
        FiguraEntity figuraEntity = new FiguraEntity();
        figuraEntity.setId(currentFiguraListing.id());
        figuraEntity.setName(currentFiguraListing.name());
        figuraEntity.setYear(currentFiguraListing.year());
        figuraEntity.setType(currentFiguraListing.type());
        figuraEntity.setImageKey(currentFiguraListing.imageKey());
        figuraEntity.setWebUrl(currentFiguraListing.webUrl());

        return figuraEntity;
    }
}
