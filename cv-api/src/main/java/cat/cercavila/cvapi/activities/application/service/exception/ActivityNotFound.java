package cat.cercavila.cvapi.activities.application.service.exception;

public class ActivityNotFound extends RuntimeException{
    public ActivityNotFound(String id)  { super("La figura " + id + " no existeix."); }
}
