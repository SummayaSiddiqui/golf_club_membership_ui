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

export const getMembers = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/members/allMembers');
    if (!response.ok) {
      throw new Error('Failed to fetch members');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMembersInTournament = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/tournaments/getMembersInTournament/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch members');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};