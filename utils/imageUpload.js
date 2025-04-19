const cloudinary = require("./cloudinary");

const extractPublicId = (url) => {
    const parts = url.split('/');
    const fileName = parts.pop(); 
    const folder = parts.pop(); 
    const publicId = `${folder}/${fileName.split('.')[0]}`; 
    return publicId;
}

module.exports.uploadImageOnCloudinary = async(file) => {
    const base64Image = Buffer.from(file.buffer).toString("base64")
    const dataUri = `data:${file.mimetype};base64,${base64Image}`

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
        folder: "SkillSort",
        resource_type: "auto" // optional, handles both images and videos
      })
    return uploadResponse.secure_url
}

module.exports.deleteImageFromCloudinary = async (imageUrl) => {
    const publicId = extractPublicId(imageUrl);
    await cloudinary.uploader.destroy(publicId);
};


module.exports.uploadFileOnCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "raw",  // For non-image files like PDFs
                folder: "SkillSort/resumes", // Folder to store files in
                use_filename: true,  // Keep the original filename
                unique_filename: false, // Don't generate unique filenames
                overwrite: true,  // Overwrite files with the same name
                public_id: file.originalname.split('.')[0], 
            },
            (error, result) => {
                if (error) {
                    reject(new Error(error)); // Reject the promise if the upload fails
                } else {
                    resolve(result); // Resolve the promise with the secure URL
                }
            }
        );
        stream.end(file.buffer);
    });
};





module.exports.deleteFileFromCloudinary = async (fileUrl) => {
    try {
        const publicId = fileUrl.split("/").pop().split(".")[0];        
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: "raw"
        });
        return result;
    } catch (error) {
        console.error("Cloudinary deletion error:", error);
        throw error;
    }
};


