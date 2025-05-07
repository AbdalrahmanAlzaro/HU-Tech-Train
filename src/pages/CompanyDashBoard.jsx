import React from "react";
import Profile from "../components/company/Profile";
import AddPost from "../components/company/AddPost";
import AllRequest from "../components/company/AllRequest";

const CompanyDashBoard = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 justify-around items-start p-6">
        <Profile />
        <AddPost />
      </div>
      <div>
        <AllRequest />
      </div>
    </>
  );
};

export default CompanyDashBoard;
