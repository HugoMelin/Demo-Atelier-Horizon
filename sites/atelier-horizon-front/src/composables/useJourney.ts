export const useJourney = () => {
  const fetchAllJourneys = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/journeys?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch journey data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch journey data: ${error}`);
    }
  };

  const fetchJourneyById = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/journeys/${id}?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch journey data by ID: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch journey data by ID: ${error}`);
    }
  };

  return {
    fetchAllJourneys,
    fetchJourneyById,
  }
};
