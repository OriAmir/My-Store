export class User {
    constructor(public email: string,
                public password: string,
                public role?:Number,
                public firstName?: string,
                public lastName?: string,
                public products?:string[]
                ) {}
}