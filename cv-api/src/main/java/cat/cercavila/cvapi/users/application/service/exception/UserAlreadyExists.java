package cat.cercavila.cvapi.users.application.service.exception;

public class UserAlreadyExists extends RuntimeException {
    public UserAlreadyExists(String id) { super("La colla " + id + " ja existeix."); }
}
