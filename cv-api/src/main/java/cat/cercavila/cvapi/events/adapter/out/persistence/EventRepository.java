package cat.cercavila.cvapi.events.adapter.out.persistence;

import cat.cercavila.cvapi.events.application.port.in.list.EventListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<EventEntity, Long> {

    @Query("""
            select new cat.cercavila.cvapi.events.application.port.in.list.EventListing(
                            e.id, e.name, e.description, e.imageKey, e.primaryColour, e.secondaryColour, e.type,
                            e.startDate, e.endDate, e.cercatrivies, e.firstCoinsReward, e.firstDigitalProductsReward,
                            e.secondCoinsReward, e.secondDigitalProductsReward, e.thirdCoinsReward, e.thirdDigitalProductsReward,
                            e.fourthTenthCoinsReward, e.fourthTenthDigitalProductsReward, e.allCoinsReward, e.allDigitalProductsReward)

            from event e
            where e.id = :id
        """)
    Optional<EventListing> getById(@Param("id") String nom);

    @Query("""
            select new cat.cercavila.cvapi.events.application.port.in.list.EventListing(
                            e.id, e.name, e.description, e.imageKey, e.primaryColour, e.secondaryColour, e.type,
                            e.startDate, e.endDate, e.cercatrivies, e.firstCoinsReward, e.firstDigitalProductsReward,
                            e.secondCoinsReward, e.secondDigitalProductsReward, e.thirdCoinsReward, e.thirdDigitalProductsReward,
                            e.fourthTenthCoinsReward, e.fourthTenthDigitalProductsReward, e.allCoinsReward, e.allDigitalProductsReward)

            from event e
            where e.name = :name
        """)
    Optional<EventListing> getByName(@Param("name") String name);

    @Query("""
            select new cat.cercavila.cvapi.events.application.port.in.list.EventListing(
                            e.id, e.name, e.description, e.imageKey, e.primaryColour, e.secondaryColour, e.type,
                            e.startDate, e.endDate, e.cercatrivies, e.firstCoinsReward, e.firstDigitalProductsReward,
                            e.secondCoinsReward, e.secondDigitalProductsReward, e.thirdCoinsReward, e.thirdDigitalProductsReward,
                            e.fourthTenthCoinsReward, e.fourthTenthDigitalProductsReward, e.allCoinsReward, e.allDigitalProductsReward)

            from event e
            order by e.name
        """)
    List<EventListing> loadAllEventsByName();



    @Query("""
            select new cat.cercavila.cvapi.events.application.port.in.list.EventListing(
                            e.id, e.name, e.description, e.imageKey, e.primaryColour, e.secondaryColour, e.type,
                            e.startDate, e.endDate, e.cercatrivies, e.firstCoinsReward, e.firstDigitalProductsReward,
                            e.secondCoinsReward, e.secondDigitalProductsReward, e.thirdCoinsReward, e.thirdDigitalProductsReward,
                            e.fourthTenthCoinsReward, e.fourthTenthDigitalProductsReward, e.allCoinsReward, e.allDigitalProductsReward)

            from event e
            order by e.type
        """)
    List<EventListing> loadAllEventsByType();

    @Query("""
            select new cat.cercavila.cvapi.events.application.port.in.list.EventListing(
                            e.id, e.name, e.description, e.imageKey, e.primaryColour, e.secondaryColour, e.type,
                            e.startDate, e.endDate, e.cercatrivies, e.firstCoinsReward, e.firstDigitalProductsReward,
                            e.secondCoinsReward, e.secondDigitalProductsReward, e.thirdCoinsReward, e.thirdDigitalProductsReward,
                            e.fourthTenthCoinsReward, e.fourthTenthDigitalProductsReward, e.allCoinsReward, e.allDigitalProductsReward)

            from event e
        """)
    List<EventListing> findAllListing();
}
