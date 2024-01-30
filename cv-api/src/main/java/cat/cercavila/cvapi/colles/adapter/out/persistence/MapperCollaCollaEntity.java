package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.domain.Colla;

public class MapperCollaCollaEntity {
    public static Colla collaEntityToColla(CollaEntity collaEntity) {
        Colla colla = new Colla(collaEntity.getName(), collaEntity.getEntity(), collaEntity.getFoundationYear());
        // NOTE: Created from zero, with new ID.
        return colla;
    }

    public static CollaEntity collaToCollaEntity(Colla colla) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(colla.getId());
        collaEntity.setName(colla.getName());
        collaEntity.setEntity(colla.getEntity());
        collaEntity.setFoundationYear(colla.getFoundationYear());

        return collaEntity;
    }
}
