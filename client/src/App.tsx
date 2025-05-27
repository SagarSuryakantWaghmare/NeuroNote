import { Button } from "./components/Button";
import { PlusIcon } from "./icons/Plusicon";
import { ShareIcon } from "./icons/ShareIcon";

export default function App() {
  return (
    <>
    <Button variant="primary" text="Add content" startIcon={<PlusIcon />} />
    <Button variant="secondary" text="Share" startIcon={<ShareIcon/>} />
    </>
  )
}