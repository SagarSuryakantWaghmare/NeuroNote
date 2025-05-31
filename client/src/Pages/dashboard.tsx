import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContent";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  title: string;
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
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
  }, []);  // Function to fetch user content - moved outside useEffect to reuse it
  const fetchUserContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }        
      const response = await axios.get(`/api/v1/content`, {
        headers: {
          Authorization: token
        }
      });

      console.log("Content response:", response.data);

      if (response.data && response.data.content) {
        console.log("Received contents:", response.data.content);
        setContents(response.data.content);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserContent();
  }, [navigate]);
  console.log(contents);  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className={`p-4 md:p-6 ${!isMobile ? "md:ml-72" : "mt-16"} min-h-screen w-full bg-gray-50`}>
          <CreateContentModal 
            open={modalOpen} 
            onClose={() => { 
              setModalOpen(false);
              // Refresh content list when modal is closed
              fetchUserContent();
            }} 
          />

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
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg">Loading your content...</p>
              </div>
            ) : contents.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg">No content available. Click "Add content" to add your first item.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {contents.map((content) => (
                  <Card
                    key={content._id}
                    type={content.type}
                    link={content.link}
                    title={content.title}
                  />
                ))}
                {/* <Card type="youtube" title="Youtube main video" link="https://www.youtube.com/watch?v=xGQuT1wm2qk"/> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}