package cat.cercavila.cvapi.configuration.security;

import cat.cercavila.cvapi.configuration.security.persistence.UserLab;
import cat.cercavila.cvapi.configuration.security.persistence.UserLabRepository;
import javax.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CercavilaUserDetailsService implements UserDetailsService {
    private UserLabRepository userLabRepository;
    public CercavilaUserDetailsService(UserLabRepository userLabRepository) { this.userLabRepository = userLabRepository; }
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserLab user = userLabRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuari no trobat amb el correu: " + username));
        return CercavilaUserDetails.build(user);
    }
}
