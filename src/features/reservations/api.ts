import { api } from "../../lib/api-client";
import {
  Reservation,
  ReservationDetails,
  ReservationResponse,
} from "../../types/api";

const STATIC_TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTc0MDM0MzE5MiwiZXhwIjoxNzQwNDI5NTkyfQ.IdlFHotqAk6nlmQFCN6Z3gxCdj9I-mj0Sgc6AHUHW50";

// function getAuthToken() {
//   return localStorage.getItem('authToken') || '';
// }

// Fetch reservations
export async function getReservations(
  page = 1,
  size = 10,
  search = ""
): Promise<ReservationResponse> {
  try {
    const response = await api.post<ReservationResponse>(
      "/api/reservation/all",
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
          Authorization: `Bearer ${STATIC_TEST_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Raw Response:", response);
    console.log("Response Data:", response?.data);

    if (!response || !response.data) {
      throw new Error("API returned an empty response");
    }

    return response;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
}

export async function createReservation(
  reservation: Omit<Reservation, "id" | "createdAt">
): Promise<Reservation> {
  return api.post<Reservation>("/api/reservation", reservation, {
    headers: {
      Authorization: `Bearer ${STATIC_TEST_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
}

export async function updateReservation(
  reservationId: number,
  updatedData: Partial<Reservation>
): Promise<Reservation> {
  return api.put<Reservation>(
    `/api/reservation/${reservationId}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${STATIC_TEST_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
}

export async function deleteReservation(reservationId: number): Promise<void> {
  return api.put(`/api/reservation/delete/${reservationId}`, {
    headers: {
      Authorization: `Bearer ${STATIC_TEST_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
}

export async function getReservationDetails(
  bookingId: number
): Promise<ReservationDetails> {
  try {
    const response = await api.get<ReservationDetails>(
      `/api/reservation/details/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${STATIC_TEST_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Reservation Details Response:", response?.data);

    if (!response || !response.data) {
      throw new Error("API returned an empty response");
    }

    return response;
  } catch (error) {
    console.error("Error fetching reservation details:", error);
    throw error;
  }
}

