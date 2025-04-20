const cloudinary = require("./cloudinary");
const path = require("path")

const extractPublicId = (url) => {
    const parts = url.split('/');
    const fileName = parts.pop();
    const folder = parts.pop();
    const publicId = `${folder}/${fileName.split('.')[0]}`;
    return publicId;
}

module.exports.uploadImageOnCloudinary = async (file) => {
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
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "SkillSort/resumes",
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                    public_id: file.originalname,
                    format: "pdf"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(file.buffer);
        });
        console.log("File uploaded successfully:", result.public_id);
        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw new Error("Failed to upload file");
    }
};

    module.exports.downloadPdfFromCloudinary = async (publicId) => {
        try {
            const url = cloudinary.url(publicId, {
                // resource_type: "raw", 
                format: "pdf", 
                flags: "attachment", 
                secure: true
            });
            return url;
        } catch (error) {
            console.error("Error downloading file from Cloudinary:", error);
            throw new Error("Failed to download file");
        }
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


