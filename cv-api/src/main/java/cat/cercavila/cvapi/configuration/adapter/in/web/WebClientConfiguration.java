package cat.cercavila.cvapi.configuration.adapter.in.web;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfiguration {
    @Bean
    public WebClient createWebClient() { return WebClient.create("http://81.25.126.202:8080/api"); }
    // LOCALHOST ALTERNATIVE
    //public WebClient createWebClient() { return WebClient.create("http://localhost/api"); }
}
