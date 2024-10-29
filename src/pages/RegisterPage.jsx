import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate()
    return (
        <section className="h-screen bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
            <div className="max-w-5xl w-full p-10">
                <div className="bg-white rounded-lg shadow-lg dark:bg-neutral-800">
                    <div className="flex flex-col lg:flex-row">
                        <div className="px-4 py-6 lg:w-6/12 m-2">
                            <div className="text-center">
                                <img
                                    className="mx-auto w-48"
                                    src="https://i.pinimg.com/564x/3b/86/6a/3b866aa9f7817fcaaa860ebe20afbfcb.jpg"
                                    alt="logo"
                                />
                                <h4 className="mb-6 mt-1 text-xl font-semibold">
                                    We are The Lotus Team
                                </h4>
                            </div>

                            <form>

                                <div className="mb-4 ">
                                    <input
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                        placeholder="Username"
                                    />
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="password"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                        placeholder="Password"
                                    />
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="password"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                        placeholder="Confirm Password"
                                    />
                                </div>

                                

                               


                                <div className="text-center mb-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-2 rounded-md transition duration-200 hover:shadow-lg"
                                        
                                    >
                                        Register
                                    </button>
                                </div>



                                <div className="flex items-center justify-between ">
                                    <span className="mb-0 ">Do have an account? <span 
                                    onClick={()=>{navigate('/login')}}
                                    className="text-blue-600 hover:underline cursor-pointer">Login</span></span>
                                </div>
                            </form>
                        </div>

                        <div
                            className="hidden lg:flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                            style={{
                                background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                        >
                            <div className="px-4 py-6 text-white">
                                <h4 className="mb-6 text-xl font-semibold">We are more than just a company</h4>
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;
