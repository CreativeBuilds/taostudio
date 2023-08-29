import React from "react";

import GenerateImage from "./pages/GenerateImage";
import SingleImage from "./pages/ImageDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootContainer from "./router/RootContainer";
import Images from "./pages/Images";
import ImageDetails from "./pages/ImageDetails";

const router = createBrowserRouter([
  {
    element: <RootContainer />,
    children: [
      {
        path: "/",
        index: true,
        element: <GenerateImage />,
      },
      {
        path: "/images",
        element: <Images />,
      },
      {
        path: "/images/:id",
        element: <ImageDetails />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
