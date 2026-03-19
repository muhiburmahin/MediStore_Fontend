"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const uploadImage = async (formData: FormData): Promise<string> => {
    if (!process.env.CLOUDINARY_API_SECRET) {
        console.error("Cloudinary credentials are missing in .env!");
        throw new Error("Cloudinary configuration missing");
    }

    try {
        const file = formData.get("image") as File;
        if (!file) throw new Error("No file provided");

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "medistore_medicines",
                    resource_type: "auto",
                    use_filename: true,
                    unique_filename: true,
                },
                (error, result) => {
                    if (error) {
                        console.error("Detailed Cloudinary Error:", error);
                        return reject(error);
                    }
                    resolve(result?.secure_url as string);
                }
            );
            uploadStream.end(buffer);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error(error.message || "Failed to upload image");
    }
};