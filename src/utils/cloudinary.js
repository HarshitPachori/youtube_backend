import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // if no file then simply return
    if (!localFilePath) return;
    // upload file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //  now file uploaded successfully and we have to remove file from local server
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // if got error then remove file saved in local
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
