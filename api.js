export const fetchDuties = async () => {
  try {
    const response = await fetch('http://192.168.1.9:8000/api/duties');
    const data = await response.json();
    return Array.isArray(data) ? data : [data]; // Ensure it's an array
  } catch (error) {
    console.error('Error fetching duties:', error);
    return [];
  }
};
