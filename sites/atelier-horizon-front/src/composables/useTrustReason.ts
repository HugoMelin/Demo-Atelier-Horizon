export const useTrustReason = () => {
  const fetchAllTrustReasons = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trust-reasons?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch trust reason data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch trust reason data: ${error}`);
    }
  };

  const fetchTrustReasonById = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trust-reasons/${id}?populate=*`);
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
