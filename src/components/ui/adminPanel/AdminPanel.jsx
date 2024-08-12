import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

const AdminPanel = () => {
  const { userRole } = useContext(UserContext);
  console.log("userRole from Admin", userRole);

  // Only render this component if the user is an admin
  if (userRole !== "admin") {
    return null;
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Manage items, users, and more...</p>
      {/* Add admin-specific functionality here */}
    </div>
  );
};

export default AdminPanel;
