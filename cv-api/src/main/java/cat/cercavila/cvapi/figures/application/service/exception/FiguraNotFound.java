package cat.cercavila.cvapi.figures.application.service.exception;

public class FiguraNotFound extends RuntimeException{
    public FiguraNotFound(String id)  { super("La colla " + id + " no existeix."); }
}
