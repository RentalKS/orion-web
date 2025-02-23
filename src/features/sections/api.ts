import { api } from "../../lib/api-client";
import { Section, SectionResponse } from "../../types/api";

const STATIC_TEST_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTc0MDM0MzE5MiwiZXhwIjoxNzQwNDI5NTkyfQ.IdlFHotqAk6nlmQFCN6Z3gxCdj9I-mj0Sgc6AHUHW50";

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }


export async function getSections(page = 1, size = 10, search = ''): Promise<SectionResponse> {
  return api.get<SectionResponse>('/api/sections/all', {
    params: { page, size, search },
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
    },
  });
}


export async function createSection(company: Omit<Section, 'id' | 'createdAt'>): Promise<Section> {
  return api.post<Section>('/api/sections', company, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function updateSection(sectionId: number, updatedData: Partial<Section>): Promise<Section> {
  return api.put<Section>(`/api/sections/${sectionId}`, updatedData, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteSection(sectionId: number): Promise<void> {
  return api.put(`/api/sections/delete/${sectionId}`, {
    headers: {
      'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
}