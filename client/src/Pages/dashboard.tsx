import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContent";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

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
  const [activeFilter, setActiveFilter] = useState<"all" | "youtube" | "twitter">("all");
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
        const shareUrl = `${window.location.origin}/share/${response.data.hash}`;        // Copy to clipboard
        try {
          await navigator.clipboard.writeText(shareUrl);
          toast.success('Share brain link copied to clipboard!', {
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#334155',
              border: '1px solid #e0f2fe',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            iconTheme: {
              primary: '#0ea5e9',
              secondary: '#ffffff',
            },
          });
        } catch (clipboardError) {
          // Fallback if clipboard API fails
          toast.success(`Share brain link created: ${shareUrl}`, {
            duration: 6000,
            style: {
              background: '#ffffff',
              color: '#334155',
              border: '1px solid #e0f2fe',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            iconTheme: {
              primary: '#0ea5e9',
              secondary: '#ffffff',
            },
          });
        }
        
        console.log("Share URL:", shareUrl);
      }
    } catch (error) {
      console.error("Error sharing content:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');      } else {
        toast.error("Failed to create share link. Please try again.", {
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#334155',
            border: '1px solid #e0f2fe',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
        });
      }
    } finally {
      setLoading(false);
    }  };

  console.log(contents);

  // Filter content based on active filter
  const filteredContents = contents.filter(content => {
    if (activeFilter === "all") return true;
    return content.type === activeFilter;
  });

  // Handle filter change
  const handleFilterChange = (filter: "all" | "youtube" | "twitter") => {
    setActiveFilter(filter);
  };  return (
    <>      <Toaster 
        position="top-center"
        containerStyle={{
          zIndex: 9999
        }}
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
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/50 to-cyan-50/80">
        <Sidebar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        
        {/* Main content area with responsive spacing */}
        <div className={`flex-1 transition-all duration-500 ${!isMobile ? "md:ml-72" : ""} min-h-screen`}>
          <div className="p-4 md:p-8 lg:p-12">
            <CreateContentModal 
              open={modalOpen} 
              onClose={() => { 
                setModalOpen(false);
                // Refresh content list when modal is closed
                fetchUserContent();
              }} 
            />

            {/* Enhanced header section */}
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 gap-6">
                <div className="flex flex-col">
                  <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-slate-800 via-sky-700 to-cyan-700 bg-clip-text text-transparent mb-2">
                    Your Second Brain
                  </h1>
                  <p className="text-slate-600 text-sm md:text-base">
                    Organize and access your saved content
                  </p>
                  
                  {/* Filter indicator with enhanced styling */}
                  {activeFilter !== "all" && (
                    <div className="flex items-center mt-4 p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-sky-100/50 shadow-sm max-w-fit">
                      <span className="text-sm text-slate-600 mr-3">Currently viewing:</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-700 rounded-xl text-sm font-semibold capitalize shadow-sm">
                        {activeFilter} content
                      </span>
                      <button
                        onClick={() => setActiveFilter("all")}
                        className="ml-3 px-3 py-1 text-sm text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-all duration-200"
                      >
                        Clear filter
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Action buttons with enhanced styling */}
                <div className="flex gap-3 md:gap-4">
                  <Button
                    onClick={() => { setModalOpen(true) }}
                    variant="primary"
                    text="Add Content"
                    startIcon={<PlusIcon />}
                  />
                  <Button
                    onClick={shareContent}
                    variant="secondary"
                    text="Share Brain"
                    startIcon={<ShareIcon />}
                  />
                </div>
              </div>

              {/* Content area with enhanced states */}
              {loading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                      <div className="absolute inset-0 border-4 border-sky-200 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-sky-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Loading your content</h3>
                    <p className="text-slate-500">Please wait while we fetch your saved items...</p>
                  </div>
                </div>
              ) : filteredContents.length === 0 ? (
                <div className="flex justify-center items-center min-h-96">
                  <div className="text-center bg-white/90 backdrop-blur-xl rounded-3xl border border-sky-100/50 shadow-xl p-12 max-w-lg mx-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      {activeFilter === "all" ? "No content yet" : `No ${activeFilter} content`}
                    </h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                      {activeFilter === "all" 
                        ? "Your second brain is empty! Start by adding your first piece of content to organize your digital knowledge."
                        : `You haven't saved any ${activeFilter} content yet. Add some to start building your ${activeFilter} collection.`
                      }
                    </p>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="px-8 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-2xl hover:from-sky-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
                    >
                      {activeFilter === "all" ? "Add Your First Content" : `Add ${activeFilter} Content`}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
                  {filteredContents.map((content) => (
                    <Card
                      key={content._id}
                      type={content.type}
                      link={content.link}
                      title={content.title}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}