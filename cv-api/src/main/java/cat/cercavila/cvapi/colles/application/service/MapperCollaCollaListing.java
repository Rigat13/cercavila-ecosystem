package cat.cercavila.cvapi.colles.application.service;

import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;
import cat.cercavila.cvapi.colles.domain.Colla;

public class MapperCollaCollaListing {
    public static Colla collaListingToColla (CollaListing collaListing) {
        Colla colla = new Colla(collaListing.name(), collaListing.entity(), collaListing.foundationYear(), collaListing.description(), collaListing.type(), collaListing.neighbourhood(), collaListing.logoKey());
        // NOTE: We don't set the id because it is autogenerated by the database
        return colla;
    }

    public static CollaListing collaToCollaListing (Colla colla) {
        CollaListing collaListing = new CollaListing(colla.getId(), colla.getName(), colla.getEntity(), colla.getFoundationYear(), colla.getDescription(), colla.getType(), colla.getNeighbourhood(), colla.getLogoKey());
        return collaListing;
    }
}