import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/Plusicon'
const App = () => {
  return (
   <>
   <Button text="Sagar" startIcon={<PlusIcon/>} variant='primary' size='lg' onClick={()=>{}}  ></Button>
   </>
  )
}

export default App