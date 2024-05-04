package cat.cercavila.cvapi.digitalProducts.application.service.exception;

public class DigitalProductNotFound extends RuntimeException{
    public DigitalProductNotFound(String id)  { super("El producte digital " + id + " no existeix."); }
}
