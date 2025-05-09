// import { useState } from 'react';
// import axios from 'axios';
// import { FcGoogle } from 'react-icons/fc';
// import { FaLinkedin } from 'react-icons/fa';
// import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
// import pro from '../assets/bro.png';
// import { Link, useNavigate } from 'react-router-dom';
// // import { GoogleOAuthProvider, useGoogleOneTapLogin } from '@react-oauth/google';
// import { useLinkedIn } from 'react-linkedin-login-oauth2';
// import { useGoogleLogin } from '@react-oauth/google';

// const SignInPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
    
//       const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/login`, {
//         email,
//         password,
//       });

//       console.log(response)

//       localStorage.setItem('token', response.data.token);
//       navigate('/react/ControlPanel'); 
//       window.location.reload();


//       console.log('Login successful:', response.data);
//     } catch (err: any) {
//       if (err.response) {
//         setError(err.response.data.message);
//         console.error('Login failed:', err.response.data);
//       } else if (err.request) {
//         console.error('Login failed: No response received', err.request);
//         setError('No response received from the server.');
//       } else {
//         console.error('Login failed:', err.message);
//         setError('An error occurred. Please try again later.');
//       }
//     }
//   };

  
  

//   const { linkedInLogin } = useLinkedIn({
//         clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID!,
//         redirectUri: "http://localhost:5173", // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
//         onSuccess: (code) => {
//           console.log(code);
//         },
//         onError: (error) => {
//           console.log(error);
//         },
//       });

      





//       const login = useGoogleLogin({
//         flow: 'implicit',
//           onSuccess: async (tokenResponse) => {
//               const accessToken = tokenResponse.access_token;

  
//               try {
//                   // Fetch user info from Google API
//                   const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
//                       headers: {
//                           Authorization: `Bearer ${accessToken}`,
//                       },
//                   });
  
//                   if (userInfoResponse.ok) {
//                       const userInfo = await userInfoResponse.json();
//                       const email = userInfo; // Extract email
//                       setEmail(email);

//                       try {
    
//                         const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/login`, {
//                           email,
//                           password,
//                         });
                  
//                         localStorage.setItem('token', response.data.token);
//                         navigate('/react/ControlPanel'); 
//                         window.location.reload();

                  
//                         console.log('Login successful:', response.data);
//                       } catch (err: any) {
//                         if (err.response) {
//                           setError(err.response.data.message);
//                           console.error('Login failed:', err.response.data);
//                         } else if (err.request) {
//                           console.error('Login failed: No response received', err.request);
//                           setError('No response received from the server.');
//                         } else {
//                           console.error('Login failed:', err.message);
//                           setError('An error occurred. Please try again later.');
//                         }
//                       }
//                       console.log("User Email:", userInfo);
                      
//                   } else {
//                       console.error(
//                           "Failed to fetch user info from Google Userinfo API:",
//                           userInfoResponse.status,
//                           userInfoResponse.statusText
//                       );
//                       alert("Google Login Successful, but failed to fetch user email.");
//                   }
//               } catch (error) {
//                   console.error("Error fetching user info:", error);
//                   alert("Error fetching user email from Google.");
//               }
//           },
//           onError: () => {
//               alert("Google Login failed.");
//           },
//       });

//   return (
//     <>
//     <div className="flex-col pt-32 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">Sign in</h2>

//       <div className=" max-w-7xl w-full bg-white rounded-lg shadow-lg overflow-hidden md:flex">
//         <div className="w-full md:w-1/2 py-10 px-8 md:px-12 lg:px-16">
//           <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
//             <button onClick={() => login()} className="flex items-center justify-center bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md">
//               <FcGoogle className="mr-2 text-2xl" />
//               Sign in with Google
//             </button>
//             <button  onClick={linkedInLogin} className=" cursor-pointer flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md">
//                 <FaLinkedin className="mr-2 text-2xl" />
//                 Sign in with LinkedIn
//               </button>
//              </div>

