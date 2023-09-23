export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}

export interface AuthenticateRequest {
    usernameOrEmail: string;
    password: string;
}

export interface AuthenticateDetail {
    id: string;
    email: string;
    username: string;
    token: string;
}