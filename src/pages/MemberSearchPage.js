import React from "react";
import GetMemberByNameSearch from "../components/GetMemberByNameSearch";
import GetMemberByAddressSearch from "../components/GetMemberByAddressSearch";
import GetMemberByPhoneNumberSearch from "../components/GetMemberByPhoneNumberSearch";
import GetMemberByEmailAddressSearch from "../components/GetMemberByEmailAddressSearch";
import GetMemberByStartDateSearch from "../components/GetMemberByStartDateSearch";
const MemberSearchPage = () => {
  return (
    <div>
      <GetMemberByNameSearch />
      <GetMemberByAddressSearch />
      <GetMemberByPhoneNumberSearch />
      <GetMemberByEmailAddressSearch />
      <GetMemberByStartDateSearch />
    </div>
  );
};

export default MemberSearchPage;
