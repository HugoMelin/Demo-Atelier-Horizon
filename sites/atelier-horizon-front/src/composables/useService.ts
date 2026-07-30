export const useService = () => {
  const fetchAllServices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/services?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch service data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch service data: ${error}`);
    }
  };

  const fetchServiceById = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/services/${id}?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch service data by ID: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch service data by ID: ${error}`);
    }
  };

  return {
    fetchAllServices,
    fetchServiceById,
  }
};
