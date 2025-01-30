export type BRAND = {
  sku: string;
  name: string;
  price: { 
    price: number; 
    currency: string; 
    discountedPrice: number; 
    formatted: { 
      price: string; 
      discountedPrice: string; 
    }; 
  };
  stock: { 
    trackInventory: boolean;
    quantity: number;
    inStock: boolean;
    inventoryStatus: string;
  };
  media: { 
    mainMedia: { 
      image: { 
        url: string; 
        width: number; 
        height: number 
      } 
    } 
  };
};