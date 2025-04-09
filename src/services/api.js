export const getTournaments = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/tournaments/allTournaments"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch tournaments");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
export const getMembersInTournament = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/tournaments/getMembersInTournament/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getTournamentByStartDate = async (tournamentStartDate) => {
  try {
    const response = await fetch(`http://localhost:8080/api/tournaments/getTournamentByStartDate/${tournamentStartDate}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch tournaments");
    }
  } catch (error) {
    console.error("Error fetching tournaments by start date:", error);
    return null;
  }
};
export const getTournamentByEndDate = async (tournamentEndDate) => {
  try {
    const response = await fetch(`http://localhost:8080/api/tournaments/getTournamentByEndDate/${tournamentEndDate}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch tournaments");
    }
  } catch (error) {
    console.error("Error fetching tournaments by end date:", error);
    return null;
  }
};
export const getTournamentByLocation = async (location) => {
  try {
    const response = await fetch(`http://localhost:8080/api/tournaments/getTournamentByLocation/${location}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch tournaments");
    }
  } catch (error) {
    console.error("Error fetching tournaments by end date:", error);
    return null;
  }
};
export const getMembers = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/members/allMembers"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMemberById = async (id) => {
  try {
  console.log("Id",id);

    const response = await fetch(
      `http://localhost:8080/api/members/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch member by id");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMemberByName = async (name) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/members/name/${name}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch member by name");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMemberByAddress = async (address) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/members/getMemberByAddress/${address}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch member by address");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMemberByPhoneNumber = async (phoneNumber) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/members/getMemberByPhoneNumber/${phoneNumber}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch member by phone number");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMemberByEmailAddress = async (emailAddress) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/members/getMemberByEmailAddress/${emailAddress}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch member by email address");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMemberByStartDate = async (startDate) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/members/getMemberByStartDate?startDate=${startDate}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch members by start date");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createMember = async (member) => {
  console.log("Submitting member:", member);

    const response = await fetch("http://localhost:8080/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });

    console.log(response);
    const responseBody = await response.text();
    console.log("Server response:", responseBody);
    if (response.status === 200){
      return "Member successfully added"
    }
    if (!response.status === 200) {
      return response.status;
    }
};
