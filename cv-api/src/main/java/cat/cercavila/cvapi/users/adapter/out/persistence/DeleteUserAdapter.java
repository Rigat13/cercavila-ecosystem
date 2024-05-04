package cat.cercavila.cvapi.users.adapter.out.persistence;

import cat.cercavila.cvapi.users.application.port.in.delete.DeleteUserCommand;
import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import cat.cercavila.cvapi.users.application.port.out.DeleteUserPort;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class DeleteUserAdapter implements DeleteUserPort {
    private final UserRepository userRepository;

    public DeleteUserAdapter(UserRepository userRepository) { this.userRepository = userRepository; }

    @Override
    public void deleteColla(DeleteUserCommand deleteUserCommand) {
        removeCurrentLogo(deleteUserCommand);
        userRepository.delete(deleteCollaCommand2CollaEntity(deleteUserCommand));
    }

    private UserEntity deleteCollaCommand2CollaEntity(DeleteUserCommand deleteUserCommand) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(deleteUserCommand.id()); // IMPORTANT: Here, an existing ID is used to delete the User
        // The other fields are not necessary for the deletion
        return userEntity;
    }

    private void removeCurrentLogo(DeleteUserCommand deleteUserCommand) {
        String collaId = deleteUserCommand.id();

        UserListing currentUserListing;
        try { currentUserListing = userRepository.getById(collaId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        UserEntity currentColla = MapperUserUserEntity.collaListingToCollaEntity(currentUserListing);

        String currentLogoKey = currentColla.getLogoKey();
        if (currentLogoKey != null && !currentLogoKey.isEmpty()) {
            try {
                Path logoPath = Paths.get("/srv/cv-api/images", currentLogoKey);
                Files.deleteIfExists(logoPath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }
}
