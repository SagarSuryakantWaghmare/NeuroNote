import React from 'react'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/Plusicon'

const App = () => {
  return (
   <>
   <Button startIcon={<PlusIcon/>} variant="primary" text="share"/>
   <Button variant='secondary' text="Add content"/>
   </>
  )
}

export default App