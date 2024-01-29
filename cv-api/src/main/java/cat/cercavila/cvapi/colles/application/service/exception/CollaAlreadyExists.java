package cat.cercavila.cvapi.colles.application.service.exception;

public class CollaAlreadyExists extends RuntimeException {
    public CollaAlreadyExists(String id) { super("La colla " + id + " ja existeix."); }
}
