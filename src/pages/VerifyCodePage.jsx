import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../apis/userApi';

const VerifyCodePage = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [createUser, { isLoading }] = useCreateUserMutation();

    // Hàm validate
    const validateForm = () => {
        const newErrors = {};
        if (!verificationCode.trim()) {
            newErrors.verificationCode = 'Mã xác minh không được để trống.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Dừng nếu có lỗi
        setErrors({}); // Xóa lỗi trước đó

        const token = localStorage.getItem('registerToken');
        try {
            const response = await createUser({ token, verificationCode }).unwrap();
            setSuccessMessage('Tài khoản được tạo thành công!');
            localStorage.removeItem('registerToken');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('Verification failed:', error);
            setErrors({ global: 'Mã xác minh không hợp lệ.' });
        }
    };

    return (
        <section className="h-screen bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
            
            <div className="max-w-5xl w-full p-10">
            {successMessage && (
                                <div className="text-green-500 text-lg text-center my-4">
                                    {successMessage}
                                </div>
                            )}
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

                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                        placeholder="Verification code"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                    />
                                    {errors.verificationCode && (
                                        <p className="text-red-500 text-sm mt-1">{errors.verificationCode}</p>
                                    )}
                                </div>

                                <div className="text-center mb-4">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-2 rounded-md transition duration-200 hover:shadow-lg"
                                    >
                                        {isLoading ? 'Submitting...' : 'Submit'}
                                    </button>
                                    {errors.global && (
                                        <p className="text-red-500 text-sm mt-2">{errors.global}</p>
                                    )}
                                </div>
                            </form>

                            

                            <div className="flex items-center justify-between">
                                <span>
                                    Do have an account?{' '}
                                    <span
                                        onClick={() => navigate('/login')}
                                        className="text-blue-600 hover:underline cursor-pointer"
                                    >
                                        Login here
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div
                            className="hidden lg:flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                            style={{
                                background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                            }}
                        >
                            <div className="px-4 py-6 text-white">
                                <h4 className="mb-6 text-xl font-semibold">We are more than just a company</h4>
                                <p className="text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifyCodePage;
