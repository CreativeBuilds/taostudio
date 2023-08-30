import React, { useState } from "react";
import Button from "../components/Button";
import { images } from "../data/images";
import ImageCard from "../components/ImageCard";
import { motion } from "framer-motion";
import { handleDownloadImage } from "../utils/imagefns";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.01,
      staggerChildren: 0.025,
    },
  },
  exit: {
    transition: {
      delayChildren: 0.01,
      staggerChildren: 0.025,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 1 },
  animate: {
    opacity: 1,
    translateY: 0,
  },
  exit: {
    opacity: 0,
  },
};

const Images = () => {
  const [selectedImage, setSelectedImage] = useState<Image | undefined>();
  const navigate = useNavigate();

  //Use radio button if need im using div element and setting the state
  const handleImageSelection = (image: Image) => {
    setSelectedImage((prev) => {
      if (!prev || prev.url !== image.url) {
        return image;
      } else if (prev.url === image.url) {
        return undefined;
      }
    });
  };

  return (
    <main className="wrapper flex-1 w-full flex  flex-col  items-center justify-center">
      <motion.ul
        variants={container}
        initial="hidden"
        animate="animate"
        exit="exit"
        className="columns-2 lg:columns-3 xl:columns-4 gap-x-4"
      >
        {images.map((img, index) => {
          return (
            <motion.li
              onClick={() => handleImageSelection(img)}
              variants={item}
              key={img.title}
              className={twMerge(
                "mb-4 rounded-2xl overflow-hidden hover:cursor-pointer",
                selectedImage?.id === img.id
                  ? "outline-2 outline outline-white"
                  : ""
              )}
            >
              <ImageCard image={img} index={index} />
            </motion.li>
          );
        })}
      </motion.ul>

      <motion.div
        variants={container}
        initial="hidden"
        animate="animate"
        exit="exit"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(30, 30, 30, 0.01) 0%, rgba(30, 30, 30, 0.45) 25%, #1E1E1E 70%)",
        }}
        className="flex justify-center z-50 mx-auto gap-4 items-end pb-6 lg:pb-10 h-[12rem] fixed bottom-0 w-full px-4 "
      >
        <Button
          variants={item}
          size={"icon"}
          className="w-fit"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            className="text-white w-5 h-5"
          >
            <path
              d="M19.4022 2.19849L22.4609 5.25713L20.1292 7.58985L17.0705 4.53121L19.4022 2.19849ZM8.19946 16.4599H11.2581L18.6875 9.03047L15.6289 5.97183L8.19946 13.4013V16.4599Z"
              fill="white"
            />
            <path
              d="M19.4143 19.5186H8.36038C8.33388 19.5186 8.30635 19.5287 8.27984 19.5287C8.24619 19.5287 8.21255 19.5196 8.17788 19.5186H5.14066V5.2449H12.1215L14.1606 3.20581H5.14066C4.0161 3.20581 3.10156 4.11932 3.10156 5.2449V19.5186C3.10156 20.6441 4.0161 21.5576 5.14066 21.5576H19.4143C19.9551 21.5576 20.4738 21.3428 20.8562 20.9604C21.2386 20.578 21.4534 20.0594 21.4534 19.5186V10.6811L19.4143 12.7202V19.5186Z"
              fill="white"
            />
          </svg>
        </Button>

        {selectedImage && (
          <>
            <Button
              variants={item}
              size={"icon"}
              onClick={() => navigate(`/images/${selectedImage.id}`)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                className="w-5 h-5"
              >
                <path
                  d="M25.5614 22.497C24.5162 22.497 23.5811 22.9095 22.8659 23.5559L13.0607 17.8488C13.1295 17.5325 13.1845 17.2162 13.1845 16.8861C13.1845 16.5561 13.1295 16.2398 13.0607 15.9235L22.7559 10.2714C23.4985 10.959 24.4749 11.3853 25.5614 11.3853C27.8442 11.3853 29.687 9.5425 29.687 7.25966C29.687 4.97681 27.8442 3.13403 25.5614 3.13403C23.2785 3.13403 21.4357 4.97681 21.4357 7.25966C21.4357 7.58971 21.4907 7.90601 21.5595 8.2223L11.8643 13.8744C11.1217 13.1868 10.1453 12.7605 9.05885 12.7605C6.77601 12.7605 4.93323 14.6033 4.93323 16.8861C4.93323 19.169 6.77601 21.0117 9.05885 21.0117C10.1453 21.0117 11.1217 20.5854 11.8643 19.8978L21.6558 25.6187C21.587 25.9075 21.5457 26.21 21.5457 26.5126C21.5457 28.7267 23.3473 30.5282 25.5614 30.5282C27.7754 30.5282 29.577 28.7267 29.577 26.5126C29.577 24.2985 27.7754 22.497 25.5614 22.497Z"
                  fill="white"
                />
              </svg>
            </Button>
            <Button
              variants={item}
              size={"icon"}
              onClick={() => handleDownloadImage(selectedImage.url)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="text-white w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23 22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22C1 21.4477 1.44772 21 2 21H22C22.5523 21 23 21.4477 23 22Z"
                    fill="white"
                  ></path>{" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.3099 18.6881C12.5581 19.3396 11.4419 19.3396 10.6901 18.6881L5.87088 14.5114C4.47179 13.2988 5.32933 11 7.18074 11L9.00001 11V3C9.00001 1.89543 9.89544 1 11 1L13 1C14.1046 1 15 1.89543 15 3L15 11H16.8193C18.6707 11 19.5282 13.2988 18.1291 14.5114L13.3099 18.6881ZM11.3451 16.6091C11.7209 16.9348 12.2791 16.9348 12.6549 16.6091L16.8193 13H14.5C13.6716 13 13 12.3284 13 11.5V3L11 3V11.5C11 12.3284 10.3284 13 9.50001 13L7.18074 13L11.3451 16.6091Z"
                    fill="white"
                  ></path>{" "}
                </g>
              </svg>
            </Button>
          </>
        )}
      </motion.div>
    </main>
  );
};

export default Images;
