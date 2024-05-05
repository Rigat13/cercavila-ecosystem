package cat.cercavila.cvapi.users.application.service.exception;

public class UserNotFound extends RuntimeException{
    public UserNotFound(String id)  { super("L'usuari' " + id + " no existeix."); }
}
