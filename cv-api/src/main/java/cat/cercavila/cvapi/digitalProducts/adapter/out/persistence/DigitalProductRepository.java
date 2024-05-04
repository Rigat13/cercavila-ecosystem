package cat.cercavila.cvapi.digitalProducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.DigitalProductListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DigitalProductRepository extends JpaRepository<DigitalProductEntity, Long> {

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)

            from figura f 
            where f.id = :id
        """)
    Optional<DigitalProductListing> getById(@Param("id") String nom);

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)

            from figura f 
            where f.name = :name
        """)
    Optional<DigitalProductListing> getByName(@Param("name") String name);

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)
            from figura f 
            order by f.name
        """)
    List<DigitalProductListing> loadAllFiguresByName();

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)
            from figura f 
            order by f.year
        """)
    List<DigitalProductListing> loadAllFiguresByYear();

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)
            from figura f 
            order by f.type
        """)
    List<DigitalProductListing> loadAllFiguresByType();

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)

                            from figura f
        """)
    List<DigitalProductListing> findAllListing();
}
