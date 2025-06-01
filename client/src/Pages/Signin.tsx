import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input ref={usernameRef} placeholder="Username" />
                <Input ref={passwordRef} placeholder="Password" type="password" />
                <div className="flex justify-center pt-4">
                    <Button onClick={handleSignin} variant="primary" text="Sign In" fullwidth={true} loading={isLoading}/>
                </div>
            </div>
        </div>
    )
}