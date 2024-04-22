package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CollaRepository extends JpaRepository<CollaEntity, Long> {

    @Query("""
            select new cat.cercavila.cvapi.colles.application.port.in.list.CollaListing(
                            c.id, c.name, c.entity, c.foundationYear, c.description, c.type, c.neighbourhood, c.primaryColour, c.secondaryColour, c.logoKey, c.music, c.email, c.instagram)

            from colla c 
            where c.id = :id
        """)
    Optional<CollaListing> getById(@Param("id") String nom);

    @Query("""
            select new cat.cercavila.cvapi.colles.application.port.in.list.CollaListing(
                            c.id, c.name, c.entity, c.foundationYear, c.description, c.type, c.neighbourhood, c.primaryColour, c.secondaryColour, c.logoKey, c.music, c.email, c.instagram)

            from colla c 
            where c.name = :name
        """)
    Optional<CollaListing> getByName(@Param("name") String name);

    @Query("""
            select new cat.cercavila.cvapi.colles.application.port.in.list.CollaListing(
                            c.id, c.name, c.entity, c.foundationYear, c.description, c.type, c.neighbourhood, c.primaryColour, c.secondaryColour, c.logoKey, c.music, c.email, c.instagram)
            from colla c 
            order by c.name
        """)
    List<CollaListing> loadAllCollesByName();

    @Query("""
            select new cat.cercavila.cvapi.colles.application.port.in.list.CollaListing(
                            c.id, c.name, c.entity, c.foundationYear, c.description, c.type, c.neighbourhood, c.primaryColour, c.secondaryColour, c.logoKey, c.music, c.email, c.instagram)

            from colla c 
            order by c.foundationYear
        """)
    List<CollaListing> loadAllCollesByFoundationYear();

    @Query("""
            select new cat.cercavila.cvapi.colles.application.port.in.list.CollaListing(
                            c.id, c.name, c.entity, c.foundationYear, c.description, c.type, c.neighbourhood, c.primaryColour, c.secondaryColour, c.logoKey, c.music, c.email, c.instagram)

                            from colla c
        """)
    List<CollaListing> findAllListing();
}
