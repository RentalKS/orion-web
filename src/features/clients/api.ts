import { api } from '../../lib/api-client';
import { Customer, CustomerResponse } from '../../types/api';

const STATIC_TEST_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTczOTU2MDYxOCwiZXhwIjoxNzM5NjQ3MDE4fQ.n3ad55Hv68Kyok-vN65s7YSO79W4dUO0RWD4KuzI8Js';

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }

// Fetch customers
export async function getCustomers(page = 1, size = 10, search = ''): Promise<CustomerResponse> {
  return api.get<CustomerResponse>('/api/customer', {
    params: { page, size, search },
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
    },
  });
}

// Create a new customer
export async function createCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> {
  return api.post<Customer>('/api/customer', customer, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function updateCustomer(customerId: number, updatedData: Partial<Customer>): Promise<Customer> {
  return api.put<Customer>(`/api/customer/update/${customerId}`, updatedData, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}