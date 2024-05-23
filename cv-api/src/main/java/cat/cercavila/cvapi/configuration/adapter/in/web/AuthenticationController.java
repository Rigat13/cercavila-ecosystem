package cat.cercavila.cvapi.configuration.adapter.in.web;

import cat.cercavila.cvapi.configuration.security.jwt.AuthenticationRequest;
import cat.cercavila.cvapi.configuration.security.jwt.AuthenticationResponse;
import cat.cercavila.cvapi.configuration.security.jwt.JwtTokenUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws AuthenticationException {
        logger.info("Starting login");

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUsername(), authenticationRequest.getPassword()
        );
        try {
            logger.info("Trying to authenticate");
            //Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken); TODO?
        } catch (AuthenticationException e) {
            logger.error("Error authenticating", e);
            throw e;
        }
        logger.info("Continuing login");
        UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        String jwt = jwtTokenUtil.generateToken(userDetails);
        logger.info("Finishing login");
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
