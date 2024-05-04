package cat.cercavila.cvapi.digitalProducts.application.service.exception;

public class DigitalProductAlreadyExists extends RuntimeException {
    public DigitalProductAlreadyExists(String id) { super("La figura " + id + " ja existeix."); }
}
