// import React, { createContext, useContext, useEffect, useState } from "react";
// import supabase from "../../api/supabase";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const getSession = async () => {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession();
//       if (error) {
//         console.error("Error fetching session:", error.message);
//       }
//       setUser(session?.user ?? null);
//       console.log("getSession session", session);
//     };

//     getSession();

//     // Set up the auth state change listener
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setUser(session?.user ?? null);
//         console.log("onAuthStateChange session", session);
//       }
//     );

//     // Cleanup the subscription when the component unmounts
//     return () => {
//       if (authListener?.subscription) {
//         authListener.subscription.unsubscribe();
//       } else {
//         console.warn("No valid subscription found");
//       }
//     };
//   }, []);

//   const signUp = async (email, password) => {
//     const { data, error } = await supabase.auth.signUp({ email, password });
//     if (error) throw error;
//     setUser(data.user);
//   };

//   const signIn = async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) throw error;
//     setUser(data.user);
//   };

//   const signInWithGoogle = async () => {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//     });
//     if (error) throw error;
//     setUser(data.user);
//   };

//   const signOut = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, signUp, signIn, signInWithGoogle, signOut }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
