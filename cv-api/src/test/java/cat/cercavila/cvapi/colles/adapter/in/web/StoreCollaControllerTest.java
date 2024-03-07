package cat.cercavila.cvapi.colles.adapter.in.web;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaUseCase;
import org.apache.catalina.security.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.mockito.BDDMockito.then;

@Import(SecurityConfig.class)
@WebMvcTest(controllers = StoreCollaController.class)
public class StoreCollaControllerTest {
    @Autowired
    private MockMvc mockMvc;
    private String mockId = "1";
    private String mockName = "Colla de prova";
    private String mockEntity = "Entitat de prova";
    private int mockFoundationYear = 2021;

    @MockBean
    private CreateCollaUseCase createCollaUseCase;

    @Test
    public void testStoreColla() throws Exception {
        // Generate a simulated JWT token
        String simulatedJwtToken = createJwtToken("testuser", Arrays.asList("ROLE_USER"));

        CreateCollaCommand createCollaCommand = new CreateCollaCommand(mockId, mockName, mockEntity, mockFoundationYear);
        String jsonRequest = objectMapper.writeValueAsString(createCollaCommand);

        mockMvc.perform(post("/api/colles")
                        .header("Content-Type", "application/json")
                        .header("Authorization", "Bearer " + simulatedJwtToken)
                        .content(jsonRequest))
                .andExpect(status().isOk());

        then(createCollaUseCase).should().createColla(eq(createCollaCommand));
    }

    String createJwtToken(String username, List<String> roles) {
        // Create a JWT token using your preferred library
        // Set the necessary claims, such as username, roles, expiration, etc.
        // Return the generated token
    }
}
