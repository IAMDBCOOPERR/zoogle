"use client"
//this is for /venky or writing for captions
import React, { useEffect, useState } from "react"
import "./src.css"
export default function Hello({ params }) {
 const [data, setData] = useState(null)
 var query = params.id

 const getData = async (params) => {
  const apiUrl = `/api/b39d1b53-9356-4baa-8ca6-4f257b087329/`
  console.log(params)
  const res = await fetch(apiUrl, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ query }),
  })
   .then((response) => response.json())
   .then((result) => {
    // Update the state with the data received from the API
    setData(result)
   })
   .catch((error) => {
    // Handle errors if any
    console.error("Error fetching data:", error)
   })
 }
 useEffect(() => {
  getData(params)
 }, [])

 function sendData() {
  const captionsData = []

  document.querySelectorAll(".in").forEach((input) => {
   const movie = input.dataset.movie
   const url = input.dataset.url
   const caption = input.value
   captionsData.push({ movie, url, caption })
  })

  const data = {
   captions: captionsData,
   movie: query,
  }
  fetch("/api/upload", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(data),
  })
   .then((response) => response.json())
   .then((data) => {
    console.log("Success:", data)
    // Handle the response data as needed
   })
   .catch((error) => {
    console.error("Error:", error)
    // Handle errors
   })
 }
 return (
  <>
   <div
    style={{
     width: "100%",
     height: "auto",
     display: "flex",
     flexDirection: "row",
     flexWrap: "wrap",
     gap: "10px",
    }}
   >
    {data &&
     data.url.map((url, i) => {
      return (
       <>
        {" "}
        <div
         style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
        >
         <img src={url} alt="Image" width={200} />
         <input
          type="text"
          className="in"
          style={{
           marginTop: "10px",
          }}
          data-movie={data.query}
          data-url={url}
          placeholder="Enter captions for this image"
          required
          multiple
         />
        </div>
       </>
      )
     })}
   </div>

   <button class="btn" onClick={sendData}>
    Save Captions
   </button>
  </>
 )
}
