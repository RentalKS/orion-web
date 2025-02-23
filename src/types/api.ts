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

export interface Company{
    id: number;
    name: string;
    address: string;
    email: string;
    city: string;
    state: string;
    logo: string | null;
    userId: string;
}
export interface CompanyResponse {
    status:number;
    code: string;
    data: CompanyResponseData[];
}

export interface CompanyResponseData{
    id: number;
    createdAt: number;
    createdBy: string;
    name: string;
    address: string;
    email: string;
    phone: string | null;
    logoUrl: string | null;
    zipCode: string | null;
    city: string;
    state: string;
    userId: number;
    categories: Category[];
}

export interface Category{
    id: number;
    categoryName: string;
    categoryDescription: string;
    companyId: number;
}

export interface CategoryResponse{
    status:number;
    code: string;
    data:CategoryResponseData[];
}
export interface CategoryResponseData{
    id: number;
    categoryName: string;
    categoryDescription: string;
    companyId: number;
}
export interface Section{
    id: number;
    sectionName: string;
    sectionDescription: string;
    categoryId:number;
    sectionImage: string | null;

}
export interface SectionResponse{
    status:number;
    code: string;
    data: SectionResponseData[];
}
export interface SectionResponseData{
    id: number;
    createdAt: number;
    sectionName: string;
    sectionDescription: string;
    sectionImageUrl: string | null;
    categoryId: number;
    vehicleList?: VehicleResponseData[] | null;
}

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

export interface Model{
    id: number;
    name: string;
    brandId: number;
    type: string;
    seatingCapacity: number;
    fuelEfficiency: string;
    year: string | null;
    modelImageUrl: string | null;
    createdAt:number;
    vehicles?: Vehicle[];
}

export interface ModelResponse{
    status:number;
    code: string;
    data: {
        page: number;
        size: number;
        totalPages:number;
        totalSize: number;
        data: Model[];
    }
}
export interface Brand {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    modelDtoList?: Model[];
    createdAt?:number;
}

export interface BrandResponse {
    status:number;
    code: string;
    data: Brand[];
}

export interface RateDate {
    id:number;
    name:string;
    dailyRate:number;
    weeklyRate:number;
    monthlyRate:number;
}
export interface RateDateResponse {
    status:number;
    code: string;
    data: RateDate[];
}

export interface Vehicle{
    id: number;
    registrationNumber: string;
    modelId: number;
    year: string;
    fuelType: string;
    mileage: number;
    transmission: string;
    color: string;
    description: string | null;
    locationId: number;
    rateId: number;
    sectionId: number;
    insurancePolicy: InsurancePolicy;
    image: string | null;
}

export interface InsurancePolicy{
    id: number;
    policyNumber: string;
    providerName: string;
    coverageDetails: string | null;
}

export interface VehicleResponse {
    status:number;
    code: string;
    data: {
        page: number;
        size: number;
        totalPages:number;
        totalSize: number;
        data: VehicleResponseData[];
    }
}

export interface VehicleResponseData {
    id: number;
    locationId: number;
    rateId: number;
    contractVehicleNumber: string | null;
    sectionId: number;
    registrationNumber: string;
    year: string;
    fuelType: string;
    mileage: number;
    transmission: string;
    color: string;
    description: string | null;
    vehicleStatus: string;
    insuranceId: number;
    imageUrl: string | null;
    model: Model;
}

export interface Reservation {
    id: number;
    vehicleId: number;
    startDate: number;
    endDate: number;
}

export interface ReservationResponse {
    status:number;
    code: string;
    data: {
        page: number;
        size: number;
        totalPages:number;
        totalSize: number;
        data: ReservationResponseData[];
    }
}

export interface ReservationResponseData {
    id: number;
    startDate: number;
    endDate: number;
    bookingStatus: string;
    status: string;
    vehicleId: number;
    fullName: string;
    createdAt: string | null;
    contractVehicleNumber: string;
}
export interface ReservationDetails{
    status:number;
    code: string;
    data: ReservationDetailsData|null;
}

export interface ReservationDetailsData {
    id:number;
    startDate: number;
    endDate: number;
    status: string;
    totalCost: number;
    vehicleId: number;
    totalDays: number;
    vehicleStatus: string;
    vehicleContractNumber: string | null;
    customerDetails: Customer;
    signature: string | null;
}

export interface ProcessPayment{
    id: number;
    rentalId: number;
    paymentMethod: string;
}

export interface AcceptPayment{
    id:number;
    token?:string;
    signature?:string;
}

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

