package cat.cercavila.cvapi.users.adapter.out.persistence;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity(name = "user")
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;

    @Column(nullable = false, unique = true)  // Ensure nickname is unique
    private String nickname;
    private String name;
    private String firstSurname;
    private String secondSurname;
    private String email;
    private String password;
    private String roles;
    private float coins;
    private String digitalProducts;
    private String activeUserImage;
    private String activeUserImageFrame;
    private String activeUserBackgroundImage;
    private String activeUserTitle;
    private String activeUserBackgroundColour;
    private String activePins;


    public void setId(String id) { this.id = id; }
    public String getId() { return id; }

    public void setNickname(String nickname) { this.nickname = nickname; }
    public String getNickname() { return nickname; }
    public void setName(String name) { this.name = name; }
    public String getName() { return name; }
    public void setFirstSurname(String firstSurname) { this.firstSurname = firstSurname; }
    public String getFirstSurname() { return firstSurname; }
    public void setSecondSurname(String secondSurname) { this.secondSurname = secondSurname; }
    public String getSecondSurname() { return secondSurname; }
    public void setEmail(String email) { this.email = email; }
    public String getEmail() { return email; }
    public void setPassword(String password) { this.password = password; }
    public String getPassword() { return password; }
    public void setRoles(String roles) { this.roles = roles; }
    public String getRoles() { return roles; }
    public void setCoins(float coins) { this.coins = coins; }
    public float getCoins() { return coins; }
    public void setDigitalProducts(String digitalProducts) { this.digitalProducts = digitalProducts; }
    public String getDigitalProducts() { return digitalProducts; }
    public void setActiveUserImage(String activeUserImage) { this.activeUserImage = activeUserImage; }
    public String getActiveUserImage() { return activeUserImage; }
    public void setActiveUserImageFrame(String activeUserImageFrame) { this.activeUserImageFrame = activeUserImageFrame; }
    public String getActiveUserImageFrame() { return activeUserImageFrame; }
    public void setActiveUserBackgroundImage(String activeUserBackgroundImage) { this.activeUserBackgroundImage = activeUserBackgroundImage; }
    public String getActiveUserBackgroundImage() { return activeUserBackgroundImage; }
    public void setActiveUserTitle(String activeUserTitle) { this.activeUserTitle = activeUserTitle; }
    public String getActiveUserTitle() { return activeUserTitle; }
    public void setActiveUserBackgroundColour(String activeUserBackgroundColour) { this.activeUserBackgroundColour = activeUserBackgroundColour; }
    public String getActiveUserBackgroundColour() { return activeUserBackgroundColour; }
    public void setActivePins(String activePins) { this.activePins = activePins; }
    public String getActivePins() { return activePins; }
}
