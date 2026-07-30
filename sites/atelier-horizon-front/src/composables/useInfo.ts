export const useInfo = () => {
  const fetchAllInfo = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/infos?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch info data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch info data: ${error}`);
    }
  };

  const fetchInfoById = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/infos/${id}?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch info data by ID: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch info data by ID: ${error}`);
    }
  };

  return {
    fetchAllInfo,
    fetchInfoById,
  }
};
