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
        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw new Error("Failed to upload file");
    }
};


module.exports.deleteFileFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            format: "pdf"
        });
        return result;
    } catch (error) {
        console.error("Cloudinary deletion error:", error);
        throw error;
    }
};


