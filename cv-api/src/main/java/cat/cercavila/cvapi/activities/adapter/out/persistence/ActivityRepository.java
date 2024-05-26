package cat.cercavila.cvapi.activities.adapter.out.persistence;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ActivityRepository extends JpaRepository<ActivityEntity, Long> {

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)

            from activity f 
            where f.id = :id
        """)
    Optional<ActivityListing> getById(@Param("id") String nom);

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)

            from activity f 
            where f.name = :name
        """)
    Optional<ActivityListing> getByName(@Param("name") String name);

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)
            from activity f 
            order by f.name
        """)
    List<ActivityListing> loadAllFiguresByName();

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)
            from activity f 
            order by f.year
        """)
    List<ActivityListing> loadAllFiguresByYear();

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)
            from activity f 
            order by f.type
        """)
    List<ActivityListing> loadAllFiguresByType();

    @Query("""
            select new cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing(
                            f.id, f.name, f.year, f.type, f.imageKey, f.webUrl)

                            from activity f
        """)
    List<ActivityListing> findAllListing();
}
