package cat.cercavila.cvapi.digitalProducts.application.port.in.list;

import java.util.List;

public interface ListDigitalProducts {
    DigitalProductListing getDigitalProductById(String id);
    DigitalProductListing getDigitalProductByName(String name);
    List<DigitalProductListing> getAllDigitalProductsByName();
    List<DigitalProductListing> getAllDigitalProductsByYear();
    List<DigitalProductListing> getAllDigitalProductsByType();
    List<DigitalProductListing> getAllDigitalProducts();
    List<DigitalProductListing> getAllDigitalProductsNoImage();
}
