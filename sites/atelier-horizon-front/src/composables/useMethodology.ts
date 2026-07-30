import type { MethodologyCollectionResponse, MethodologySingleResponse } from '@/types'

export const useMethodology = () => {
  const fetchAllMethodologies = async (): Promise<MethodologyCollectionResponse> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/methodologies?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch methodology data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch methodology data: ${error}`);
    }
  };

  const fetchMethodologyById = async (id: number): Promise<MethodologySingleResponse> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/methodologies/${id}?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch methodology data by ID: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch methodology data by ID: ${error}`);
    }
  };

  return {
    fetchAllMethodologies,
    fetchMethodologyById,
  }
};
