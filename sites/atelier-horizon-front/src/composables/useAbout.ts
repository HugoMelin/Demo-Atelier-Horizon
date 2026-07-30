export const useAbout = () => {
  const fetchAllAbout = async () => {
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

  const fetchAboutById = async (id: number) => {
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
