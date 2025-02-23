import { api } from "../../lib/api-client";
import { Company, CompanyResponse } from "../../types/api";

const STATIC_TEST_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvcmlvbkBkZXYuY29tIiwiaWF0IjoxNzQwMzQzMjU5LCJleHAiOjE3NDA0Mjk2NTl9.4q8eZ3RcZMaItyhL8SqQPaEYwnYtrGR9Yw7C8yaaTRw";

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }

export async function getCompanies(page = 1, size = 10, search = ''): Promise<CompanyResponse> {
  return api.get<CompanyResponse>('/api/companies', {
    params: { page, size, search },
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
    },
  });
}

export async function createCompany(company: Omit<Company, 'id' | 'createdAt'>): Promise<Company> {
  return api.post<Company>('/api/companies', company, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function updateCompany(companyId: number, updatedData: Partial<Company>): Promise<Company> {
  return api.put<Company>(`/api/companies/${companyId}`, updatedData, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteCompany(companyId: number): Promise<void> {
  return api.put(`/api/company/delete/${companyId}`, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}