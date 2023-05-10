const cloudinary = require("../config/cloudinary.config");

async function cloudinaryUploadImage(req, folderName) {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  let imageURL = "";

  await cloudinary.uploader
    .upload(file, { folder: folderName, fetch_format: "auto" })
    .then((result) => {
      imageURL = result.url;
      return imageURL;
    });

  return imageURL;
}

module.exports = cloudinaryUploadImage;
