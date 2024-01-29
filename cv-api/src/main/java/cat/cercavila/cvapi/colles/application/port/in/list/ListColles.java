package cat.cercavila.cvapi.colles.application.port.in.list;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
@SpringBootApplication(scanBasePackages = {"cat.cercavila.cvapi.colles"})

public interface ListColles {
    List<CollaListing> getAllColles();
    CollaListing getCollaById(String id);
    CollaListing getCollaByName(String name);
}
