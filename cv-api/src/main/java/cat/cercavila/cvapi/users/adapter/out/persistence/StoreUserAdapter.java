package cat.cercavila.cvapi.users.adapter.out.persistence;

import cat.cercavila.cvapi.users.application.port.in.create.CreateUserCommand;
import cat.cercavila.cvapi.users.application.port.out.StoreUserPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class StoreUserAdapter implements StoreUserPort {
    private final UserRepository userRepository;

    public StoreUserAdapter(UserRepository userRepository) { this.userRepository = userRepository; }

    @Override
    public void storeUser(CreateUserCommand createUserCommand) {
        String logoKeyName = generateLogoKeyName(createUserCommand);
        if (!logoKeyName.equals("")) saveImageToServer(createUserCommand.logo(), logoKeyName);
        userRepository.save(createCollaCommand2CollaEntity(createUserCommand, logoKeyName));
    }

    private UserEntity createCollaCommand2CollaEntity(CreateUserCommand createUserCommand, String logoKey) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(UUID.randomUUID().toString()); // IMPORTANT: This is to create a new User without an ID
        userEntity.setName(createUserCommand.name());
        userEntity.setEntity(createUserCommand.entity());
        userEntity.setFoundationYear(createUserCommand.foundationYear());
        userEntity.setDescription(createUserCommand.description());
        userEntity.setType(createUserCommand.type());
        userEntity.setNeighbourhood(createUserCommand.neighbourhood());
        userEntity.setPrimaryColour(createUserCommand.primaryColour());
        userEntity.setSecondaryColour(createUserCommand.secondaryColour());
        userEntity.setLogoKey(logoKey);
        userEntity.setMusic(createUserCommand.music());
        userEntity.setEmail(createUserCommand.email());
        userEntity.setInstagram(createUserCommand.instagram());
        userEntity.setFigures(createUserCommand.figures());

        return userEntity;
    }

    private String generateLogoKeyName(CreateUserCommand createUserCommand) {
        if (createUserCommand.logo() == null || createUserCommand.logo().isEmpty()) return "";
        String original = createUserCommand.logo().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String collaName = createUserCommand.name();
        collaName = collaName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "logo_colla_" + collaName + "_" + UUID.randomUUID() + extension;
    }

    private void saveImageToServer(MultipartFile imageFile, String logoKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images", logoKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
