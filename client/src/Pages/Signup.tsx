import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { NeuroIcon } from "../icons/NeuroIcon";
import toast, { Toaster } from 'react-hot-toast';
export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();      async function handleSignup() {
        try {
            setIsLoading(true);
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            
            if (!username || !password) {
                toast.error("Please enter both username and password");
                setIsLoading(false);
                return;
            }
            
            console.log("Sending signup request with:", { username, password });
            const response = await axios({
                method: 'post',
                url: `/api/v1/signup`,
                data: { username, password },
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            console.log("Signup response:", response.data);
            toast.success("Account created successfully! Redirecting to sign in...");

            // Reset form and navigate to sign in
            if (usernameRef.current) usernameRef.current.value = "";
            if (passwordRef.current) passwordRef.current.value = "";
            
            // Navigate to sign in page after successful signup with delay
            setTimeout(() => {
                navigate('/signin');
            }, 1500);
        } catch (error: any) {
            console.error("Signup error:", error);
            
            // More specific error handling
            if (error.response?.status === 409) {
                toast.error("Username already exists. Please choose a different one.");
            } else if (error.response?.status === 400) {
                toast.error("Please provide valid username and password.");
            } else {
                toast.error("Signup failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }      return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 flex items-center justify-center p-6">
            <Toaster 
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#ffffff',
                        color: '#334155',
                        border: '1px solid #e0f2fe',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    },
                    success: {
                        iconTheme: {
                            primary: '#0ea5e9',
                            secondary: '#ffffff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#ffffff',
                        },
                    },
                }}
            />
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="text-sky-600 h-12 w-12">
                            <NeuroIcon />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-sky-800 to-cyan-800 bg-clip-text text-transparent mb-2">
                        Join NeuroNote
                    </h1>
                    <p className="text-slate-600">Create your account and start building your second brain</p>
                </div>

                {/* Sign Up Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-sky-100 p-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Username
                            </label>
                            <input
                                ref={usernameRef}
                                type="text"
                                placeholder="Choose a username"
                                className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 bg-sky-50/50"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder="Create a secure password"
                                className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 bg-sky-50/50"
                            />
                        </div>

                        <button
                            onClick={handleSignup}
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-sky-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        <div className="text-center">
                            <p className="text-slate-600">
                                Already have an account?{' '}
                                <Link 
                                    to="/signin" 
                                    className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Preview */}
                <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-xl p-6 mt-6 border border-sky-100">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 text-center">What you'll get:</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center text-slate-600">
                            <svg className="w-4 h-4 text-sky-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Unlimited content storage
                        </div>
                        <div className="flex items-center text-slate-600">
                            <svg className="w-4 h-4 text-sky-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Smart organization with AI
                        </div>
                        <div className="flex items-center text-slate-600">
                            <svg className="w-4 h-4 text-sky-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Beautiful shareable collections
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <Link 
                        to="/" 
                        className="text-slate-500 hover:text-sky-600 transition-colors text-sm"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}