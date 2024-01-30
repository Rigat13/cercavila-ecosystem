package cat.cercavila.cvapi.colles.application.port.in.list;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.util.List;

public interface ListColles {
    CollaListing getCollaById(String id);
    CollaListing getCollaByName(String name);
    List<CollaListing> getAllCollesByName();
    List<CollaListing> getAllCollesByFoundationYear();
    List<CollaListing> getAllColles();
}
