package cat.cercavila.cvapi.users.application.service.exception;

public class UserNicknameAlreadyExists extends RuntimeException {
    public UserNicknameAlreadyExists(String nickname) { super("El nickname d'usuari " + nickname + " ja existeix."); }
}
