package cat.cercavila.cvapi.event.application.service.exception;

public class EventAlreadyExists extends RuntimeException {
    public EventAlreadyExists(String id) { super("El producte digital " + id + " ja existeix."); }
}
