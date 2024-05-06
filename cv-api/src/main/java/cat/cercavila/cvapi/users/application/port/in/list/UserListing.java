package cat.cercavila.cvapi.users.application.port.in.list;

import java.util.List;

public record UserListing(String id, String nickname, String name, String firstSurname, String secondSurname, String email, String password, String roles,
                          float coins, String digitalProducts, String activeUserImage, String activeUserImageFrame, String activeUserBackgroundImage,
                          String activeUserTitle, String activeUserBackgroundColour, String activePins) {
}
