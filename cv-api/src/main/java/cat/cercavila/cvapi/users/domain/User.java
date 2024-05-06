package cat.cercavila.cvapi.users.domain;

import java.util.List;
import java.util.UUID;

public class User {
    private String id;
    private String nickname;
    private String name;
    private String firstSurname;
    private String secondSurname;
    private String email;
    private String password;
    private List<String> roles;
    // Inventory
    private float coins;
    private List<String> digitalProducts;
    private String activeUserImage;
    private String activeUserImageFrame;
    private String activeUserBackgroundImage;
    private String activeUserTitle;
    private String activeUserBackgroundColour;
    private List<String> activePins;

    public User() {}

    public User(String nickname, String name, String firstSurname, String secondSurname, String email, String password, List<String> roles, float coins, List<String> digitalProducts, String activeUserImage, String activeUserImageFrame, String activeUserBackgroundImage, String activeUserTitle, String activeUserBackgroundColour, List<String> activePins) {
        this.id = UUID.randomUUID().toString(); // TODO: Note: this is correct for not web applications; but as Colles can be created from the front, the UUID is assigned between the front and the in port of persistence, and does not get to domain.
        this.nickname = nickname;
        this.name = name;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.coins = coins;
        this.digitalProducts = digitalProducts;
        this.activeUserImage = activeUserImage;
        this.activeUserImageFrame = activeUserImageFrame;
        this.activeUserBackgroundImage = activeUserBackgroundImage;
        this.activeUserTitle = activeUserTitle;
        this.activeUserBackgroundColour = activeUserBackgroundColour;
        this.activePins = activePins;
    }

    public String getId() { return id; }
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public String getName() {return name; }
    public void setName(String name) { this.name = name; }
    public String getFirstSurname() { return firstSurname; }
    public void setFirstSurname(String firstSurname) { this.firstSurname = firstSurname; }
    public String getSecondSurname() { return secondSurname; }
    public void setSecondSurname(String secondSurname) { this.secondSurname = secondSurname; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }
    public float getCoins() { return coins; }
    public void setCoins(float coins) { this.coins = coins; }
    public List<String> getDigitalProducts() { return digitalProducts; }
    public void setDigitalProducts(List<String> digitalProducts) { this.digitalProducts = digitalProducts; }
    public String getActiveUserImage() { return activeUserImage; }
    public void setActiveUserImage(String activeUserImage) { this.activeUserImage = activeUserImage; }
    public String getActiveUserImageFrame() { return activeUserImageFrame; }
    public void setActiveUserImageFrame(String activeUserImageFrame) { this.activeUserImageFrame = activeUserImageFrame; }
    public String getActiveUserBackgroundImage() { return activeUserBackgroundImage; }
    public void setActiveUserBackgroundImage(String activeUserBackgroundImage) { this.activeUserBackgroundImage = activeUserBackgroundImage; }
    public String getActiveUserTitle() { return activeUserTitle; }
    public void setActiveUserTitle(String activeUserTitle) { this.activeUserTitle = activeUserTitle; }
    public String getActiveUserBackgroundColour() { return activeUserBackgroundColour; }
    public void setActiveUserBackgroundColour(String activeUserBackgroundColour) { this.activeUserBackgroundColour = activeUserBackgroundColour; }
    public List<String> getActivePins() { return activePins; }
    public void setActivePins(List<String> activePins) { this.activePins = activePins; }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id +
                ", nickname='" + nickname + '\'' +
                ", name='" + name + '\'' +
                ", firstSurname='" + firstSurname + '\'' +
                ", secondSurname='" + secondSurname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                ", coins='" + coins + '\'' +
                ", digitalProducts=" + digitalProducts +
                ", activeUserImage='" + activeUserImage + '\'' +
                ", activeUserImageFrame='" + activeUserImageFrame + '\'' +
                ", activeUserBackgroundImage='" + activeUserBackgroundImage + '\'' +
                ", activeUserTitle='" + activeUserTitle + '\'' +
                ", activeUserBackgroundColour='" + activeUserBackgroundColour + '\'' +
                ", activePins=" + activePins +
                '}';
    }
}