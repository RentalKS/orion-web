export type BaseEntity = {
    id: string;
    createdAt: number;
};

export type Entity<T> = {
    [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
    firstName: string;
    lastName: string;
    email: string;
}>;

export type AuthResponse = {
    token: string;
    refreshToken: string;
};

export interface CustomerResponse {
    status:number;
    code: string;
    data: {
        page: number;
        size: number;
        totalPages:number;
        totalSize: number;
        data: Customer[];
    }
}

export interface Customer {
    id: number;
    name: string;
    lastName: string | null;
    email: string;
    phoneNumber: string;
    licenseNumber: string | null;
    contactAgent: string | null;
    rentals: any;
    createdAt:number;
}

export interface Location {
    id: number;
    tables: string | null;
    address: string;
    city: string | null;
    zipCode: string | null;
    country: string;
    state: string;
}

export interface LocationResponse {
    status:number;
    code: string;
    data: {
        page: number;
        size: number;
        totalPages:number;
        totalSize: number;
        data: Location[];
    }
}

