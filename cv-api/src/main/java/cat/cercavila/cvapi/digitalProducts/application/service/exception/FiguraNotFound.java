package cat.cercavila.cvapi.digitalProducts.application.service.exception;

public class FiguraNotFound extends RuntimeException{
    public FiguraNotFound(String id)  { super("La figura " + id + " no existeix."); }
}
