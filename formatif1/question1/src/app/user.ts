export class User {
    constructor(
        public username:string,
        public prefercat: boolean = true
    ) { }
}

export const USERS: User[] = [
    new User("normalCatLover"),
    new User("badPerson",false)
]
