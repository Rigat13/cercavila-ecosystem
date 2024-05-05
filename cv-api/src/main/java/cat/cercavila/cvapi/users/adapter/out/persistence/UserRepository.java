package cat.cercavila.cvapi.users.adapter.out.persistence;

import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

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
            where c.name = :name
        """)
    Optional<UserListing> getByName(@Param("name") String name);

    @Query("""
            select new cat.cercavila.cvapi.users.application.port.in.list.UserListing(
                            u.id, u.nickname, u.name, u.firstSurname, u.secondSurname, u.email, u.password, u.roles, 
                            u.coins, u.digitalProducts, u.activeUserImage, u.activeUserImageFrame, u.activeUserBackgroundImage, 
                            u.activeUserTitle, u.activeUserBackgroundColour, u.activePins)
            from user u
            order by c.name
        """)
    List<UserListing> loadAllCollesByName();

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
