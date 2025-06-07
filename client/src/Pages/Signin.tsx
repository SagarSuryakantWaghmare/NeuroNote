import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { NeuroIcon } from "../icons/NeuroIcon";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    async function handleSignin() {
        try {
            setIsLoading(true);
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            
            if (!username || !password) {
                alert("Please enter both username and password");
                setIsLoading(false);
                return;
            }
              const response = await axios.post(`/api/v1/signin`, {
                username,
                password
            });            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
      return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="text-sky-600 h-12 w-12">
                            <NeuroIcon />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-sky-800 to-cyan-800 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-slate-600">Sign in to your NeuroNote account</p>
                </div>

                {/* Sign In Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-sky-100 p-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Username
                            </label>
                            <input
                                ref={usernameRef}
                                type="text"
                                placeholder="Enter your username"
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
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 bg-sky-50/50"
                            />
                        </div>

                        <button
                            onClick={handleSignin}
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-sky-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        <div className="text-center">
                            <p className="text-slate-600">
                                Don't have an account?{' '}
                                <Link 
                                    to="/signup" 
                                    className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
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