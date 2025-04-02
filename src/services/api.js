export const getTournaments = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/tournaments/allTournaments');
    if (!response.ok) {
      throw new Error('Failed to fetch tournaments');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
