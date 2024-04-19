package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.domain.Colla;

public class MapperCollaCollaEntity {
    public static Colla collaEntityToColla(CollaEntity collaEntity) {
        Colla colla = new Colla(collaEntity.getName(), collaEntity.getEntity(), collaEntity.getFoundationYear(), collaEntity.getDescription(), collaEntity.getType(), collaEntity.getNeighbourhood(), collaEntity.getPrimaryColour(), collaEntity.getSecondaryColour());
        // NOTE: Created from zero, with new ID. // TODO Check if this is true
        return colla;
    }

    public static CollaEntity collaToCollaEntity(Colla colla) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(colla.getId());
        collaEntity.setName(colla.getName());
        collaEntity.setEntity(colla.getEntity());
        collaEntity.setFoundationYear(colla.getFoundationYear());
        collaEntity.setDescription(colla.getDescription());
        collaEntity.setType(colla.getType());
        collaEntity.setNeighbourhood(colla.getNeighbourhood());
        collaEntity.setPrimaryColour(colla.getPrimaryColour());
        collaEntity.setSecondaryColour(colla.getSecondaryColour());

        return collaEntity;
    }
}
