"use client";
// import React, { useEffect, useState } from 'react'
// import Link from 'next/link';
// import { useRouter } from "next/navigation";
// import toast from 'react-hot-toast';
// import  axios  from 'axios';

// export default function loginPage(){
//     const router =  useRouter();
//     const [user, setUser] = React.useState({
//         email:"",
//         password:"",

//     })
//     const [buttonDisabled, setButtonDisabled] = React.useState(false);
//     const [loading, setLoading] = React.useState(false);
//     const onLogin = async () =>{
//         try{
//             setLoading(true);
//             const response = await axios.post("/api/users/login", user);
//             console.log("Login success", response.data);
//             toast.success("login success");
//             router.push("/profile");
//         }
//         catch (error:any) {
//             console.log("Login failed", error.messgae);
//             toast.error(error.message);

//         }finally{
//             setLoading(false);
//         }

//     }
//     useEffect(() => {
//                 if(user.email.length>0 && user.password.length>0){
//                     setButtonDisabled(false)
//                 }
//                 else{
//                     setButtonDisabled(true);
//                 }
//     }, [user]);
//     return (
//         <div className='flex flex-col items-center border-3px-white p-4 m-4 justify-center min-h-screen py-2'>
//             <h1> {loading ? "processing" : "Login"} </h1>
//             <hr />

//             <label htmlFor="email" className='aligh-item-left'> email</label>
//             <input className=' text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
//             id='email'
//             type='email'
//             value={user.email}
//             onChange={(e) => setUser({...user, email:e.target.value})}
//             placeholder='Your email' />

//             <label htmlFor="password"> Password </label>
//             <input className=' text-black 2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
//             id='password'
//             type='password'
//             value={user.password}
//             onChange={(e) => setUser({...user, password:e.target.value})}
//             placeholder='password' />

//             <button onClick={onLogin}
//             className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>Login here </button>
//             <Link href="/signup"> Visit Signup Page </Link>
//         </div>
//     )
// }
"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [isLoginDetails, setIsLoginDetails] = useState({
    email: "",
    password: "",
  });
  const takeEmail = localStorage.getItem("email")
  const takepass = localStorage.getItem("password")
  const navigate = useRouter()
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    console.log(takeEmail);
    console.log(takepass);
    
    if (isLoginDetails.email === takeEmail && isLoginDetails.password === takepass) {
      console.log("login");
      
      navigate.push("/todo")

     }
     else{
      alert("invalid credential")
     }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-3 bg-gray-300 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              
              onChange={(e) =>
                setIsLoginDetails((prev) => ({
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
              onChange={(e) =>
                setIsLoginDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="text-blue-800 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Remember me</label>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link className="text-blue-500 hover:underline" href="/signup">signup</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface User {
//   username: string;
//   password: string;
//   email: string;
// }

// const SignupAndLogin: React.FC = () => {
//   const router = useRouter();
//   const [user, setUser] = useState<User>({
//     username: '',
//     password: '',
//     email: '',
//   });

//   const handleSignup = () => {
//     // Store user data in localStorage
//     localStorage.setItem('user', JSON.stringify(user));
//     alert('Signup successful!');
//   };

//   const handleLogin = () => {
//     // Retrieve user data from localStorage
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const { username, password } = JSON.parse(storedUser);
//       if (user.username === username && user.password === password) {
//         // Redirect to the "Hello Jii" page
//         router.push('/hello-jii');
//       } else {
//         alert('Invalid username or password');
//       }
//     } else {
//       alert('No user found. Please sign up first.');
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={user.username}
//         onChange={(e) => setUser({ ...user, username: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//       />
//       <button onClick={handleSignup}>Sign Up</button>

//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={user.username}
//         onChange={(e) => setUser({ ...user, username: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default SignupAndLogin;
