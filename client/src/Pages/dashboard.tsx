import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContent";
import { PlusIcon } from "../icons/Plusicon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

// Define Twitter's widget JS API (same as in Card.tsx)
declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (element?: HTMLElement) => Promise<void>;
      };
    };
  }
}


interface ContentItem {
  _id: string;
  link: string;
  type: "twitter" | "youtube";
  userId: string;
  tags: string[];
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  // Check if we're on mobile for layout adjustments
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Update mobile state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
    // Reload Twitter widgets on window resize for better responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.twttr?.widgets) {
        setTimeout(() => {
          window.twttr.widgets.load();
        }, 100);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fetch user content when component mounts
  useEffect(() => {
    const fetchUserContent = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          // Redirect to login if no token
          navigate('/signin');
          return;
        }
        
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: token
          }
        });
        
        if (response.data && response.data.content) {
          setContents(response.data.content);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        // If unauthorized, redirect to login
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/signin');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserContent();
  }, [navigate]);
  
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className={`p-4 md:p-6 ${!isMobile ? "md:ml-72" : "mt-16"} min-h-screen w-full bg-gray-50`}>
          <CreateContentModal open={modalOpen} onClose={() => { setModalOpen(false) }} />
          
          {/* Content area with proper spacing for top nav on mobile */}
          <div className="md:max-w-7xl mx-auto md:pt-0">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Your Content</h1>
              <div className="flex gap-2 md:gap-3">
                <Button 
                  onClick={() => { setModalOpen(true) }} 
                  variant="primary" 
                  text="Add content" 
                  startIcon={<PlusIcon />} 
                />
                <Button 
                  variant="secondary" 
                  text="Share Brain" 
                  startIcon={<ShareIcon />} 
                />
                
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              <Card type="twitter" link="https://twitter.com/Cambridge_Uni/status/1927711602020610066" title="First Tweet" />
              <Card type="youtube" link="https://www.youtube.com/watch?v=xGQuT1wm2qk&ab_channel=NadiadwalaGrandson" title="First Video" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}