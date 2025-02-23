import { api } from "../../lib/api-client";
import { Category, CategoryResponse } from "../../types/api";

const STATIC_TEST_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTc0MDM0MzE5MiwiZXhwIjoxNzQwNDI5NTkyfQ.IdlFHotqAk6nlmQFCN6Z3gxCdj9I-mj0Sgc6AHUHW50";

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }


export async function getCategories(page = 1, size = 10, search = ''): Promise<CategoryResponse> {
  return api.get<CategoryResponse>('/api/category/all', {
    params: { page, size, search },
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
    },
  });
}


export async function createCategory(company: Omit<Category, 'id' | 'createdAt'>): Promise<Category> {
  return api.post<Category>('/api/category', company, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function updateCategory(companyId: number, updatedData: Partial<Category>): Promise<Category> {
  return api.put<Category>(`/api/category/${companyId}`, updatedData, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteCategory(companyId: number): Promise<void> {
  return api.put(`/api/category/delete/${companyId}`, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}