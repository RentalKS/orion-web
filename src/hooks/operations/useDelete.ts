import { deleteBrand } from "../../features/brands/api";
import { deleteCategory } from "../../features/categories/api";
import { deleteCustomer } from "../../features/clients/api";
import { deleteCompany } from "../../features/companies/api";
import { deleteLocation } from "../../features/location/api";
import { deleteModel } from "../../features/modelsOfBrand/api";
import { deleteRateDate } from "../../features/rateDates/api";
import { deleteReservation } from "../../features/reservations/api";
import { deleteSection } from "../../features/sections/api";
import { deleteVehicle } from "../../features/vehicles/api";
import { useDeleteHook } from "../useDeleteHook";

export function useDeleteCategory() {
  return useDeleteHook({
    mutationFn: deleteCategory,
    queryKey: "categories",
  });
}

export function useDeleteSection() {
  return useDeleteHook({
    mutationFn: deleteSection,
    queryKey: "sections",
  });
}

export function useDeleteCompany() {
  return useDeleteHook({
    mutationFn: deleteCompany,
    queryKey: "companies",
  });
}

export function useDeleteCustomer() {
  return useDeleteHook({
    mutationFn: deleteCustomer,
    queryKey: "customers",
  });
}

export function useDeleteLocation() {
  return useDeleteHook({
    mutationFn: deleteLocation,
    queryKey: "locations",
  });
}

export function useDeleteBrand() {
  return useDeleteHook({
    mutationFn: deleteBrand,
    queryKey: "brands",
  });
}

export function useDeleteModel() {
  return useDeleteHook({
    mutationFn: deleteModel,
    queryKey: "models",
  });
}
export function useDeleteRateDate() {
  return useDeleteHook({
    mutationFn: deleteRateDate,
    queryKey: "rateDates",
  });
}

export function useDeleteVehicle() {
  return useDeleteHook({
    mutationFn: deleteVehicle,
    queryKey: "vehicles",
  });
}

export function useDeleteReservation() {
  return useDeleteHook({
    mutationFn: deleteReservation,
    queryKey: "reservations",
  });
}
