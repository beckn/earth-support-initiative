import React, { useState, useEffect } from "react";
import { getImageUrl } from "../services/Apicall";
import { Image } from "@chakra-ui/react";
import onestdefaultImage from "../assets/onestdefault.png";
import { useTranslation } from "react-i18next";

function ImageLoader({ imageId, src, headers }) {
  const [imageUrl, setImageUrl] = useState(imageId);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
  //  setIsLoading(true);
  /*  getImageUrl(imageId)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error loading image:", error);
        setImageError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });*/
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (!imageId) {
    return (
      <Image
        src={onestdefaultImage}
        alt="Image"
        style={{
          maxWidth: "100%",
          maxHeight: "120px",
          overflow: "hidden",
          objectFit: "cover",
          minHeight: "100px",
          borderRadius: headers ? "20%" : "",
        }}
        p="10px"
        loading="lazy"
      />
    );
  } else if (imageId === null) {
    return (
      <div
        style={{
          background: "white",
          display: "inline-block",
        }}
      >
        <img
          src={onestdefaultImage}
          alt="Image"
          style={{
            maxWidth: "100%",
            maxHeight: "120px",
            overflow: "hidden",
            objectFit: "cover",
            minHeight: "100px",
            borderRadius: headers ? "20%" : "",
          }}
          p="10px"
          loading="lazy"
        />
      </div>
    );
  } else {
    return (
      <div>
        <Image
          src={imageId}
          alt=" Image"
          style={{
            maxWidth: "100%",
            maxHeight: "120px",
            overflow: "hidden",
            objectFit: "cover",
            minHeight: "100px",
            borderRadius: headers ? "20%" : "",
          }}
          p="10px"
          loading="lazy"
          onError={handleImageError}
        />
      </div>
    );
  }
}

export default ImageLoader;
