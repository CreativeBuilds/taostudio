import React, { useRef } from "react";
import Button from "./Button";

import {
  handleDownloadImage,
  handleShareImage,
  handleViewImage,
} from "../utils/imagefns";
import { useNavigate } from "react-router-dom";

const ImageCard = ({ image, index }: { image: Image; index: number }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleImageShareAndNavigate = () => {
    // handleShareImage(image.img);

    // Paste code of copy to clipboard if needed

    navigate(`/images/${image.id}`);
  };

  return (
    <div
      ref={divRef}
      tabIndex={index}
      className="w-full group before:contents-[''] before:inset-0  before:absolute before:w-full before:h-full before:bg-hover-mask before:z-1 md:hover:before:visible before:invisible   ease-in-out duration-300 shadow-card-inset overflow-hidden h-full relative"
    >
      <div className="absolute hidden top-4 group-focus-within:visible group-focus-within:opacity-100  group-hover:visible group-hover:opacity-100 opacity-0 invisible duration-300 ease-in-out right-4 md:flex flex-col gap-2">
        <Button size={"icon"} onClick={() => handleDownloadImage(image.url)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            className="w-5 h-5"
          >
            <path
              d="M24.9911 13.511H22.6768V6.23315C22.6768 5.43259 22.0218 4.77759 21.2212 4.77759H15.3989C14.5984 4.77759 13.9434 5.43259 13.9434 6.23315V13.511H11.629C10.3336 13.511 9.67855 15.083 10.5956 16L17.2766 22.6811C17.8443 23.2487 18.7613 23.2487 19.329 22.6811L26.01 16C26.927 15.083 26.2866 13.511 24.9911 13.511ZM8.12109 28.0667C8.12109 28.8672 8.7761 29.5222 9.57666 29.5222H27.0435C27.844 29.5222 28.499 28.8672 28.499 28.0667C28.499 27.2661 27.844 26.6111 27.0435 26.6111H9.57666C8.7761 26.6111 8.12109 27.2661 8.12109 28.0667Z"
              fill="white"
            />
          </svg>
        </Button>
        <Button
          size={"icon"}
          onClick={() => {
            handleViewImage(image.url);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            className="w-5 h-5"
          >
            <path
              d="M12.2013 4.2583H3.68652V12.773L6.75183 9.70773L11.3498 14.476L13.9042 11.9216L9.13596 7.32361L12.2013 4.2583ZM22.419 4.2583L25.4843 7.32361L20.716 11.9216L23.2704 14.476L27.8684 9.87803L30.9337 12.773V4.2583H22.419ZM23.2704 21.2878L20.716 23.8422L25.314 28.4402L22.419 31.5055H30.9337V22.9907L27.8684 26.056L23.2704 21.2878ZM11.3498 21.2878L6.75183 25.8857L3.68652 22.9907V31.5055H12.2013L9.13596 28.4402L13.9042 23.8422L11.3498 21.2878Z"
              fill="white"
            />
          </svg>
        </Button>
        <Button size={"icon"} onClick={handleImageShareAndNavigate}>
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
      </div>

      <img src={image.url} alt={image.title} />
    </div>
  );
};

export default ImageCard;
