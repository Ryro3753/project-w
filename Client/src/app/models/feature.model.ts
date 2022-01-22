export interface Feature{
    Section: string;
    Type: string;
    Value: string;
    Note: string;
    Requirements: Requirement[] | null;
}

export interface Requirement{
    Section: string;
    Type: string;
    Value: string;
}
