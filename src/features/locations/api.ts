import { api } from "../../lib/api-client";
import { LocationResponse } from "../../types/api";

const STATIC_TEST_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTc0MDM0MzE5MiwiZXhwIjoxNzQwNDI5NTkyfQ.IdlFHotqAk6nlmQFCN6Z3gxCdj9I-mj0Sgc6AHUHW50";

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }

export async function getLocations(page = 1, size = 10, search = ''): Promise<LocationResponse> {
  return api.get<LocationResponse>('/api/locations', {
    params: { page, size, search },
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
    },
});
}

export async function createLocation(location: Omit<Location, 'id' | 'createdAt'>): Promise<Location> {
  return api.post<Location>('/api/locations', location, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function updateLocation(locationId: number, updatedData: Partial<Location>): Promise<Location> {
  return api.put<Location>(`/api/locations/${locationId}`, updatedData, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteLocation(locationId: number): Promise<void> {
  return api.put(`/api/location/delete/${locationId}`, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}