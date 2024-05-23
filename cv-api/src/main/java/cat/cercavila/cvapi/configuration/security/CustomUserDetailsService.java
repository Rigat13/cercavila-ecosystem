package cat.cercavila.cvapi.configuration.security;

import cat.cercavila.cvapi.users.adapter.out.persistence.UserRepository;
import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    protected final Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Loading by username");
        Optional<UserListing> user = userRepository.getByNickname(username);
        logger.info("User loaded: " + user.toString());
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.get().nickname(), user.get().password(), new ArrayList<>());
    }
}
