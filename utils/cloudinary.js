import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) 
        return null;
    }
}


export const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId || (Array.isArray(publicId) && publicId.length === 0)) {
            return null;
        } 

        const extractPublicId = (url) => {
            const parts = url.split('/');
            return parts[parts.length - 1].split('.')[0]; 
        };

        if (Array.isArray(publicId)) {
            const publicIds = publicId.map(extractPublicId);
            const deletePromises = publicIds.map(pid => cloudinary.uploader.destroy(pid));
            const responses = await Promise.all(deletePromises);
            return responses;
        } else {
            const pid = extractPublicId(publicId);
            const response = await cloudinary.uploader.destroy(pid);
            return response; 
        }
        
    } catch (error) {
        console.error("Error deleting image(s) from Cloudinary:", error);
        return null;
    }
};
