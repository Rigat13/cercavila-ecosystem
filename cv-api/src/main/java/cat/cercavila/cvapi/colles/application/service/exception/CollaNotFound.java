package cat.cercavila.cvapi.colles.application.service.exception;

public class CollaNotFound extends RuntimeException{
    public CollaNotFound(String id)  { super("La colla " + id + " no existeix."); }
}
