package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;
import cat.cercavila.cvapi.colles.domain.Colla;

public class MapperCollaCollaEntity {
    public static Colla collaEntityToColla(CollaEntity collaEntity) {
        Colla colla = new Colla(collaEntity.getName(), collaEntity.getEntity(), collaEntity.getFoundationYear(), collaEntity.getDescription(), collaEntity.getType(), collaEntity.getNeighbourhood(),
                collaEntity.getPrimaryColour(), collaEntity.getSecondaryColour(), collaEntity.getLogoKey(), collaEntity.getMusic(), collaEntity.getEmail(), collaEntity.getInstagram(), collaEntity.getFigures());
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
        collaEntity.setLogoKey(colla.getLogoKey());
        collaEntity.setMusic(colla.getMusic());
        collaEntity.setEmail(colla.getEmail());
        collaEntity.setInstagram(colla.getInstagram());
        collaEntity.setFigures(colla.getFigures());

        return collaEntity;
    }

    public static CollaEntity collaListingToCollaEntity(CollaListing currentCollaListing) {
        CollaEntity collaEntity = new CollaEntity();
        collaEntity.setId(currentCollaListing.id());
        collaEntity.setName(currentCollaListing.name());
        collaEntity.setEntity(currentCollaListing.entity());
        collaEntity.setFoundationYear(currentCollaListing.foundationYear());
        collaEntity.setDescription(currentCollaListing.description());
        collaEntity.setType(currentCollaListing.type());
        collaEntity.setNeighbourhood(currentCollaListing.neighbourhood());
        collaEntity.setPrimaryColour(currentCollaListing.primaryColour());
        collaEntity.setSecondaryColour(currentCollaListing.secondaryColour());
        collaEntity.setLogoKey(currentCollaListing.logoKey());
        collaEntity.setMusic(currentCollaListing.music());
        collaEntity.setEmail(currentCollaListing.email());
        collaEntity.setInstagram(currentCollaListing.instagram());
        collaEntity.setFigures(currentCollaListing.figures());

        return collaEntity;
    }
}
