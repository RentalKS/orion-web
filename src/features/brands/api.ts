import { api } from '../../lib/api-client';
import { BrandResponse, Brand } from '../../types/api';

const STATIC_TEST_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTc0MDM0MzE5MiwiZXhwIjoxNzQwNDI5NTkyfQ.IdlFHotqAk6nlmQFCN6Z3gxCdj9I-mj0Sgc6AHUHW50";

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }

// Fetch Brands
export async function getBrands(page = 1, size = 10, search = ''): Promise<BrandResponse> {
  return api.get<BrandResponse>('/api/brand', {
    params: { page, size, search },
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
    },
  });
}

// Create a new Brand
export async function createBrand(Brand: Omit<Brand, 'id' | 'createdAt'>): Promise<Brand> {
  return api.post<Brand>('/api/brand', Brand, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function updateBrand(brandId: number, updatedData: Partial<Brand>): Promise<Brand> {
  return api.put<Brand>(`/api/brand/update/${brandId}`, updatedData, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteBrand(brandId: number): Promise<void> {
  return api.put(`/api/brand/delete/${brandId}`, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}
