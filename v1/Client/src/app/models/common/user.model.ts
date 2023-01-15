export interface User {
    Id: string;
    Email: string;
    Username: string;
    CreatedDate: Date;
    LastActive: Date;
    HasImage: boolean;
    Token?: string;
}

export interface RegisterRequest{
    Email: string;
    Username: string;
    Password: string;
}
