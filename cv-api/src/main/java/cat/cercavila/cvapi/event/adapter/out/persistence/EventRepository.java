package cat.cercavila.cvapi.event.adapter.out.persistence;

import cat.cercavila.cvapi.event.application.port.in.list.EventListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<EventEntity, Long> {

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.EventListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from event p
            where p.id = :id
        """)
    Optional<EventListing> getById(@Param("id") String nom);

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.EventListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from event p
            where p.name = :name
        """)
    Optional<EventListing> getByName(@Param("name") String name);

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.EventListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from event p
            order by p.name
        """)
    List<EventListing> loadAllEventsByName();

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.EventListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from event p
            order by p.price
        """)
    List<EventListing> loadAllEventsByPrice();

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.EventListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from event p
            order by p.type
        """)
    List<EventListing> loadAllEventsByType();

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.EventListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from event p
        """)
    List<EventListing> findAllListing();
}
