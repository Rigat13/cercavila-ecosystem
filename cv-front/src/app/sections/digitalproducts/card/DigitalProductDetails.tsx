import { DigitalProduct } from "@/modules/digitalproducts/domain/DigitalProduct";
import detailsStyles from "@/app/sections/shared/DigitalProductDetails.module.scss";
import React, { useEffect, useState } from "react";
import { base64ToBlob } from "@/app/sections/shared/Utilities";

export function DigitalProductDetails({ digitalProduct }: { digitalProduct: DigitalProduct }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (digitalProduct.image) {
            const blob = base64ToBlob(digitalProduct.image as unknown as string);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [digitalProduct.image]);

    if (!imageUrl && digitalProduct.type != 'digitalProductTypeUserBackgroundColour' && digitalProduct.type != 'digitalProductTypeUserTitle') return null;

    switch (digitalProduct.type) {
        case 'digitalProductTypeUserImage':
            return <a target="_blank" className={detailsStyles.digitalProductDetails__aImage}>
                <div className={detailsStyles.digitalProductDetails__image}>
                    <img src={imageUrl} alt={`Imatge de ${digitalProduct.name}`} />
                </div>
            </a>;
        case 'digitalProductTypeUserImageFrame':
            return <a target="_blank" className={detailsStyles.digitalProductDetails__aImageFrame}>
                <div className={detailsStyles.digitalProductDetails__imageFrame}>
                    <img src={imageUrl} alt={`Imatge de ${digitalProduct.name}`} />
                </div>
            </a>;
        case 'digitalProductTypeUserBackgroundImage':
            return <a target="_blank" className={detailsStyles.digitalProductDetails__aBackgroundImage}>
                <div className={detailsStyles.digitalProductDetails__backgroundImage}>
                    <img src={imageUrl} alt={`Imatge de ${digitalProduct.name}`} />
                </div>
            </a>;
        case 'digitalProductTypeUserTitle':
            return <a target="_blank" className={detailsStyles.digitalProductDetails__aTitle}>
                <div className={detailsStyles.digitalProductDetails__title}
                     style={{ background: digitalProduct.primaryColour, color: digitalProduct.secondaryColour }}>
                    {digitalProduct.name}
                </div>
            </a>;
        case 'digitalProductTypeUserBackgroundColour':
            return <a target="_blank" className={detailsStyles.digitalProductDetails__aBackgroundColour} >
                <div className={detailsStyles.digitalProductDetails__backgroundColour}
                     style={{ background: digitalProduct.primaryColour, color: digitalProduct.secondaryColour }}>
                    Abc
                </div>
            </a>;
        case 'digitalProductTypeSticker':
        case 'digitalProductTypePin':
            let isSpecialEditionMagnet = digitalProduct.name.includes('-E-');
            return <a target="_blank" className={detailsStyles.digitalProductDetails__aSticker}>
                <div className={detailsStyles.digitalProductDetails__sticker}>
                    <img src={imageUrl} alt={`Imatge de ${digitalProduct.name}`} />
                    {isSpecialEditionMagnet && <div className={detailsStyles.digitalProductDetails__goldenShine}></div>}
                </div>
            </a>;
        case 'digitalProductTypePin':
            return <a target="_blank" className={detailsStyles.digitalProductDetails__aPin}>
                <div className={detailsStyles.digitalProductDetails__pin}>
                    <img src={imageUrl} alt={`Imatge de ${digitalProduct.name}`} />
                </div>
            </a>;
        default:
            return null;
    }
}
