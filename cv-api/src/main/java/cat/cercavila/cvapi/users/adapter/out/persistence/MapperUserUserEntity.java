package cat.cercavila.cvapi.users.adapter.out.persistence;

import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import cat.cercavila.cvapi.users.domain.User;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class MapperUserUserEntity {
    public static User userEntityToUser(UserEntity userEntity) {
        List<String> roles = stringToListString(userEntity.getRoles());
        List<String> digitalProducts = stringToListString(userEntity.getDigitalProducts());
        List<String> activePins = stringToListString(userEntity.getActivePins());

        User user = new User(userEntity.getNickname(), userEntity.getName(), userEntity.getFirstSurname(), userEntity.getSecondSurname(),
                userEntity.getEmail(), userEntity.getPassword(), roles, userEntity.getCoins(), digitalProducts, userEntity.getActiveUserImage(),
                userEntity.getActiveUserImageFrame(), userEntity.getActiveUserBackgroundImage(),
                userEntity.getActiveUserTitle(), userEntity.getActiveUserBackgroundColour(), activePins);
        // NOTE: Created from zero, with new ID. // TODO Check if this is true
        return user;
    }

    public static UserEntity userToUserEntity(User user) {
        String roles = listStringToString(user.getRoles());
        String digitalProducts = listStringToString(user.getDigitalProducts());
        String activePins = listStringToString(user.getActivePins());

        UserEntity userEntity = new UserEntity();
        userEntity.setId(user.getId());
        userEntity.setNickname(user.getNickname());
        userEntity.setName(user.getName());
        userEntity.setFirstSurname(user.getFirstSurname());
        userEntity.setSecondSurname(user.getSecondSurname());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(user.getPassword());
        userEntity.setRoles(roles);
        userEntity.setCoins(user.getCoins());
        userEntity.setDigitalProducts(digitalProducts);
        userEntity.setActiveUserImage(user.getActiveUserImage());
        userEntity.setActiveUserImageFrame(user.getActiveUserImageFrame());
        userEntity.setActiveUserBackgroundImage(user.getActiveUserBackgroundImage());
        userEntity.setActiveUserTitle(user.getActiveUserTitle());
        userEntity.setActiveUserBackgroundColour(user.getActiveUserBackgroundColour());
        userEntity.setActivePins(activePins);

        return userEntity;
    }

    public static UserEntity userListingToUserEntity(UserListing currentUserListing) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(currentUserListing.id());
        userEntity.setNickname(currentUserListing.nickname());
        userEntity.setName(currentUserListing.name());
        userEntity.setFirstSurname(currentUserListing.firstSurname());
        userEntity.setSecondSurname(currentUserListing.secondSurname());
        userEntity.setEmail(currentUserListing.email());
        userEntity.setPassword(currentUserListing.password());
        userEntity.setRoles(currentUserListing.roles());
        userEntity.setCoins(currentUserListing.coins());
        userEntity.setDigitalProducts(currentUserListing.digitalProducts());
        userEntity.setActiveUserImage(currentUserListing.activeUserImage());
        userEntity.setActiveUserImageFrame(currentUserListing.activeUserImageFrame());
        userEntity.setActiveUserBackgroundImage(currentUserListing.activeUserBackgroundImage());
        userEntity.setActiveUserTitle(currentUserListing.activeUserTitle());
        userEntity.setActiveUserBackgroundColour(currentUserListing.activeUserBackgroundColour());
        userEntity.setActivePins(currentUserListing.activePins());

        return userEntity;
    }

    private static String listStringToString(List<String> list) { return list.stream().collect(Collectors.joining(",")); }
    private static List<String> stringToListString(String string) {
        return Arrays.asList(string.split(","));
    }
}
