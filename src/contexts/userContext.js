// import React, { useState } from "react";
// import axios from "axios";

// const userContext = React.createContext();

// export const UserStore = (props) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [id, setId] = useState(null);
//   const [token, setToken] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [userName, setUserName] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const logout = () => {
//     axios
//       .get("users/logout")
//       .then((result) => {
//         setIsLoggedIn(false);
//         setToken(null);
//         setEmail(null);
//         setUserName(null);
//         setUserRole(null);
//       })
//       .catch((err) => console.log(err));
//   };

//   const login = (email, password) => {
//     setIsLoading(true);
//     axios
//       .post(`users/login`, {
//         email: email,
//         password: password,
//       })
//       .then((result) => {
//         setIsLoading(false);
//         console.log("llllllllllllllllllllllllllllllllll", result.data);
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         console.log(err.message);
//       });
//   };

//   const signUp = (name, email, password) => {
//     axios
//       .post(`users/register`, {
//         name: name,
//         email: email,
//         password: password,
//         role: "admin",
//       })
//       .then((result) => {
//         console.log(result.data);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//   return (
//     <userContext.Provider
//       value={{
//         isLoggedIn,
//         setIsLoggedIn,
//         token,
//         setToken,
//         login,
//         userRole,
//         setUserRole,
//         userName,
//         setUserName,
//         email,
//         setEmail,
//         signUp,
//         logout,
//         isLoading,
//         setIsLoading,
//         id,
//       }}
//     >
//       {props.children}
//     </userContext.Provider>
//   );
// };

// export default userContext;
