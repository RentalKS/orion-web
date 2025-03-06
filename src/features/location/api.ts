import { api } from "../../lib/api-client";
import { LocationResponse } from "../../types/api";

// Fetch locations
export async function getLocations(
  page = 1,
  size = 10,
  search = ""
): Promise<LocationResponse> {
  return api.get<LocationResponse>("/api/locations", {
    params: { page, size, search },
  });
}

// Create a new customer
export async function createLocation(
  location: Omit<Location, "id" | "createdAt">
): Promise<Location> {
  return api.post<Location>("/api/locations", location);
}

export async function updateLocation(
  locationId: number,
  updatedData: Partial<Location>
): Promise<Location> {
  return api.put<Location>(`/api/locations/${locationId}`, updatedData);
}

export async function deleteLocation(locationId: number): Promise<Location> {
  return api.delete<Location>(`/api/locations/${locationId}`);
}
