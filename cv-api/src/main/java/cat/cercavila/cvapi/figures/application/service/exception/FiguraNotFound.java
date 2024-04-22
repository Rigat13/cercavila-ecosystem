package cat.cercavila.cvapi.figures.application.service.exception;

public class FiguraNotFound extends RuntimeException{
    public FiguraNotFound(String id)  { super("La figura " + id + " no existeix."); }
}
