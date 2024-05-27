package cat.cercavila.cvapi.events.application.service.exception;

public class EventAlreadyExists extends RuntimeException {
    public EventAlreadyExists(String id) { super("L'esdeveniment " + id + " ja existeix."); }
}
