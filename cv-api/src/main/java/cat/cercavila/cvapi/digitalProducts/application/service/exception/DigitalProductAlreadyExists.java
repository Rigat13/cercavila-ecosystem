package cat.cercavila.cvapi.digitalProducts.application.service.exception;

public class DigitalProductAlreadyExists extends RuntimeException {
    public DigitalProductAlreadyExists(String id) { super("El producte digital " + id + " ja existeix."); }
}
