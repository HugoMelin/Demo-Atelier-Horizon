export const useTool = () => {
  const fetchAllTools = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tool?populate%5BOutils%5D%5Bpopulate%5D%5BIcon%5D%5Bpopulate%5D=Image`);
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
