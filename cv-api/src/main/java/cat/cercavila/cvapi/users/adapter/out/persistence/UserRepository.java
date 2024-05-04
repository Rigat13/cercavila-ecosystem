package cat.cercavila.cvapi.users.adapter.out.persistence;

import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query("""
            select new cat.cercavila.cvapi.colles.application.port.in.list.CollaListing(
                            c.id, c.name, c.entity, c.foundationYear, c.description, c.type, c.neighbourhood, c.primaryColour, c.secondaryColour, c.logoKey, c.music, c.email, c.instagram, c.figures)

            from user c 
            where c.id = :id
        """)
    Optional<UserListing> getById(@Param("id") String nom);

    @Query("""
            select new cat.cercavila.cvapi.colles.application.port.in.list.CollaListing(
                            c.id, c.name, c.entity, c.foundationYear, c.description, c.type, c.neighbourhood, c.primaryColour, c.secondaryColour, c.logoKey, c.music, c.email, c.instagram, c.figures)

            from user c 
            where c.name = :name
        """)
    Optional<UserListing> getByName(@Param("name") String name);

    @Query("""
            select new cat.cercavila.cvapi.colles.application.port.in.list.CollaListing(
                            c.id, c.name, c.entity, c.foundationYear, c.description, c.type, c.neighbourhood, c.primaryColour, c.secondaryColour, c.logoKey, c.music, c.email, c.instagram, c.figures)
            from user c 
            order by c.name
        """)
    List<UserListing> loadAllCollesByName();

    @Query("""
            select new cat.cercavila.cvapi.colles.application.port.in.list.CollaListing(
                            c.id, c.name, c.entity, c.foundationYear, c.description, c.type, c.neighbourhood, c.primaryColour, c.secondaryColour, c.logoKey, c.music, c.email, c.instagram, c.figures)

            from user c 
            order by c.foundationYear
        """)
    List<UserListing> loadAllCollesByFoundationYear();

    @Query("""
            select new cat.cercavila.cvapi.colles.application.port.in.list.CollaListing(
                            c.id, c.name, c.entity, c.foundationYear, c.description, c.type, c.neighbourhood, c.primaryColour, c.secondaryColour, c.logoKey, c.music, c.email, c.instagram, c.figures)

                            from user c
        """)
    List<UserListing> findAllListing();
}
