export const useFaq = () => {
  const fetchAllFaq = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/faq?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch FAQ data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch FAQ data: ${error}`);
    }
  };

  return {
    fetchAllFaq,
  }
};
