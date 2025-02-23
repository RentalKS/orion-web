import { api } from "../../lib/api-client";
import { Vehicle, VehicleResponse } from "../../types/api";

const STATIC_TEST_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTc0MDM0MzE5MiwiZXhwIjoxNzQwNDI5NTkyfQ.IdlFHotqAk6nlmQFCN6Z3gxCdj9I-mj0Sgc6AHUHW50";

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }

// Fetch vehicles
export async function getVehicles(
    page = 1,
    size = 10,
    search = ''
  ): Promise<VehicleResponse> {
    try {
      const response = await api.post<VehicleResponse>(
        '/api/vehicle/all',
        {
          from: null,
          to: null,
          status: null,
          locationId: null,
          companyId: null,
          categoryId: null,
          sectionId: null,
        },
        {
          params: { page, size, search },
          headers: {
            'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Raw Response:', response);
      console.log('Response Data:', response?.data);
  
      if (!response || !response.data) {
        throw new Error('API returned an empty response');
      }
  
      return response;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  }
  
  

// Create a new customer
export async function createVehicle(vehicle: Omit<Vehicle, 'id' | 'createdAt'>): Promise<Vehicle> {
  return api.post<Vehicle>('/api/vehicle', vehicle, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function updateVehicle(vehicleId: number, updatedData: Partial<Vehicle>): Promise<Vehicle> {
  return api.put<Vehicle>(`/api/vehicle/${vehicleId}`, updatedData, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteVehicle(vehicleId: number): Promise<void> {
  return api.put(`/api/vehicle/delete/${vehicleId}`, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}