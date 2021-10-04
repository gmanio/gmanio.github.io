import AWS from "aws-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    // const uploadParams = {
    //   Bucket: "lease-project",
    //   Key: `detail/lease-item-${pblancId}.json`,
    //   ACL: "public-read",
    //   Body: JSON.stringify(result),
    //   ContentType: "application/json",
    // };

    // const s3 = new AWS.S3({
    //   accessKeyId: "AKIAXW3POAMCU54ICH7I",
    //   secretAccessKey: "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",
    //   region: "ap-northeast-2",
    // });

    // const s3Result = await s3.upload(uploadParams).promise();

    // console.log(s3Result);

    return res.status(200).json({
      statusCode: 200,
      error: false,
      errorMessage: "",
      result: {},
    });
  } catch (err: any) {
    return res.status(500).json({
      statusCode: 500,
      error: true,
      errorMessage: err.message,
      result: {},
    });
  }
}
