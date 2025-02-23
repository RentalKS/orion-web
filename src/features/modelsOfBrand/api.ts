import { api } from "../../lib/api-client";
import { Model, ModelResponse } from "../../types/api";

const STATIC_TEST_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTc0MDM0MzE5MiwiZXhwIjoxNzQwNDI5NTkyfQ.IdlFHotqAk6nlmQFCN6Z3gxCdj9I-mj0Sgc6AHUHW50";

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }

export async function getModels(page = 1, size = 10, search = ''): Promise<ModelResponse> {
  return api.get<ModelResponse>('/api/models', {
    params: { page, size, search },
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
    },
  });
}


export async function createModel(model: Omit<Model, 'id' | 'createdAt'>): Promise<Model> {
  return api.post<Model>('/api/models', model, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function updateModel(modelId: number, updatedData: Partial<Model>): Promise<Model> {
  return api.put<Model>(`/api/models/${modelId}`, updatedData, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteModel(modelId: number): Promise<void> {
  return api.put(`/api/model/models/${modelId}`, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}