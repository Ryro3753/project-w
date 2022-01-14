export interface Feature{
    Section: string;
    Type: string;
    Value: string;
    Requirements: Requirement[] | null;
}

export interface Requirement{
    Section: string;
    Type: string;
    Value: string;
}