//           <div className="flex items-center justify-center my-4">
//             <div className="border-t border-gray-300 flex-grow"></div>
//             <span className="mx-4 text-gray-500 font-medium">OR</span>
//             <div className="border-t border-gray-300 flex-grow"></div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div> {/*Email Input*/}
//                 <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
//                 <div className="relative">
//                     <input
//                     type="email"
//                     id="email"
//                     placeholder="Enter your email"
//                     value={email}   //Added Value and onChange
//                     onChange={(e) => setEmail(e.target.value)} //Added
//                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
//                     />
//                     <span className="absolute inset-y-0 right-4 flex items-center">
//                     <HiOutlineMail className="h-6 w-6 text-gray-400" />
//                   </span>
//                 </div>
//               </div>
//                  <div> {/*Password Input*/}
//                 <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
//                   <div className="relative">
//                     <input
//                       type="password"
//                       id="password"
//                       placeholder="Enter your password"
//                         value={password} //Added Value and onChange
//                         onChange={(e) =>setPassword(e.target.value)}//Added
//                       className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
//                     />
//                     <span className="absolute inset-y-0 right-4 flex items-center">
//                     <HiOutlineLockClosed className="h-6 w-6 text-gray-400" />
//                     </span>
//                   </div>
//                  </div>
//             {error && <div className="text-red-500">{error}</div>} {/* Error Message */}
//             <button  type="submit" className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-lg">
//               Sign in
//             </button>
//           </form>

//           <div className="mt-6">
//             <p className="text-gray-700 font-medium mb-2">Need help?</p>
//             <ul className="text-sm text-gray-600 space-y-1">
//             <li> <Link to="/react/joinUS"><button className="text-left text-blue-500 hover:underline focus:outline-none">I don't have an account yet</button></Link> </li>
//             <li> <button className="text-left text-blue-500 hover:underline focus:outline-none">Forgot my password</button> </li>
//               <li> <button className="text-left text-blue-500 hover:underline focus:outline-none">I did not receive the activation code</button> </li>
//             </ul>
//           </div>
//         </div>

//         <div className="hidden md:flex md:w-1/2 items-center justify-center">
//           <img src={pro} alt="Sign in illustration" className="h-4/5 w-4/5 object-contain" />
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default SignInPage;













// //  const SignInPage = () => {
// //   return (
// //     <iframe
// //         src="https://accept.paymob.com/api/acceptance/iframes/896889?payment_token=ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDJsa0lqb3hPVEExT0RVd0xDSmhiVzkxYm5SZlkyVnVkSE1pT2pFd01EQXdMQ0pqZFhKeVpXNWplU0k2SWtWSFVDSXNJbWx1ZEdWbmNtRjBhVzl1WDJsa0lqbzBPVE01TURJNUxDSnZjbVJsY2w5cFpDSTZNamt3TlRBMk1qSTJMQ0ppYVd4c2FXNW5YMlJoZEdFaU9uc2labWx5YzNSZmJtRnRaU0k2SWtwdmFHNGlMQ0pzWVhOMFgyNWhiV1VpT2lKRWIyVWlMQ0p6ZEhKbFpYUWlPaUpGZEdoaGJpQk1ZVzVrSWl3aVluVnBiR1JwYm1jaU9pSkhhWHBoSWl3aVpteHZiM0lpT2lJME1pSXNJbUZ3WVhKMGJXVnVkQ0k2SWpnd015SXNJbU5wZEhraU9pSkhhWHBoSWl3aWMzUmhkR1VpT2lKT1FTSXNJbU52ZFc1MGNua2lPaUpGWjNsd2RDSXNJbVZ0WVdsc0lqb2lkR1Z6ZEVCbGVHRnRjR3hsTG1OdmJTSXNJbkJvYjI1bFgyNTFiV0psY2lJNklqQXhNREV4TVRFeE1URXhJaXdpY0c5emRHRnNYMk52WkdVaU9pSXdNVGc1T0NJc0ltVjRkSEpoWDJSbGMyTnlhWEIwYVc5dUlqb2lUa0VpZlN3aWJHOWphMTl2Y21SbGNsOTNhR1Z1WDNCaGFXUWlPbVpoYkhObExDSmxlSFJ5WVNJNmUzMHNJbk5wYm1kc1pWOXdZWGx0Wlc1MFgyRjBkR1Z0Y0hRaU9tWmhiSE5sTENKbGVIQWlPakUzTXpneE5UTTNPVFlzSW5CdGExOXBjQ0k2SWpReExqSXpPQzR4TmpVdU9USWlmUS5DNFdOV3hyMjVTN1NxVkdQRmpyTVpTVHJUWS10aVBwV3RUZGxFSWttMFRMeDNMNE5ZRFZRdjNUNms4bG5seUFyR3FoNWVpV2dwTnNLVkFVbzIzdEhlUQ=="  // Replace with the actual Paymob iframe URL
// //         width="100%"  // Adjust based on your design
// //         height="600px"  // Adjust based on your design
// //         frameBorder="0"
// //         title="Paymob Payment"
// //       ></iframe>
// //   )
// // }

