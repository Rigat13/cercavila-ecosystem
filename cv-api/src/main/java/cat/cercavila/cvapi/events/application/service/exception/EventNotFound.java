package cat.cercavila.cvapi.events.application.service.exception;

public class EventNotFound extends RuntimeException{
    public EventNotFound(String id)  { super("L'esdeveniment " + id + " no existeix."); }
}
