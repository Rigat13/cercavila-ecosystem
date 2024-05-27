package cat.cercavila.cvapi.event.application.service.exception;

public class EventNotFound extends RuntimeException{
    public EventNotFound(String id)  { super("El producte digital " + id + " no existeix."); }
}
