package cat.cercavila.cvapi.digitalProducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.FiguraListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FiguraRepository extends JpaRepository<FiguraEntity, Long> {

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)

            from figura f 
            where f.id = :id
        """)
    Optional<FiguraListing> getById(@Param("id") String nom);

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)

            from figura f 
            where f.name = :name
        """)
    Optional<FiguraListing> getByName(@Param("name") String name);

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)
            from figura f 
            order by f.name
        """)
    List<FiguraListing> loadAllFiguresByName();

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)
            from figura f 
            order by f.year
        """)
    List<FiguraListing> loadAllFiguresByYear();

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)
            from figura f 
            order by f.type
        """)
    List<FiguraListing> loadAllFiguresByType();

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)

                            from figura f
        """)
    List<FiguraListing> findAllListing();
}
