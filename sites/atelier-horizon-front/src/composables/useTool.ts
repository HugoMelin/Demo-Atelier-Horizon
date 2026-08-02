import type { ToolSingleResponse } from '@/types'

export const useTool = () => {
  const fetchAllTools = async (): Promise<ToolSingleResponse> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tool?populate[Outils][populate][Icon][populate]=Image`);
      if (!response.ok) {
        throw new Error(`Failed to fetch tool data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch tool data: ${error}`);
    }
  };

  return {
    fetchAllTools,
  }
};
