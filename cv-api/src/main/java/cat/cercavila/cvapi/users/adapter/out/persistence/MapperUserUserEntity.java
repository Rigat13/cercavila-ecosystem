package cat.cercavila.cvapi.users.adapter.out.persistence;

import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import cat.cercavila.cvapi.users.domain.User;

public class MapperUserUserEntity {
    public static User collaEntityToColla(UserEntity userEntity) {
        User user = new User(userEntity.getName(), userEntity.getEntity(), userEntity.getFoundationYear(), userEntity.getDescription(), userEntity.getType(), userEntity.getNeighbourhood(),
                userEntity.getPrimaryColour(), userEntity.getSecondaryColour(), userEntity.getLogoKey(), userEntity.getMusic(), userEntity.getEmail(), userEntity.getInstagram(), userEntity.getFigures());
        // NOTE: Created from zero, with new ID. // TODO Check if this is true
        return user;
    }

    public static UserEntity collaToCollaEntity(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(user.getId());
        userEntity.setName(user.getName());
        userEntity.setEntity(user.getEntity());
        userEntity.setFoundationYear(user.getFoundationYear());
        userEntity.setDescription(user.getDescription());
        userEntity.setType(user.getType());
        userEntity.setNeighbourhood(user.getNeighbourhood());
        userEntity.setPrimaryColour(user.getPrimaryColour());
        userEntity.setSecondaryColour(user.getSecondaryColour());
        userEntity.setLogoKey(user.getLogoKey());
        userEntity.setMusic(user.getMusic());
        userEntity.setEmail(user.getEmail());
        userEntity.setInstagram(user.getInstagram());
        userEntity.setFigures(user.getFigures());

        return userEntity;
    }

    public static UserEntity collaListingToCollaEntity(UserListing currentUserListing) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(currentUserListing.id());
        userEntity.setName(currentUserListing.name());
        userEntity.setEntity(currentUserListing.entity());
        userEntity.setFoundationYear(currentUserListing.foundationYear());
        userEntity.setDescription(currentUserListing.description());
        userEntity.setType(currentUserListing.type());
        userEntity.setNeighbourhood(currentUserListing.neighbourhood());
        userEntity.setPrimaryColour(currentUserListing.primaryColour());
        userEntity.setSecondaryColour(currentUserListing.secondaryColour());
        userEntity.setLogoKey(currentUserListing.logoKey());
        userEntity.setMusic(currentUserListing.music());
        userEntity.setEmail(currentUserListing.email());
        userEntity.setInstagram(currentUserListing.instagram());
        userEntity.setFigures(currentUserListing.figures());

        return userEntity;
    }
}
