import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import axios from "axios";

interface ContentItem {
  _id: string;
  link: string;
  title: string;
  type: "twitter" | "youtube" | "linkedin" | "instagram";
  userId: string;
  tags: string[];
}

interface ShareData {
  username: string;
  content: ContentItem[];
}

export function Share() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        setLoading(true);
        if (!shareLink) {
          setError("Invalid share link");
          return;
        }

        const response = await axios.get(`/api/v1/brain/${shareLink}`);
        
        if (response.data) {
          setShareData({
            username: response.data.username,
            content: response.data.content
          });
        }
      } catch (error) {
        console.error("Error fetching shared content:", error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setError("Share link not found or expired");
          } else {
            setError("Failed to load shared content");
          }
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-sky-100/50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">Loading shared brain...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-sky-100/50">
          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-sky-800 bg-clip-text text-transparent mb-2">Oops!</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-sky-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-sky-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-sky-800 to-cyan-800 bg-clip-text text-transparent">
                {shareData?.username}'s Brain
              </h1>
              <p className="text-slate-600 mt-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Shared collection of {shareData?.content.length || 0} items
              </p>
            </div>
            <a 
              href="/" 
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-sky-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Create Your Own
            </a>
          </div>
        </div>
      </div>      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {shareData?.content && shareData.content.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {shareData.content.map((content) => (
              <Card
                key={content._id}
                type={content.type}
                link={content.link}
                title={content.title}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-sky-100/50 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">
                No content shared yet
              </h2>
              <p className="text-slate-600">
                This brain doesn't have any content to display.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-sky-100/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-600 flex items-center justify-center">
              <span>Powered by</span>
              <span className="ml-2 font-bold bg-gradient-to-r from-sky-700 to-cyan-700 bg-clip-text text-transparent">
                NeuroNote
              </span>
              <span className="ml-2">- Your Second Brain</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
