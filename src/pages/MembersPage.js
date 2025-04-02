import React, { useEffect, useState } from 'react';
import { getMembers } from '../services/api'; // Import the API function

const MembersPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const data = await getMembers();
      setMembers(data);
    };
    fetchMembers();
  }, []);

  return (
    <div>
      <h1>Members</h1>
      <ul>
        {members.length > 0 ? (
          members.map((member, index) => (
            <li key={index}>
              {member.memberName || `Member ${member.id}`}
            </li>
          ))
        ) : (
          <p>No members available.</p>
        )}
      </ul>
    </div>
  );
};

export default MembersPage;