// // export default SignInPage









import React, { useState } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import pro from '../assets/bro.png';
import { Link, useNavigate } from 'react-router-dom';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useGoogleLogin } from '@react-oauth/google';

const translations = {
    en: {
        "Sign in": "Sign in",
        "Sign in with Google": "Sign in with Google",
        "Sign in with LinkedIn": "Sign in with LinkedIn",
        "OR": "OR",
        "Email": "Email",
        "Enter your email": "Enter your email",
        "Password": "Password",
        "Enter your password": "Enter your password",
        // "Sign in": "Sign in",
        "Need help?": "Need help?",
        "I don't have an account yet": "I don't have an account yet",
        "Forgot my password": "Forgot my password",
        "I did not receive the activation code": "I did not receive the activation code",
    },
    ar: {
        "Sign in": "تسجيل الدخول",
        "Sign in with Google": "تسجيل الدخول باستخدام جوجل",
        "Sign in with LinkedIn": "تسجيل الدخول باستخدام لينكد إن",
        "OR": "أو",
        "Email": "البريد الإلكتروني",
        "Enter your email": "أدخل بريدك الإلكتروني",
        "Password": "كلمة المرور",
        "Enter your password": "أدخل كلمة مرورك",
        // "Sign in": "تسجيل الدخول",
        "Need help?": "هل تحتاج مساعدة؟",
        "I don't have an account yet": "ليس لدي حساب بعد",
        "Forgot my password": "نسيت كلمة المرور",
        "I did not receive the activation code": "لم أستلم رمز التفعيل",
    },
};

const translate = (key: string, language: 'en' | 'ar') => {
    return (translations as any)[language]?.[key] ?? key;
};


