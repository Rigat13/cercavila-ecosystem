package cat.cercavila.cvapi.users.adapter.out.persistence;

import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {


    boolean existsByNickname(String nickname); // Automatically implemented by Spring with naming

    @Query("""
            select case when count(u) > 0 then true else false end
            from user u
            where u.nickname = :nickname and not u.id = :id
        """)
    boolean existsByNicknameNotOtherId(String nickname, String id);

    @Query("""
            select new cat.cercavila.cvapi.users.application.port.in.list.UserListing(
                            u.id, u.nickname, u.name, u.firstSurname, u.secondSurname, u.email, u.password, u.roles, 
                            u.coins, u.digitalProducts, u.activeUserImage, u.activeUserImageFrame, u.activeUserBackgroundImage, 
                            u.activeUserTitle, u.activeUserBackgroundColour, u.activePins)
            from user u
            where u.id = :id
        """)
    Optional<UserListing> getById(@Param("id") String id);

    @Query("""
            select new cat.cercavila.cvapi.users.application.port.in.list.UserListing(
                            u.id, u.nickname, u.name, u.firstSurname, u.secondSurname, u.email, u.password, u.roles, 
                            u.coins, u.digitalProducts, u.activeUserImage, u.activeUserImageFrame, u.activeUserBackgroundImage, 
                            u.activeUserTitle, u.activeUserBackgroundColour, u.activePins)
            from user u
            where u.nickname = :nickname
        """)
    Optional<UserListing> getByNickname(@Param("nickname") String nickname);

    @Query("""
            select new cat.cercavila.cvapi.users.application.port.in.list.UserListing(
                            u.id, u.nickname, u.name, u.firstSurname, u.secondSurname, u.email, u.password, u.roles, 
                            u.coins, u.digitalProducts, u.activeUserImage, u.activeUserImageFrame, u.activeUserBackgroundImage, 
                            u.activeUserTitle, u.activeUserBackgroundColour, u.activePins)
            from user u
            order by u.nickname
        """)
    List<UserListing> loadAllUsersByNickname();

    @Query("""
            select new cat.cercavila.cvapi.users.application.port.in.list.UserListing(
                            u.id, u.nickname, u.name, u.firstSurname, u.secondSurname, u.email, u.password, u.roles, 
                            u.coins, u.digitalProducts, u.activeUserImage, u.activeUserImageFrame, u.activeUserBackgroundImage, 
                            u.activeUserTitle, u.activeUserBackgroundColour, u.activePins)
            from user u
        """)
    List<UserListing> findAllListing();

    @Query("""
            select u.nickname
            from user u
        """)
    List<String> loadAllUserNicknames();
}
