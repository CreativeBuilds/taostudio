import { images } from "./data/images";

export async function loadImage(id) {
  return images.find((item) => item.id === id);
}
