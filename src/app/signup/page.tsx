// "use client"
// import React, { useRef } from "react";
// function signup(){
//   const name:any = useRef()
//   const email:any=useRef()
//   const password:any=useRef()
//   const handleClick=()=>{
//     console.log(name.current.value.current.value,email,password.current.value)
//   }

// return(
//   <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <div className="w-full max-w-md p-8 space-y-3 bg-gray-300 rounded-2xl shadow-xl">

//     <div className="border-solid border-2">
//       <input placeholder="Name" type='text' ref={name}/>
//     </div>
//     <div>
//       <input placeholder="Email" type='email' ref={email}/>
//     </div>
//     <div>
//       <input placeholder="password" type='password' ref={password}/>
//     </div>
//   </div>
//   </div>
// );
// }
// export default signup;
// "use client";
// import React, { useState } from "react";

// const SignupForm: React.FC = () => {
//   const [signupDetails, setSignupDetails] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleFormSubmit = (e: any) => {
//     e.preventDefault();
//     if (signupDetails.password.length > 4) {
//       if (signupDetails.password === signupDetails.confirmPassword) {
//         console.log(signupDetails.username);
//         console.log(signupDetails.email);
//         console.log(signupDetails.password);
//         // You can add further signup logic here (e.g., API call)
//       } else {
//         console.log("Passwords do not match");
//       }
//     } else {
//       console.log("Password length must be greater than 4");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-200">
//       <div className="w-full max-w-md p-8 space-y-3 bg-gray-300 rounded-2xl shadow-xl">
//         <h1 className="text-2xl font-bold text-center text-gray-700">Sign Up</h1>
//         <form className="space-y-6" onSubmit={handleFormSubmit}>
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               type="text"
//               onChange={(e) =>
//                 setSignupDetails((prev) => ({
//                   ...prev,
//                   username: e.target.value,
//                 }))
//               }
//               className="text-blue-950 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your username"
//             />
//           </div>
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               onChange={(e) =>
//                 setSignupDetails((prev) => ({
//                   ...prev,
//                   email: e.target.value,
//                 }))
//               }
//               className="text-blue-950 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               onChange={(e) =>
//                 setSignupDetails((prev) => ({
//                   ...prev,
//                   password: e.target.value,
//                 }))
//               }
//               className="text-blue-800 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               onChange={(e) =>
//                 setSignupDetails((prev) => ({
//                   ...prev,
//                   confirmPassword: e.target.value,
//                 }))
//               }
//               className="text-blue-800 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Confirm your password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="text-sm text-center text-gray-700">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-500 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;



"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SignupForm: React.FC = () => {
  const router = useRouter();
  const [signupDetails, setSignupDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Check if user data exists in local storage and if it is relevant
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      // You can add more checks here to verify the user data
      if (user && user.email && user.username) {
        // If user data exists and is valid, redirect to login page
        // router.push("/login");
      }
    }
  }, [router]);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    // Check for empty fields
    if (!signupDetails.username || !signupDetails.email || !signupDetails.password || !signupDetails.confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (signupDetails.password.length > 4) {
      if (signupDetails.password === signupDetails.confirmPassword) {
        console.log(signupDetails.username);
        console.log(signupDetails.email);
        console.log(signupDetails.password);
        // Store user data in local storage
        localStorage.setItem("email", signupDetails.email);
        localStorage.setItem("password", signupDetails.password);
        // Redirect to login page after successful signup
        router.push("/login");
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("Password length must be greater than 4");
    }
  };

  return (
    <div className="flex items-center justify-center p-10 min-h-screen bg-gradient-to-r from-purple-200 to-blue-200">
     
      <div className="w-full max-w-md p-8 space-y-3 bg-gray-300 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-700">Sign Up</h1>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={signupDetails.username}
              onChange={(e) =>
                setSignupDetails((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              className="text-blue-950 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={signupDetails.email}
              onChange={(e) =>
                setSignupDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="text-blue-950 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={signupDetails.password}
              onChange={(e) =>
                setSignupDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="text-blue-800 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={signupDetails.confirmPassword}
              onChange={(e) =>
                setSignupDetails((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="text-blue-800 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
