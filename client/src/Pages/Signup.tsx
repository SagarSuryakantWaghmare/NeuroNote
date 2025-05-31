import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
                alert("Please enter both username and password");
                setIsLoading(false);
                return;
            }
            
            console.log("Sending signup request with:", { username, password });
              // Use the proxy configured in vite.config.ts
            const response = await axios({
                method: 'post',
                url: `/api/v1/signup`,
                data: { username, password },
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            console.log("Signup response:", response.data);
            alert("Signup successful!");
            
            // Reset form and navigate to sign in
            if (usernameRef.current) usernameRef.current.value = "";
            if (passwordRef.current) passwordRef.current.value = "";
            
            // Navigate to sign in page after successful signup
            navigate('/signin');
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white  rounded-xl border min-w-48 p-8">
                <Input ref={usernameRef} placeholder="Username" />
                <Input ref={passwordRef} placeholder="Password" />
                <div className="flex justify-center pt-4">
                    <Button onClick={handleSignup} variant="primary" text="Signup" fullwidth={true} loading={isLoading}/>
                </div>
            </div>
        </div>
    )
}