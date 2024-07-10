package cat.cercavila.cvapi.configuration.adapter.in.web;

import cat.cercavila.cvapi.configuration.security.jwt.AuthenticationRequest;
import cat.cercavila.cvapi.configuration.security.jwt.AuthenticationResponse;
import cat.cercavila.cvapi.configuration.security.jwt.JwtTokenUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    protected final Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
        logger.info("Starting login");

        try {
            logger.info("Loading user details");
            UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
            logger.info("User details loaded");

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()
            );

            logger.info("Trying to authenticate");
            authenticationManager.authenticate(authenticationToken);
            logger.info("Authenticated successfully");

            String jwt = jwtTokenUtil.generateToken(userDetails);
            logger.info("Finishing login");
            return ResponseEntity.ok(new AuthenticationResponse(jwt));

        } catch (UsernameNotFoundException e) {
            logger.error("User not found", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        } catch (BadCredentialsException e) {
            logger.error("Invalid credentials", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");

        } catch (AuthenticationException e) {
            logger.error("Authentication failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Authentication failed");
        }
    }
}
