import type { AboutCollectionResponse, AboutSingleResponse } from '@/types'

export const useAbout = () => {
  const fetchAllAbout = async (): Promise<AboutCollectionResponse> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/abouts?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch about data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch about data: ${error}`);
    }
  };

  const fetchAboutById = async (id: number): Promise<AboutSingleResponse> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/abouts/${id}?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch about data by ID: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch about data by ID: ${error}`);
    }
  };

  return {
    fetchAllAbout,
    fetchAboutById,
  }
};
