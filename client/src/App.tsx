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
        <div className="p-6 ml-72 min-h-screen w-full bg-gray-50">
          <CreateContentModal open={modalOpen} onClose={() => { setModalOpen(false) }} />
          
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Your Content</h1>
              <div className="flex gap-3">
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
            
            <div className="flex  gap-6">
              <Card type="twitter" link="https://twitter.com/Cambridge_Uni/status/1927711602020610066" title="First Tweet" />
              <Card type="youtube" link="https://www.youtube.com/watch?v=xGQuT1wm2qk&ab_channel=NadiadwalaGrandson" title="First Video" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}