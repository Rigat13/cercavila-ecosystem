package cat.cercavila.cvapi.activities.adapter.out.persistence;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ActivityRepository extends JpaRepository<ActivityEntity, Long> {

    @Query("""
            select new cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing(
                            a.id, a.question, a.type, a.imageKey, a.correctAnswer, a.firstIncorrectAnswer, a.secondIncorrectAnswer)
            from activity a 
            where a.id = :id
        """)
    Optional<ActivityListing> getById(@Param("id") String nom);

    @Query("""
            select new cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing(
                            a.id, a.question, a.type, a.imageKey, a.correctAnswer, a.firstIncorrectAnswer, a.secondIncorrectAnswer)
            from activity a 
            where a.question = :question
        """)
    Optional<ActivityListing> getByQuestion(@Param("question") String name);

    @Query("""
            select new cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing(
                            a.id, a.question, a.type, a.imageKey, a.correctAnswer, a.firstIncorrectAnswer, a.secondIncorrectAnswer)
            from activity a 
            order by a.question
        """)
    List<ActivityListing> loadAllActivitiesByQuestion();

    @Query("""
            select new cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing(
                            a.id, a.question, a.type, a.imageKey, a.correctAnswer, a.firstIncorrectAnswer, a.secondIncorrectAnswer)
            from activity a 
            order by a.type
        """)
    List<ActivityListing> loadAllActivitiesByType();

    @Query("""
            select new cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing(
                            a.id, a.question, a.type, a.imageKey, a.correctAnswer, a.firstIncorrectAnswer, a.secondIncorrectAnswer)
            from activity a 
        """)
    List<ActivityListing> findAllListing();
}
