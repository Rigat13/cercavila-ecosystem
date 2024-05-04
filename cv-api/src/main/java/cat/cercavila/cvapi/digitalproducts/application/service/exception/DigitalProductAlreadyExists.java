package cat.cercavila.cvapi.digitalproducts.application.service.exception;

public class DigitalProductAlreadyExists extends RuntimeException {
    public DigitalProductAlreadyExists(String id) { super("El producte digital " + id + " ja existeix."); }
}
