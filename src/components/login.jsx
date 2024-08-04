import React,{useState} from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
import { account } from '../../Appwrite/AppwriteConfig';

function Login(){

    const [user,setUser] = useState({
        email:"",
        password:""
    });

    const navigate = useNavigate();

    const handleLogin = (e) =>{
        e.preventDefault();
        try {
          const userAccount = account.createEmailPasswordSession(user.email,user.password);
          userAccount.then(
            function(response) {
              navigate("/home");
            },
            function(error){
              console.log(error);
            }
          )
        } catch (error) {
            console.log(error);
        }    
    };

    return (
        <>
            <div className='h-screen w-full'>
                <div className='align-middle flex flex-col justify-center items-center h-full'>
                    <div className='w-[60%] h-[45%] md:w-[35%] md:h-[50%] overflow-hidden shadow-2xl shadow-black '>
                        <div className='border-2 border-black p-3 rounded-xl h-full bg-transparent shadow-2xl shadow-black relative'>
                                <h1 className='flex justify-center font-serif text-2xl font-bold'>Login</h1>
                                <div className='flex flex-col justify-center items-center mt-3'>
                                    <input 
                                        type="email" 
                                        placeholder='Email' 
                                        value={user.email}
                                        onChange={(e)=>setUser({...user,email:e.target.value})}
                                        className='w-[80%] h-8 border-2 rounded-md outline-0 border-[#5C469C] p-2 mt-3' 
                                    />
                                    <input 
                                        type="password" 
                                        placeholder='Password' 
                                        value={user.password}
                                        onChange={(e)=>setUser({...user,password:e.target.value})}
                                        className='w-[80%] h-8 border-2 rounded-md outline-0 border-[#5C469C] p-2 mt-3' 
                                    />
                                </div>
                                <div className='flex flex-row justify-between items-center mt-3 w-[80%] mx-auto'>
                                    <button 
                                        className='mt-3 p-2 border-white bg-[#5C469C] rounded-lg text-white  font-bold hover:bg-[#896ce0] font-serif text-sm md:text-md'
                                        onClick={()=>(navigate("/signup"))}    
                                    >
                                        Sign Up
                                    </button>
                                    <button 
                                        className='mt-3 p-2 border-white bg-[#5C469C] rounded-lg text-white  font-bold hover:bg-[#896ce0] font-serif text-sm md:text-md'
                                        onClick={handleLogin}    
                                    >
                                        Login
                                    </button>
                                </div>
                                <div className="inline-flex items-center justify-center w-full">
                                    <hr className="w-64 h-px my-8 bg-[#5C469C] border-0 "/>
                                    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-[#a778d6] left-1/2 dark:text-white dark:bg-gray-900">or</span>
                                </div>
                                <div className='gap-6 flex justify-center flex-row'>
                                    <button className='w-8 h-8 hover:animate-bounce text-white'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z"></path></svg></button>
                                    <button className='w-8 h-8 hover:animate-bounce text-white'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path></svg></button>
                                    <button className='w-8 h-8 hover:animate-bounce text-white'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path></svg></button>
                                </div>                                
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login; //exporting the component so that it can be used in other files