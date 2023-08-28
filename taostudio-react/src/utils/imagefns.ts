export const handleViewImage = (url: string) => {
  window.open(url, "_blank");
};

export const handleDownloadImage = (url: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = "image.jpg"; // Specify the downloaded file name
  link.click();
};

export const handleShareImage = (url: string) => {
  const tempInput = document.createElement("input");
  tempInput.value = url;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Link copied to clipboard");
};
