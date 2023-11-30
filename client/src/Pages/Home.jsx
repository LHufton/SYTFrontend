import { useNavigate } from 'react-router-dom'
import React from 'react'

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="homeContainer">
      <div className="text-section">
        <h1 className="homeH1"> Welcome home!</h1>
        <h2 className="homeh2"> What's on your mind?</h2>
        <section className="welcome-signin"></section>
      </div>
    </div>
  )
}

export default Home
