import type { TrustReasonCollectionResponse, TrustReasonSingleResponse } from '@/types'

export const useTrustReason = () => {
  const fetchAllTrustReasons = async (): Promise<TrustReasonCollectionResponse> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trust-reasons?populate[Icon][populate]=Image`);
      if (!response.ok) {
        throw new Error(`Failed to fetch trust reason data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch trust reason data: ${error}`);
    }
  };

  const fetchTrustReasonById = async (id: number): Promise<TrustReasonSingleResponse> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trust-reasons/${id}?populate[Icon][populate]=Image`);
      if (!response.ok) {
        throw new Error(`Failed to fetch trust reason data by ID: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch trust reason data by ID: ${error}`);
    }
  };

  return {
    fetchAllTrustReasons,
    fetchTrustReasonById,
  }
};
