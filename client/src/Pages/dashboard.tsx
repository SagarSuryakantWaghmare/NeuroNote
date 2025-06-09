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

  // Function to share content
  const shareContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/signin');
        return;
      }
      
      const response = await axios.post('/api/v1/brain/share', 
        { share: true }, // Request body
        {
          headers: {
            Authorization: token
          }
        }
      );
      
      if (response.data && response.data.hash) {
        const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
        
        // Copy to clipboard
        try {
          await navigator.clipboard.writeText(shareUrl);
          alert(`Share link copied to clipboard!\n${shareUrl}`);
        } catch (clipboardError) {
          // Fallback if clipboard API fails
          alert(`Share link: ${shareUrl}`);
        }
        
        console.log("Share URL:", shareUrl);
      }
    } catch (error) {
      console.error("Error sharing content:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
      } else {
        alert("Failed to create share link. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(contents);return (
    <>
      <div className="flex">
        <Sidebar />
        <div className={`p-4 md:p-6 ${!isMobile ? "md:ml-72" : "mt-16"} min-h-screen w-full bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50`}>
          <CreateContentModal 
            open={modalOpen} 
            onClose={() => { 
              setModalOpen(false);
              // Refresh content list when modal is closed
              fetchUserContent();
            }} 
          />

          {/* Content area with proper spacing for top nav on mobile */}
          <div className="md:max-w-7xl mx-auto md:pt-0">            <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-800 via-sky-800 to-cyan-800 bg-clip-text text-transparent">Your Content</h1>
              <div className="flex gap-2 md:gap-3">
                <Button
                  onClick={() => { setModalOpen(true) }}
                  variant="primary"
                  text="Add content"
                  startIcon={<PlusIcon />}
                />                <Button
                  onClick={shareContent}
                  variant="secondary"
                  text="Share Brain"
                  startIcon={<ShareIcon />}
                />
              </div>
            </div>
              {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                  <p className="text-slate-600 text-lg">Loading your content...</p>
                </div>
              </div>
            ) : contents.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center bg-white rounded-2xl shadow-lg border border-sky-100 p-8 max-w-md">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">No content yet</h3>
                  <p className="text-slate-600 mb-4">Start building your second brain by adding your first piece of content.</p>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="px-6 py-2 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-lg hover:from-sky-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Add Your First Content
                  </button>
                </div>
              </div>            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
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