const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const uploadFileToS3 = async (file) => {
  // Add input validation

  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    // endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
	requestHandler: {
		// Increase timeout to 5 minutes (300,000 ms)
		requestTimeout: 300000,
		// Keep the connection alive longer
		socketTimeout: 300000
	  }
  });

  if (!file || !file.buffer) {
    throw new Error("Invalid file input");
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname, // Can change to a unique name like using UUID
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    console.log("Inside try block on uploadFileToS3");
    const data = await s3.send(new PutObjectCommand(params));
    console.log("successfully post in s3 bucket", data);
    // return data;
    return ` https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalname}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);

    throw new Error("Error uploading file to S3: " + error.message);
  }
};
module.exports = { uploadFileToS3 };
