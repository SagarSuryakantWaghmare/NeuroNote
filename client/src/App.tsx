import { useState } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { CreateContentModal } from "./components/CreateContent";
import { PlusIcon } from "./icons/Plusicon";
import { ShareIcon } from "./icons/ShareIcon";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  const [modalOpen, setModelOpen] = useState(true);
  return (
    <>
      <div >
        <Sidebar />
        <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2 ">
          <CreateContentModal open={modalOpen} onClose={() => { setModelOpen(false) }} />
          <div className="p-4 ">
            <div className="flex justify-end gap-4">
              <Button onClick={() => { setModelOpen(true) }} variant="primary" text="Add content" startIcon={<PlusIcon />} />
              <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />} />
            </div>
            <div className="flex gap-4">
              <Card type="twitter" link="https://twitter.com/Cambridge_Uni/status/1927711602020610066" title="First Tweet" />
              <Card type="youtube" link="https://www.youtube.com/watch?v=xGQuT1wm2qk&ab_channel=NadiadwalaGrandson" title="First Video" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}