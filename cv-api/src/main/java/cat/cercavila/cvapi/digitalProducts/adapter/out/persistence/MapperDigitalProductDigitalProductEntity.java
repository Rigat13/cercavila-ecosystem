package cat.cercavila.cvapi.digitalProducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.DigitalProductListing;
import cat.cercavila.cvapi.digitalProducts.domain.DigitalProduct;

public class MapperDigitalProductDigitalProductEntity {
    public static DigitalProduct figuraEntityToFigura(DigitalProductEntity digitalProductEntity) {
        DigitalProduct figura = new DigitalProduct(digitalProductEntity.getName(), digitalProductEntity.getYear(), digitalProductEntity.getType(), digitalProductEntity.getImageKey(), digitalProductEntity.getWebUrl());
        // NOTE: Created from zero, with new ID. // TODO Check if this is true
        return figura;
    }

    public static DigitalProductEntity figuraToFiguraEntity(DigitalProduct figura) {
        DigitalProductEntity digitalProductEntity = new DigitalProductEntity();
        digitalProductEntity.setId(figura.getId());
        digitalProductEntity.setName(figura.getName());
        digitalProductEntity.setYear(figura.getYear());
        digitalProductEntity.setType(figura.getType());
        digitalProductEntity.setImageKey(figura.getImageKey());
        digitalProductEntity.setWebUrl(figura.getWebUrl());

        return digitalProductEntity;
    }

    public static DigitalProductEntity figuraListingToFiguraEntity(DigitalProductListing currentDigitalProductListing) {
        DigitalProductEntity digitalProductEntity = new DigitalProductEntity();
        digitalProductEntity.setId(currentDigitalProductListing.id());
        digitalProductEntity.setName(currentDigitalProductListing.name());
        digitalProductEntity.setYear(currentDigitalProductListing.year());
        digitalProductEntity.setType(currentDigitalProductListing.type());
        digitalProductEntity.setImageKey(currentDigitalProductListing.imageKey());
        digitalProductEntity.setWebUrl(currentDigitalProductListing.webUrl());

        return digitalProductEntity;
    }
}
