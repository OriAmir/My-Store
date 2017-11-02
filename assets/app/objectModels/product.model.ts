export class Product {
    constructor(public name: string,
                public category: string,
                public price: Number,                                
                public description?: string,
                public image?: string) {}
}