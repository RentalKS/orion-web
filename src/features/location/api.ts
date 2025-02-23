import { api } from "../../lib/api-client";
import { LocationResponse } from "../../types/api";

const STATIC_TEST_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTczOTU2MDYxOCwiZXhwIjoxNzM5NjQ3MDE4fQ.n3ad55Hv68Kyok-vN65s7YSO79W4dUO0RWD4KuzI8Js';

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }

// Fetch locations
export async function getLocations(page = 1, size = 10, search = ''): Promise<LocationResponse> {
  return api.get<LocationResponse>('/api/locations', {
    params: { page, size, search },
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
    },
  });
}

// Create a new customer
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