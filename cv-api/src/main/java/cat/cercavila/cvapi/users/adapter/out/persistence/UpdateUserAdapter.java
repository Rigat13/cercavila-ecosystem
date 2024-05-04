package cat.cercavila.cvapi.users.adapter.out.persistence;


import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import cat.cercavila.cvapi.users.application.port.in.update.UpdateUserCommand;
import cat.cercavila.cvapi.users.application.port.out.UpdateUserPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class UpdateUserAdapter implements UpdateUserPort {
    private final UserRepository userRepository;

    public UpdateUserAdapter(UserRepository userRepository) { this.userRepository = userRepository; }

    @Override
    public void updateColla(UpdateUserCommand updateUserCommand) {
        String logoKeyName = generateLogoKeyName(updateUserCommand);
        if (!logoKeyName.equals("")) {
            removeCurrentLogo(updateUserCommand);
            saveImageToServer(updateUserCommand.logo(), logoKeyName);
        }
        userRepository.save(updateCollaCommand2CollaEntity(updateUserCommand, logoKeyName)); // NOTE: save does not mean "create"; if it exists, it will update
    }

    private UserEntity updateCollaCommand2CollaEntity(UpdateUserCommand updateUserCommand, String logoKey) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(updateUserCommand.id());
        userEntity.setName(updateUserCommand.name());
        userEntity.setEntity(updateUserCommand.entity());
        userEntity.setFoundationYear(updateUserCommand.foundationYear());
        userEntity.setDescription(updateUserCommand.description());
        userEntity.setType(updateUserCommand.type());
        userEntity.setNeighbourhood(updateUserCommand.neighbourhood());
        userEntity.setPrimaryColour(updateUserCommand.primaryColour());
        userEntity.setSecondaryColour(updateUserCommand.secondaryColour());
        userEntity.setLogoKey(logoKey);
        userEntity.setMusic(updateUserCommand.music());
        userEntity.setEmail(updateUserCommand.email());
        userEntity.setInstagram(updateUserCommand.instagram());
        userEntity.setFigures(updateUserCommand.figures());

        return userEntity;
    }

    private String generateLogoKeyName(UpdateUserCommand updateUserCommand) {
        if (updateUserCommand.logo() == null || updateUserCommand.logo().isEmpty()) return "";
        String original = updateUserCommand.logo().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String collaName = updateUserCommand.name();
        collaName = collaName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "logo_colla_" + collaName + "_" + UUID.randomUUID() + extension;
    }

    private void removeCurrentLogo(UpdateUserCommand updateUserCommand) {
        String collaId = updateUserCommand.id();

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

    private void saveImageToServer(MultipartFile imageFile, String logoKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images", logoKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