const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const language = localStorage.getItem('language') === 'ar' ? 'ar' : 'en'
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {

      const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/login`, {
        email,
        password,
      });

      console.log(response)

      localStorage.setItem('token', response.data.token);
      navigate('/react/ControlPanel');
      window.location.reload();


      console.log('Login successful:', response.data);
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message);
        console.error('Login failed:', err.response.data);
      } else if (err.request) {
        console.error('Login failed: No response received', err.request);
        setError('No response received from the server.');
      } else {
        console.error('Login failed:', err.message);
        setError('An error occurred. Please try again later.');
      }
    }
  };


  const { linkedInLogin } = useLinkedIn({
        clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID!,
        redirectUri: "http://localhost:5173", // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
        onSuccess: (code) => {
          console.log(code);
        },
        onError: (error) => {
          console.log(error);
        },
      });


      const login = useGoogleLogin({
        flow: 'implicit',
          onSuccess: async (tokenResponse) => {
              const accessToken = tokenResponse.access_token;


              try {
                  // Fetch user info from Google API
                  const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                      headers: {
                          Authorization: `Bearer ${accessToken}`,
                      },
                  });

                  if (userInfoResponse.ok) {
                      const userInfo = await userInfoResponse.json();
                      const email = userInfo.email; // Extract email
                      setEmail(email);

                      try {

                        const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/login`, {
                          email,
                          password,
                        });

                        localStorage.setItem('token', response.data.token);
                        navigate('/react/ControlPanel');
                        window.location.reload();


                        console.log('Login successful:', response.data);
                      } catch (err: any) {
                        if (err.response) {
                          setError(err.response.data.message);
                          console.error('Login failed:', err.response.data);
                        } else if (err.request) {
                          console.error('Login failed: No response received', err.request);
                          setError('No response received from the server.');
                        } else {
                          console.error('Login failed:', err.message);
                          setError('An error occurred. Please try again later.');
                        }
                      }
                      console.log("User Email:", userInfo);

                  } else {
                      console.error(
                          "Failed to fetch user info from Google Userinfo API:",
                          userInfoResponse.status,
                          userInfoResponse.statusText
                      );
                      alert("Google Login Successful, but failed to fetch user email.");
                  }
              } catch (error) {
                  console.error("Error fetching user info:", error);
                  alert("Error fetching user email from Google.");
              }
          },
          onError: () => {
              alert("Google Login failed.");
          },
      });

  return (
    <>
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="flex-col pt-32 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">{translate("Sign in", language)}</h2>

      <div className=" max-w-7xl w-full bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        <div className="w-full md:w-1/2 py-10 px-8 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <button onClick={() => login()} className="flex items-center justify-center bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md">
              <FcGoogle className="me-2 text-2xl" />
              {translate("Sign in with Google", language)}
            </button>
            <button  onClick={linkedInLogin} className=" cursor-pointer flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md">
                <FaLinkedin className="me-2 text-2xl" />
                {translate("Sign in with LinkedIn", language)}
              </button>
             </div>

          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-4 text-gray-500 font-medium">{translate("OR", language)}</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div> {/*Email Input*/}
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">{translate("Email", language)}</label>
                <div className="relative ">
                  <div className=''>
                    
                    <input
                    type="email"
                    id="email"
                    placeholder={translate("Enter your email", language)}
                    value={email}   //Added Value and onChange
                    onChange={(e) => setEmail(e.target.value)} //Added
                    className="w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                    />
                    </div>
                    <div>

                    <span className=" absolute inset-y-0 inset-inline-end-4 flex items-center"> {/* Changed right-4 to inset-inline-end-4 */}
                    <HiOutlineMail className="ml-2 h-6 w-6 text-gray-400" />
                  </span>
                    </div>
                </div>
              </div>
                 <div> {/*Password Input*/}
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">{translate("Password", language)}</label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      placeholder={translate("Enter your password", language)}
                        value={password} //Added Value and onChange
                        onChange={(e) =>setPassword(e.target.value)}//Added
                      className="w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                    />
                    <span className="absolute inset-y-0 inset-inline-end-4 flex items-center"> {/* Changed right-4 to inset-inline-end-4 */}
                    <HiOutlineLockClosed className="ml-2 h-6 w-6 text-gray-400" />
                    </span>
                  </div>
                 </div>
            {error && <div className="text-red-500">{error}</div>} {/* Error Message */}
            <button  type="submit" className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-lg">
              {translate("Sign in", language)}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-gray-700 font-medium mb-2">{translate("Need help?", language)}</p>
            <ul className="text-sm text-gray-600 space-y-1">
            <li> <Link to="/react/joinUS"><button className="text-start text-blue-500 hover:underline focus:outline-none">{translate("I don't have an account yet", language)}</button></Link> </li> {/* Changed text-left to text-start */}
            <li> <button className="text-start text-blue-500 hover:underline focus:outline-none">{translate("Forgot my password", language)}</button> </li> {/* Changed text-left to text-start */}
              <li> <button className="text-start text-blue-500 hover:underline focus:outline-none">{translate("I did not receive the activation code", language)}</button> </li> {/* Changed text-left to text-start */}
            </ul>
          </div>
        </div>

        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <img src={pro} alt="Sign in illustration" className="h-4/5 w-4/5 object-contain" />
        </div>
      </div>
    </div>
    </>
  );
};

export default SignInPage;





