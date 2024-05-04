package cat.cercavila.cvapi.digitalproducts.application.port.out;

import cat.cercavila.cvapi.digitalproducts.application.port.in.list.DigitalProductListing;

import java.util.List;
import java.util.Optional;

public interface ListDigitalProductPort {
    Optional<DigitalProductListing> loadDigitalProductById(String id);
    Optional<DigitalProductListing> loadDigitalProductByName(String name);

    List<DigitalProductListing> loadAllDigitalProductsByName();
    List<DigitalProductListing> loadAllDigitalProductsByPrice();
    List<DigitalProductListing> loadAllDigitalProductsByType();
    List<DigitalProductListing> loadAllDigitalProducts();
    List<DigitalProductListing> loadAllDigitalProductsNoImage();
}
