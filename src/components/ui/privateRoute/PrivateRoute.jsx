// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const PrivateRoute = ({ children, roles }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to='/signin' />;
//   }

//   if (roles && !roles.includes(user.role)) {
//     return <Navigate to='/home' />;
//   }

//   return children;
// };

// export default PrivateRoute;
