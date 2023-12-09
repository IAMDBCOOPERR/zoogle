import React, { useEffect, useState } from "react"
export default function dashboard({ params }) {
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
    
}
