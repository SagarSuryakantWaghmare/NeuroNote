import { useState } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { CreateContentModal } from "./components/CreateContent";
import { PlusIcon } from "./icons/Plusicon";
import { ShareIcon } from "./icons/ShareIcon";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-4 md:p-6 md:ml-72 min-h-screen w-full bg-gray-50">
          <CreateContentModal open={modalOpen} onClose={() => { setModalOpen(false) }} />
          
          {/* Add padding for mobile hamburger menu */}
          <div className="md:max-w-7xl mx-auto pt-12 md:pt-0">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Card type="twitter" link="https://twitter.com/Cambridge_Uni/status/1927711602020610066" title="First Tweet" />
              <Card type="youtube" link="https://www.youtube.com/watch?v=xGQuT1wm2qk&ab_channel=NadiadwalaGrandson" title="First Video" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}