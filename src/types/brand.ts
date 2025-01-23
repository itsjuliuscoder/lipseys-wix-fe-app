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
  stock: { inventoryStatus: string };
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