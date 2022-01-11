export interface User {
    Id: string;
    Email: string;
    Username: string;
    CreatedDate: Date;
    LastActive: Date;
    HasImage: boolean;
    token?: string;
}

export interface Logged {
    id: string;
    email: string;
    
}