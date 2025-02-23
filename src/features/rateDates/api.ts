import { api } from "../../lib/api-client";
import { RateDate, RateDateResponse } from "../../types/api";

const STATIC_TEST_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTc0MDM0MzE5MiwiZXhwIjoxNzQwNDI5NTkyfQ.IdlFHotqAk6nlmQFCN6Z3gxCdj9I-mj0Sgc6AHUHW50";

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }

// Fetch rateDates
export async function getRateDates(page = 1, size = 10, search = ''): Promise<RateDateResponse> {
  return api.get<RateDateResponse>('/api/rate-dates', {
    params: { page, size, search },
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
    },
  });
}


export async function createRateDate(model: Omit<RateDate, 'id' | 'createdAt'>): Promise<RateDate> {
  return api.post<RateDate>('/api/rate-dates', model, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function updateRateDate(rateDateId: number, updatedData: Partial<RateDate>): Promise<RateDate> {
  return api.put<RateDate>(`/api/rate-dates/${rateDateId}`, updatedData, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteRateDate(rateDateId: number): Promise<void> {
  return api.put(`/api/rate-dates/rateDates/${rateDateId}`, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}