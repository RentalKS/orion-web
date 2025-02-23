import { createBrand } from "../../features/brands/api";
import { createCategory } from "../../features/categories/api";
import { createCustomer } from "../../features/clients/api";
import { createCompany } from "../../features/companies/api";
import { createLocation } from "../../features/locations/api";
import { createModel } from "../../features/modelsOfBrand/api";
import { createRateDate } from "../../features/rateDates/api";
import { createReservation } from "../../features/reservations/api";
import { createSection } from "../../features/sections/api";
import { createVehicle } from "../../features/vehicles/api";
import { Brand, Category, Company, Customer, Model, RateDate, Reservation, Section, Vehicle } from "../../types/api";
import { useMutationHook } from "../useMutationHook";

export function useCreateCompany() {
  return useMutationHook<Omit<Company, 'id' | 'createdAt'>>({
    mutationFn: createCompany,
    queryKey: "companies",
  });
}

export function useCreateCategory() {
  return useMutationHook<Omit<Category, 'id' | 'createdAt'>>({
    mutationFn: createCategory,
    queryKey: "categories",
  });
}
export function useCreateSection() {
  return useMutationHook<Omit<Section, 'id' | 'createdAt'>>({
    mutationFn: createSection,
    queryKey: "sections",
  });
}

export function useCreateCustomer() {
    return useMutationHook<Omit<Customer, 'id' | 'createdAt'>>({
      mutationFn: createCustomer,
      queryKey: "customers",
    });
}

export function useCreateLocation() {
    return useMutationHook<Omit<Location, 'id' | 'createdAt'>>({
      mutationFn: createLocation,
      queryKey: "locations",
    });
}

export function useCreateBrand() {
  return useMutationHook<Omit<Brand, 'id' | 'createdAt'>>({
    mutationFn: createBrand,
    queryKey: "brands",
  });
}

export function useCreateModel() {
  return useMutationHook<Omit<Model, 'id' | 'createdAt'>>({
    mutationFn: createModel,
    queryKey: "models",
  });
}

export function useCreateRateDate() {
  return useMutationHook<Omit<RateDate, 'id' | 'createdAt'>>({
    mutationFn: createRateDate,
    queryKey: "rateDates",
  });
}


export function useCreateVehicle() {
  return useMutationHook<Omit<Vehicle, 'id' | 'createdAt'>>({
    mutationFn: createVehicle,
    queryKey: "vehicles",
  });
}

export function useCreateReservation() {
  return useMutationHook<Omit<Reservation, 'id' | 'createdAt'>>({
    mutationFn: createReservation,
    queryKey: "reservations",
  });
}