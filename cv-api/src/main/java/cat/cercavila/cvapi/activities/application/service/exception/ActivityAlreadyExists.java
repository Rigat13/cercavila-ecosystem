package cat.cercavila.cvapi.activities.application.service.exception;

public class ActivityAlreadyExists extends RuntimeException {
    public ActivityAlreadyExists(String id) { super("L'activitat' " + id + " ja existeix."); }
}
