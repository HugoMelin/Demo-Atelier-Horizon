import type { TestimonialCollectionResponse, TestimonialSingleResponse } from '@/types'

export const useTestimonial = () => {
  const fetchAllTestimonials = async (): Promise<TestimonialCollectionResponse> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/testimonials?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch testimonial data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch testimonial data: ${error}`);
    }
  };

  const fetchTestimonialById = async (id: number): Promise<TestimonialSingleResponse> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/testimonials/${id}?populate=*`);
      if (!response.ok) {
        throw new Error(`Failed to fetch testimonial data by ID: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch testimonial data by ID: ${error}`);
    }
  };

  return {
    fetchAllTestimonials,
    fetchTestimonialById,
  }
};
