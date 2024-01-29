package cat.cercavila.cvapi.configuration.security.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserLabRepository extends JpaRepository<UserLab, Long> {
    Optional<UserLab> findByEmail(String email);
}
