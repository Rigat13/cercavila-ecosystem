package cat.cercavila.cvapi.digitalproducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalproducts.application.port.in.list.DigitalProductListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DigitalProductRepository extends JpaRepository<DigitalProductEntity, Long> {

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.DigitalProductListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from digitalProduct p
            where p.id = :id
        """)
    Optional<DigitalProductListing> getById(@Param("id") String nom);

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.DigitalProductListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from digitalProduct p
            where p.name = :name
        """)
    Optional<DigitalProductListing> getByName(@Param("name") String name);

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.DigitalProductListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from digitalProduct p
            order by p.name
        """)
    List<DigitalProductListing> loadAllDigitalProductsByName();

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.DigitalProductListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from digitalProduct p
            order by p.price
        """)
    List<DigitalProductListing> loadAllDigitalProductsByPrice();

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.DigitalProductListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from digitalProduct p
            order by p.type
        """)
    List<DigitalProductListing> loadAllDigitalProductsByType();

    @Query("""
            select new cat.cercavila.cvapi.digitalproducts.application.port.in.list.DigitalProductListing(
                            p.id, p.name, p.description, p.imageKey, p.primaryColour, p.secondaryColour, p.price, p.type)

            from digitalProduct p
        """)
    List<DigitalProductListing> findAllListing();
}
