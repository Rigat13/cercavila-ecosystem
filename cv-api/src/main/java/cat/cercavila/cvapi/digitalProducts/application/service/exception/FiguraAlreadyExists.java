package cat.cercavila.cvapi.digitalProducts.application.service.exception;

public class FiguraAlreadyExists extends RuntimeException {
    public FiguraAlreadyExists(String id) { super("La figura " + id + " ja existeix."); }
}
