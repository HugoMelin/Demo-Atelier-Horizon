export const usePrinciple = () => {
  const fetchAllPrinciples = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/principes?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch principle data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch principle data: ${error}`);
    }
  };

  const fetchPrincipleById = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/principes/${id}?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch principle data by ID: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch principle data by ID: ${error}`);
    }
  };

  return {
    fetchAllPrinciples,
    fetchPrincipleById,
  }
};
