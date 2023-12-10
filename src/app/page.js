"use client"
import React, { useState } from "react"
import "./home.css" // Import the CSS module
const Home = () => {
 const [query, setSearchValue] = useState("")
 const [data, setData] = useState([])
 console.log(data)

 const handleSearchSubmit = async (e) => {
  e.preventDefault()

  // Make a POST request to the /api/search route with the search value
  try {
   const response = await fetch("/api/search", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
   })

   // Handle the response as needed
   const data = await response.json()
   console.log(data)
   setData(data)
   console.log("hello from metadata")
  } catch (error) {
   console.error("Error during search:", error)
  }
 }
 const handleInputChange = (e) => {
  setSearchValue(e.target.value)
 }

 return (
  <>
   <div
    style={{
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     width: "100%",
     height: "40vh",
     flexDirection: "column",
    }}
   >
    <h1 className="title">ZOOGLE</h1>

    <form className="form-container" onSubmit={handleSearchSubmit}>
     <input
      type="text"
      id="search"
      className="search-bar"
      name="query"
      value={query}
      onChange={handleInputChange}
      placeholder="Search for templates"
     />

     <button type="submit" className="search-button">
      Search
     </button>
    </form>
   </div>
   <main>
    {" "}
    <section className="news-feed">
     {" "}
     {console.log(data)}
     {data &&
      data.map((da, i) => {
       return <img key={i} src={da.image_link}></img>
      })}
    </section>
   </main>
  </>
 )
}

export default Home
