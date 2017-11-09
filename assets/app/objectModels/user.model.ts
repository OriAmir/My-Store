export class User {
    constructor(
                public firstName: string,
                public lastName: string,
                public password: string,
                public email: string,
                public products:string[],
                public role:Number,
                public registered: Boolean,
                public randomKey:string
                ) {}
}
