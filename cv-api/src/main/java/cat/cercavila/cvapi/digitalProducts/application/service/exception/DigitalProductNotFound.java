package cat.cercavila.cvapi.digitalProducts.application.service.exception;

public class DigitalProductNotFound extends RuntimeException{
    public DigitalProductNotFound(String id)  { super("La figura " + id + " no existeix."); }
}
