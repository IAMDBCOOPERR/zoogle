"use client";
import React, { useState } from "react";
import "./home.css"; // Import the CSS module
const Home = () => {
  const [query, setSearchValue] = useState("");
  const [data, setData] = useState(false);
  const [loading, setLoadingSate] = useState(false);
  console.log(data);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoadingSate(true);
    // Make a POST request to the /api/search route with the search value
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      // Handle the response as needed
      const data = await response.json();
      console.log(data);
      setLoadingSate(false);
      setData(data);
      console.log("hello from metadata");
    } catch (error) {
      console.error("Error during search:", error);
    }
  };
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "2%",
          right: "0%",
          margin: "5px",
          padding: "15px",
          borderRadius: "5px",
          background: "black",
          color: "white",
        }}
      >
        Under development added just two tollywood movies
      </div>
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
        <center
          style={{
            fontSize: "20PX",
            marginBottom: "20px",
          }}
        >
          Find Indian meme templates
        </center>

        <form className="form-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            id="search"
            className="search-bar"
            name="query"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for images eg: Venky , train  , Raviteja , Police academy"
          />

          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      <center style={{ marginBottom: "20px" }}>
        <h4>
          Fronted - NextJs and Backend Nodejs + Postgresql( 500 images from two
          different movies are used) Images are hosted on Cloudinary and stored
          in Postgresql databse which is hosted on vercel
        </h4>
      </center>
      <main>
        {" "}
        <section className="news-feed">
          {" "}
          {!data && loading && (
            <center style={{ fontSize: "25px" }}>Loading...</center>
          )}
          {console.log(data)}
          {data &&
            data.map((da, i) => {
              return (
                <figure key={i}>
                  <img key={i} src={da.image_link}></img>
                  <figcaption>Caption : {da.caption}</figcaption>
                  <span>MovieName : Venky</span>
                </figure>
              );
            })}
        </section>
      </main>
    </>
  );
};

export default Home;
