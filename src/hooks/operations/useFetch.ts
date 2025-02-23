import { getCustomers } from "../../features/clients/api";
import { getLocations } from "../../features/locations/api";
import { getBrands } from "../../features/brands/api"; // Ensure this import exists
import { CustomerResponse, LocationResponse, BrandResponse, ModelResponse, RateDateResponse, VehicleResponse, ReservationResponse, CompanyResponse, CategoryResponse, SectionResponse } from "../../types/api";
import { useFetchHook } from "../useFetchHook";
import { getModels } from "../../features/modelsOfBrand/api";
import { getRateDates } from "../../features/rateDates/api";
import { getVehicles } from "../../features/vehicles/api";
import { getReservationDetails, getReservations } from "../../features/reservations/api";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../features/companies/api";
import { getCategories } from "../../features/categories/api";
import { getSections } from "../../features/sections/api";


interface UseBaseParams {
  page?: number;
  size?: number;
  search?: string;
}

export function useCategories(params: UseBaseParams) {
  return useFetchHook<CategoryResponse>({
    queryKey: "categories",
    fetchFn: getCategories,
    params,
  });
}

export function useSections(params: UseBaseParams) {
  return useFetchHook<SectionResponse>({
    queryKey: "sections",
    fetchFn: getSections,
    params,
  });
}

export function useCompanies(params: UseBaseParams) {
  return useFetchHook<CompanyResponse>({
    queryKey: "companies",
    fetchFn: getCompanies,
    params,
  });
}

export function useCustomers(params: UseBaseParams) {
  return useFetchHook<CustomerResponse>({
    queryKey: "customers",
    fetchFn: getCustomers,
    params,
  });
}

export function useLocations(params: UseBaseParams) {
  return useFetchHook<LocationResponse>({
    queryKey: "locations",
    fetchFn: getLocations,
    params,
  });
}

export function useBrands(params: UseBaseParams) {
  return useFetchHook<BrandResponse>({
    queryKey: "brands",
    fetchFn: getBrands,
    params,
  });
}


export function useModels(params: UseBaseParams) {
  return useFetchHook<ModelResponse>({
    queryKey: "models",
    fetchFn: getModels,
    params,
  });
}
export function useRateDates(params: UseBaseParams) {
  return useFetchHook<RateDateResponse>({
    queryKey: "rateDates",
    fetchFn: getRateDates,
    params,
  });
}

export function useVehicles(params: UseBaseParams) {
  return useFetchHook<VehicleResponse>({
    queryKey: "vehicles",
    fetchFn: getVehicles,
    params,
  });
}

export function useReservations(params: UseBaseParams) {
  return useFetchHook<ReservationResponse>({
    queryKey: "reservations",
    fetchFn: getReservations,
    params,
  });
}


export function useReservationDetails(bookingId: number | null) {
  return useQuery({
    queryKey: ["reservationDetails", bookingId],
    queryFn: () => (bookingId ? getReservationDetails(bookingId) : Promise.resolve(null)), 
    enabled: !!bookingId, 
    refetchOnWindowFocus: false,
  });
}

