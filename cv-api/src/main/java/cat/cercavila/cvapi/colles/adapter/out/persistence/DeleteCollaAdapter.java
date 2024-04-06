package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.application.port.in.delete.DeleteCollaCommand;
import cat.cercavila.cvapi.colles.application.port.out.DeleteCollaPort;
import org.springframework.stereotype.Component;

@Component
public class DeleteCollaAdapter implements DeleteCollaPort {
    private final CollaRepository collaRepository;

    public DeleteCollaAdapter(CollaRepository collaRepository) { this.collaRepository = collaRepository; }

    @Override
    public void deleteColla(DeleteCollaCommand deleteCollaCommand) {
        collaRepository.delete(deleteCollaCommand2CollaEntity(deleteCollaCommand));
    }

    private CollaEntity deleteCollaCommand2CollaEntity(DeleteCollaCommand deleteCollaCommand) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(deleteCollaCommand.id()); // IMPORTANT: Here, an existing ID is used to delete the Colla
        // The other fields are not necessary for the deletion
        return collaEntity;
    }
}
