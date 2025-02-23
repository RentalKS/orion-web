import { updateBrand } from "../../features/brands/api";
import { updateCustomer } from "../../features/clients/api";
import { updateCompany } from "../../features/companies/api";
import { updateLocation } from "../../features/locations/api";
import { Brand, Category, Company, Customer, Model, RateDate, Reservation, Section, Vehicle } from "../../types/api";
import { useMutationHook } from "../useMutationHook";

export function useUpdateCategory() {
  return useMutationHook<{ categoryId: number; updatedData: Partial<Category> }>({
    mutationFn: ({ categoryId, updatedData }) => updateCompany(categoryId, updatedData),
    queryKey: "categories",
  });
}

export function useUpdateCompany() {
  return useMutationHook<{ companyId: number; updatedData: Partial<Company> }>({
    mutationFn: ({ companyId, updatedData }) => updateCompany(companyId, updatedData),
    queryKey: "companies",
  });
}

export function useUpdateSection() {
  return useMutationHook<{ sectionId: number; updatedData: Partial<Section> }>({
    mutationFn: ({ sectionId, updatedData }) => updateCompany(sectionId, updatedData),
    queryKey: "sections",
  });
}


export function useUpdateCustomer() {
    return useMutationHook<{ customerId: number; updatedData: Partial<Customer> }>({
      mutationFn: ({ customerId, updatedData }) => updateCustomer(customerId, updatedData),
      queryKey: "customers",
    });
}

export function useUpdateLocation() {
    return useMutationHook<{ locationId: number; updatedData: Partial<Location> }>({
      mutationFn: ({ locationId, updatedData }) => updateLocation(locationId, updatedData),
      queryKey: "locations",
    });

    
}  

export function useUpdateBrand() {
  return useMutationHook<{ brandId: number; updatedData: Partial<Brand>}>({
    mutationFn: ({ brandId, updatedData }) => updateBrand(brandId, updatedData),
    queryKey: "brands",
  });
}

export function useUpdateModel() {
  return useMutationHook<{ modelId: number; updatedData: Partial<Model>}>({
    mutationFn: ({ modelId, updatedData }) => updateBrand(modelId, updatedData),
    queryKey: "models",
  });
}

export function useUpdateRateDate() {
  return useMutationHook<{ rateDateId: number; updatedData: Partial<RateDate>}>({
    mutationFn: ({ rateDateId, updatedData }) => updateBrand(rateDateId, updatedData),
    queryKey: "rateDates",
  });
}

export function useUpdateVehicle() {
  return useMutationHook<{ vehicleId: number; updatedData: Partial<Vehicle>}>({
    mutationFn: ({ vehicleId, updatedData }) => updateBrand(vehicleId, updatedData),
    queryKey: "vehicles",
  });
}

export function useUpdateReservation() {
  return useMutationHook<{ reservationId: number; updatedData: Partial<Reservation>}>({
    mutationFn: ({ reservationId, updatedData }) => updateBrand(reservationId, updatedData),
    queryKey: "reservations",
  });
}