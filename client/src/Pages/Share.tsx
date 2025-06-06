import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import axios from "axios";

interface ContentItem {
  _id: string;
  link: string;
  title: string;
  type: "twitter" | "youtube";
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading shared brain...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <a 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {shareData?.username}'s Brain
              </h1>
              <p className="text-gray-600 mt-1">
                Shared collection of {shareData?.content.length || 0} items
              </p>
            </div>
            <a 
              href="/" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your Own
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
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
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No content shared yet
            </h2>
            <p className="text-gray-500">
              This brain doesn't have any content to display.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500">
            <p>Powered by NeuroNote - Your Second Brain</p>
          </div>
        </div>
      </div>
    </div>
  );
}
