import { api } from '../../lib/api-client';
import { AcceptPayment, ProcessPayment } from '../../types/api';

const STATIC_TEST_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTc0MDM0MzE5MiwiZXhwIjoxNzQwNDI5NTkyfQ.IdlFHotqAk6nlmQFCN6Z3gxCdj9I-mj0Sgc6AHUHW50";

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }

// Fetch customers

// Create a new customer
export async function processPayment(processPayment: Omit<ProcessPayment, 'id' | 'createdAt'>): Promise<ProcessPayment> {
  return api.post<ProcessPayment>('/api/payment/process', processPayment, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function acceptPayment(processPayment: Omit<AcceptPayment, 'id' | 'createdAt'>): Promise<AcceptPayment> {
    return api.post<ProcessPayment>('/api/payment/accept', processPayment, {
      headers: {
        'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
  }
  