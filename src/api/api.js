export const fetchData = async () => {
  try {
    const response = await fetch("/satellites.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
