package cat.cercavila.cvapi.users.application.service.exception;

public class UserAlreadyExists extends RuntimeException {
    public UserAlreadyExists(String id) { super("L'usuari " + id + " ja existeix."); }
}
