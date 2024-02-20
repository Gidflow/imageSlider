
import React from 'react'
import Slider from './components/Slider'

const App = () => {
  return (
    <div>
      <Slider url={"https://picsum.photos/v2/list"} limit={10} page={"1"}/>
    </div>
  )
}

export default App