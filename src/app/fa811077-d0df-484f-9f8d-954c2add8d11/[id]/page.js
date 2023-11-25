"use client"
import React, { useEffect, useState } from "react"
import "./src.css"
export default function hello({ params }) {
 const [data, setData] = useState(null)

 const getData = async (params) => {
  const apiUrl = `/api/b39d1b53-9356-4baa-8ca6-4f257b087329/`
  const query = params.id
  // Perform the GET request using the fetch API
  const res = await fetch(apiUrl, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ query }),
  })
   .then((response) => response.json())
   .then((result) => {
    console.log(result)
    // Update the state with the data received from the API
    setData(result)
   })
   .catch((error) => {
    // Handle errors if any
    console.error("Error fetching data:", error)
   })
 }
 useEffect(() => {
  // Define the URL for the GET request
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
  }
  console.log(data)
  console.log(JSON.stringify(data))
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
      console.log(url, i)
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
   <h2>Add New Image</h2>
   <form action="/addImage" method="post" enctype="multipart/form-data">
    <input type="file" name="image" accept="image/*" required />
    <input type="text" name="captions" placeholder="Enter caption" required />
    <button type="submit">Add Image</button>
   </form>
  </>
 )
}
