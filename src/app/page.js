// pages/index.js
"use client"
import React, { useState } from "react"
import "./home.css" // Import the CSS module
import { Image } from "next/image"
const Home = () => {
 const [query, setSearchValue] = useState("")
 const [data, setData] = useState(false)
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
     height: "60vh",
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
   <div
    style={{
     display: "flex",
     flexDirection: "row",
     marginTop: "-100px !important",
     justifyContent: "flex-start",
     gap: "100px",
     width: "100%",
     boxSizing: "border-box",
     flexWrap: "wrap",
     padding: "50px",
    }}
   >
    {" "}
    {data &&
     data.map((da, i) => {
      return (
       <div
        key={i}
        style={{
         display: "flex",
         flexDirection: "column",
        }}
       >
        <Image src={da.metadata.url} width={180} height={200}></Image>
        <span>{da.metadata.movie}</span>
       </div>
      )
     })}
   </div>
  </>
 )
}

export default Home
