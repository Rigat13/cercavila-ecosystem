package cat.cercavila.cvapi.figures.application.service.exception;

public class FiguraAlreadyExists extends RuntimeException {
    public FiguraAlreadyExists(String id) { super("La figura " + id + " ja existeix."); }
}
