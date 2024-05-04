package cat.cercavila.cvapi.digitalproducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalproducts.application.port.in.list.DigitalProductListing;
import cat.cercavila.cvapi.digitalproducts.domain.DigitalProduct;

public class MapperDigitalProductDigitalProductEntity {
    public static DigitalProduct digitalProductEntityToDigitalProduct(DigitalProductEntity digitalProductEntity) {
        DigitalProduct digitalProduct = new DigitalProduct(digitalProductEntity.getName(), digitalProductEntity.getDescription(), digitalProductEntity.getImageKey(),
                digitalProductEntity.getPrimaryColour(), digitalProductEntity.getSecondaryColour(), digitalProductEntity.getPrice(), digitalProductEntity.getType());
        // NOTE: Created from zero, with new ID.
        return digitalProduct;
    }

    public static DigitalProductEntity digitalProductToDigitalProductEntity(DigitalProduct digitalProduct) {
        DigitalProductEntity digitalProductEntity = new DigitalProductEntity();
        digitalProductEntity.setId(digitalProduct.getId());
        digitalProductEntity.setName(digitalProduct.getName());
        digitalProductEntity.setDescription(digitalProduct.getDescription());
        digitalProductEntity.setImageKey(digitalProduct.getImageKey());
        digitalProductEntity.setPrimaryColour(digitalProduct.getPrimaryColour());
        digitalProductEntity.setSecondaryColour(digitalProduct.getSecondaryColour());
        digitalProductEntity.setPrice(digitalProduct.getPrice());
        digitalProductEntity.setType(digitalProduct.getType());

        return digitalProductEntity;
    }

    public static DigitalProductEntity digitalProductListingToDigitalProductEntity(DigitalProductListing currentDigitalProductListing) {
        DigitalProductEntity digitalProductEntity = new DigitalProductEntity();
        digitalProductEntity.setId(currentDigitalProductListing.id());
        digitalProductEntity.setName(currentDigitalProductListing.name());
        digitalProductEntity.setDescription(currentDigitalProductListing.description());
        digitalProductEntity.setImageKey(currentDigitalProductListing.imageKey());
        digitalProductEntity.setPrimaryColour(currentDigitalProductListing.primaryColour());
        digitalProductEntity.setSecondaryColour(currentDigitalProductListing.secondaryColour());
        digitalProductEntity.setPrice(currentDigitalProductListing.price());
        digitalProductEntity.setType(currentDigitalProductListing.type());

        return digitalProductEntity;
    }
}
