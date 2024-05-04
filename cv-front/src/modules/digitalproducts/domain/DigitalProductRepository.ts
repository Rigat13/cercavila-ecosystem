import {DigitalProduct} from './DigitalProduct';

export interface DigitalProductRepository {
    storeDigitalProduct: (digitalProducts: DigitalProduct) => Promise<void>;
    getDigitalProductById:(id: string) => Promise<DigitalProduct | null>;
    getDigitalProductByName:(name: string) => Promise<DigitalProduct | null>;
    getAllDigitalProductsByName:() => Promise<DigitalProduct[]>;
    getAllDigitalProductsByPrice:() => Promise<DigitalProduct[]>;
    getAllDigitalProductsByType:() => Promise<DigitalProduct[]>;
    getAllDigitalProducts:() => Promise<DigitalProduct[]>;
    getAllDigitalProductsNoImage:() => Promise<DigitalProduct[]>;
    updateDigitalProduct:(digitalProducts: DigitalProduct) => Promise<void>;
    deleteDigitalProduct:(id: string) => Promise<void>;
}