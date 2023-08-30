import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../components/Button";
import CustomToggle from "../components/inputs/CustomToggle";
import { useParams } from "react-router-dom";
import { images } from "../data/images";
import { handleDownloadImage } from "../utils/imagefns";
import ImageCard from "../components/ImageCard";

type ImagePrompt = {
  prompt?: string;
  negativePrompt?: string;
  selectedAspectRatio?: { label: string; value: string };
};

const ImageDetails = () => {
  let { id } = useParams();
  //Set the image name here inside state handle add update name api in handleUpdate fns
  const [imageName, setImageName] = useState("UnnammedA83702");
  const [username, setUsername] = useState("User111");
  const [imagePrompt, setImagePrompt] = useState<ImagePrompt | undefined>({
    prompt: "",
    negativePrompt: "",
    selectedAspectRatio: { label: "", value: "" },
  });
  const [isImgToImg, setIsImgToImg] = useState(false);
  const [generateImages, setGenerateImages] = useState(false);

  const [editModes, setEditModes] = useState({
    prompt: false,
    negativePrompt: false,
    username: false,
    imageName: false,
  });

  const handleEditToggle = useCallback(({ name }: { name: string }) => {
    setEditModes((prevEditModes) => ({
      ...prevEditModes,
      [name]: !prevEditModes[name], // Toggle the edit mode for the specific field
    }));
  }, []);

  const image = images.find((item) => item.id === Number(id));

  const handleGenerateImage = () => {
    setGenerateImages(true);
    return;
  };

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setImagePrompt((prev) => {
      const updatedImagePrompt = {
        ...prev,
        [name]: value,
      };
      localStorage.setItem("imagePrompt", JSON.stringify(updatedImagePrompt));

      return updatedImagePrompt;
    });
  };

  useEffect(() => {
    const previousImagePrompt = localStorage.getItem("imagePrompt");
    if (previousImagePrompt) {
      setImagePrompt(JSON.parse(previousImagePrompt));
    }
  }, []);

  if (!image) return null;

  return (
    <main className="wrapper flex flex-col gap-10 max-w-6xl mx-auto ">
      <div
        style={
          {
            "--bg-color": "linear-gradient(#171717, #171717)",
            "--border-color": `linear-gradient(0deg, #FFFFFF50, #FFFFFF00)`,
          } as CSSProperties
        }
        className={twMerge(
          "grid sm:grid-cols-[1fr_auto] items-center gap-2 py-3 px-4 rounded-2xl text-2xl flex-wrap",
          "border-[.5px] [background:padding-box_var(--bg-color),border-box_var(--border-color)] border-transparent"
        )}
      >
        <input
          value={imageName}
          type="text"
          name="imageName"
          onChange={(e) => setImageName(e.target.value)}
          disabled={editModes.imageName ? false : true}
          className={twMerge(
            "text-foreground text-center text-lg lg:text-2xl w-full  py-1 bg-transparent duration-300 ease-in-out",
            editModes.imageName ? "ring-2 rounded-md ring-white" : ""
          )}
        />
        <Button
          onClick={() => handleEditToggle({ name: "imageName" })}
          className="ml-auto w-full aspect-auto md:aspect-square md:w-fit !p-2"
          size={"icon"}
        >
          {editModes.imageName ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M4 12.6111L8.92308 17.5L20 6.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              width="32"
              height="31"
              viewBox="0 0 32 31"
              fill="none"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.1484 2.92188L28.9685 6.74199L26.0563 9.65546L22.2362 5.83535L25.1484 2.92188ZM11.1566 20.7338H14.9767L24.2558 11.4547L20.4357 7.63462L11.1566 16.9137V20.7338Z"
                fill="white"
              />
              <path
                d="M25.1636 24.5539H11.3577C11.3246 24.5539 11.2902 24.5666 11.2571 24.5666C11.2151 24.5666 11.1731 24.5551 11.1298 24.5539H7.33642V6.72667H16.0552L18.6019 4.17993H7.33642C5.93189 4.17993 4.78967 5.32087 4.78967 6.72667V24.5539C4.78967 25.9597 5.93189 27.1006 7.33642 27.1006H25.1636C25.8391 27.1006 26.4868 26.8323 26.9644 26.3547C27.442 25.8771 27.7104 25.2293 27.7104 24.5539V13.5163L25.1636 16.063V24.5539Z"
                fill="white"
              />
            </svg>
          )}
        </Button>
      </div>
      <div className="grid lg:grid-cols-[auto_1fr]  w-full gap-10">
        <div
          style={
            {
              "--background": "23 23 23",
              "--bg-color":
                "linear-gradient(rgb(var(--background)), rgb(var(--background)))",
              "--border-color": `linear-gradient(179.95deg, #BD00FF 22.59%, #00A3FF 99.95%, #4D00FF 99.96%)`,
            } as CSSProperties
          }
          className={twMerge(
            "flex flex-col gap-4 bg-black p-4 rounded-2xl w-full lg:max-w-sm",
            "border-[1px] [background:padding-box_var(--bg-color),border-box_var(--border-color)] border-transparent"
          )}
        >
          <div className="flex  gap-4 items-center">
            <span className="whitespace-nowrap">Created By :</span>{" "}
            <input
              value={username}
              className={twMerge(
                "text-foreground text-xl p-1 w-full duration-300 ease-in-out rounded-md",
                "bg-transparent",
                editModes.username ? "ring-2 ring-white" : ""
              )}
              onChange={(e) => setUsername(e.target.value)}
              disabled={editModes.username ? false : true}
            />
            <Button
              onClick={() => handleEditToggle({ name: "username" })}
              className="ml-auto !p-1 w-full"
              size={"icon"}
            >
              {editModes.username ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M4 12.6111L8.92308 17.5L20 6.5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              ) : (
                <svg
                  width="32"
                  height="31"
                  viewBox="0 0 32 31"
                  fill="none"
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.1484 2.92188L28.9685 6.74199L26.0563 9.65546L22.2362 5.83535L25.1484 2.92188ZM11.1566 20.7338H14.9767L24.2558 11.4547L20.4357 7.63462L11.1566 16.9137V20.7338Z"
                    fill="white"
                  />
                  <path
                    d="M25.1636 24.5539H11.3577C11.3246 24.5539 11.2902 24.5666 11.2571 24.5666C11.2151 24.5666 11.1731 24.5551 11.1298 24.5539H7.33642V6.72667H16.0552L18.6019 4.17993H7.33642C5.93189 4.17993 4.78967 5.32087 4.78967 6.72667V24.5539C4.78967 25.9597 5.93189 27.1006 7.33642 27.1006H25.1636C25.8391 27.1006 26.4868 26.8323 26.9644 26.3547C27.442 25.8771 27.7104 25.2293 27.7104 24.5539V13.5163L25.1636 16.063V24.5539Z"
                    fill="white"
                  />
                </svg>
              )}
            </Button>
          </div>
          <img src={image?.url} alt="image" className="w-full rounded-2xl" />
          <div className="flex items-center justify-center gap-4">
            <Button
              size={"icon"}
              className="bg-transparent"
              onClick={() => handleDownloadImage(image?.url)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                className="sm:w-6 sm:h-6 h-4 w-4"
              >
                <path
                  d="M24.9911 13.511H22.6768V6.23315C22.6768 5.43259 22.0218 4.77759 21.2212 4.77759H15.3989C14.5984 4.77759 13.9434 5.43259 13.9434 6.23315V13.511H11.629C10.3336 13.511 9.67855 15.083 10.5956 16L17.2766 22.6811C17.8443 23.2487 18.7613 23.2487 19.329 22.6811L26.01 16C26.927 15.083 26.2866 13.511 24.9911 13.511ZM8.12109 28.0667C8.12109 28.8672 8.7761 29.5222 9.57666 29.5222H27.0435C27.844 29.5222 28.499 28.8672 28.499 28.0667C28.499 27.2661 27.844 26.6111 27.0435 26.6111H9.57666C8.7761 26.6111 8.12109 27.2661 8.12109 28.0667Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <span className="text-foreground/50 pb-6 text-[28px]">
            Prompt Settings
          </span>
          <p className="flex justify-between items-center text-lg lg:text-[30px]">
            A.Ratio{" "}
            <span className="text-foreground">
              {imagePrompt?.selectedAspectRatio?.value}
            </span>
          </p>
          <div className="flex flex-col  gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl lg:text-[28px] text-foreground/50">
                Prompt
              </h2>
              <Button
                onClick={() => handleEditToggle({ name: "prompt" })}
                className="ml-auto !p-1"
                size={"icon"}
              >
                {editModes.prompt ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 12.6111L8.92308 17.5L20 6.5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                ) : (
                  <svg
                    width="32"
                    height="31"
                    viewBox="0 0 32 31"
                    fill="none"
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.1484 2.92188L28.9685 6.74199L26.0563 9.65546L22.2362 5.83535L25.1484 2.92188ZM11.1566 20.7338H14.9767L24.2558 11.4547L20.4357 7.63462L11.1566 16.9137V20.7338Z"
                      fill="white"
                    />
                    <path
                      d="M25.1636 24.5539H11.3577C11.3246 24.5539 11.2902 24.5666 11.2571 24.5666C11.2151 24.5666 11.1731 24.5551 11.1298 24.5539H7.33642V6.72667H16.0552L18.6019 4.17993H7.33642C5.93189 4.17993 4.78967 5.32087 4.78967 6.72667V24.5539C4.78967 25.9597 5.93189 27.1006 7.33642 27.1006H25.1636C25.8391 27.1006 26.4868 26.8323 26.9644 26.3547C27.442 25.8771 27.7104 25.2293 27.7104 24.5539V13.5163L25.1636 16.063V24.5539Z"
                      fill="white"
                    />
                  </svg>
                )}
              </Button>
            </div>
            <input
              type="text"
              value={imagePrompt?.prompt}
              name="prompt"
              disabled={editModes.prompt ? false : true}
              onChange={(e) =>
                handleChange({ name: e.target.name, value: e.target.value })
              }
              className={twMerge(
                " text-base lg:text-xl  bg-transparent p-2 duration-300 ease-in-out rounded-md",
                editModes.prompt ? "ring-2 ring-white" : ""
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl lg:text-[28px] text-foreground/50">
                Negative Prompt
              </h2>
              <Button
                onClick={() => handleEditToggle({ name: "negativePrompt" })}
                className="ml-auto !p-1"
                size={"icon"}
              >
                {editModes.negativePrompt ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 12.6111L8.92308 17.5L20 6.5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                ) : (
                  <svg
                    width="32"
                    height="31"
                    viewBox="0 0 32 31"
                    fill="none"
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.1484 2.92188L28.9685 6.74199L26.0563 9.65546L22.2362 5.83535L25.1484 2.92188ZM11.1566 20.7338H14.9767L24.2558 11.4547L20.4357 7.63462L11.1566 16.9137V20.7338Z"
                      fill="white"
                    />
                    <path
                      d="M25.1636 24.5539H11.3577C11.3246 24.5539 11.2902 24.5666 11.2571 24.5666C11.2151 24.5666 11.1731 24.5551 11.1298 24.5539H7.33642V6.72667H16.0552L18.6019 4.17993H7.33642C5.93189 4.17993 4.78967 5.32087 4.78967 6.72667V24.5539C4.78967 25.9597 5.93189 27.1006 7.33642 27.1006H25.1636C25.8391 27.1006 26.4868 26.8323 26.9644 26.3547C27.442 25.8771 27.7104 25.2293 27.7104 24.5539V13.5163L25.1636 16.063V24.5539Z"
                      fill="white"
                    />
                  </svg>
                )}
              </Button>
            </div>

            <input
              type="text"
              value={imagePrompt?.negativePrompt}
              name="negativePrompt"
              disabled={editModes.negativePrompt ? false : true}
              onChange={(e) =>
                handleChange({ name: e.target.name, value: e.target.value })
              }
              className={twMerge(
                "  text-base lg:text-xl p-2 rounded-md bg-transparent  duration-300 ease-in-out",
                editModes.negativePrompt ? "ring-2 ring-white" : ""
              )}
            />
          </div>
          <p className="flex justify-between items-center  text-2xl lg:text-[28px]">
            Seed <span className="text-foreground">1231231312312</span>
          </p>

          <div className="w-full lg:mt-auto flex flex-col mt-10 gap-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="toggle"
                className="text-base text-foreground/50 cursor-pointer"
              >
                Use image?
              </label>
              <CustomToggle
                value={isImgToImg}
                onChange={(value) => setIsImgToImg(value)}
              />
            </div>
            <Button
              onClick={handleGenerateImage}
              size={"md"}
              className="w-full"
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col text-foreground gap-4 text-xl  items-center justify-center">
        <h2>Parent Image</h2>
        <div
          style={{
            background: "",
          }}
          className="w-full h-[1px] bg-gradient-to-l from-white/0 via-white to-white/0"
        />
        <div className="grid grid-cols-[250px] text-center">
          {isImgToImg && generateImages ? (
            <img
              src={image.url}
              alt={image.title}
              className="rounded-2xl w-full max-w-xs object-contain"
            />
          ) : (
            "None"
          )}
        </div>
        <div
          style={{
            background: "",
          }}
          className="w-full h-[1px] bg-gradient-to-l from-white/0 via-white to-white/0"
        />
        <h2>Offsprings</h2>
        <div
          style={{
            background: "",
          }}
          className="w-full h-[1px] bg-gradient-to-l from-white/0 via-white to-white/0"
        />
        <div>
          {generateImages ? (
            <ul className="columns-2 lg:columns-3 xl:columns-4 gap-6">
              {images.map((img) => {
                return (
                  <li className="mb-6 rounded-2xl max-w-xs object-contain overflow-hidden">
                    <img src={img.url} alt={img.title} />
                  </li>
                );
              })}
            </ul>
          ) : (
            "None"
          )}
        </div>
        <div
          style={{
            background: "",
          }}
          className="w-full h-[1px] bg-gradient-to-l from-white/0 via-white to-white/0"
        />
      </div>
    </main>
  );
};

export default ImageDetails;
