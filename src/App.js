import { useState } from "react";

import React from "react";
import { useEffect } from "react";
import ImageCard from "./Components/ImageCard";
import ImageSearch from "./Components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXAPAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setisLoading(false);
      })
      .catch((error) => console.log(error));
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
