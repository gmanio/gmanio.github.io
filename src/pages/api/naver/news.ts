import AWS from "aws-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const NAVER_CLIENT_ID = "mM5ado2kxolULgq8iK6E";
const NAVER_SECRET_KEY = "5rjFMzLEho";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { query = '', display = 20, start = 1, sort = "date" } = req.query;

  const response = await axios.get(
    `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query.toString())}&display=${display}&start=${start}&sort=${sort}`,
    {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_SECRET_KEY,
      },
    }
  );

  try {
    const uploadParams = {
      Bucket: "lease-project",
      Key: `news/lease_news.json`,
      ACL: "public-read",
      Body: JSON.stringify(response.data),
      ContentType: "application/json",
    };

    const s3 = new AWS.S3({
      accessKeyId: "AKIAXW3POAMCU54ICH7I",
      secretAccessKey: "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",
      region: "ap-northeast-2",
    });

    const s3Result = await s3.upload(uploadParams).promise();

    return res.status(200).json({
      statusCode: 200,
      error: false,
      errorMessage: "",
      result: {
        naverResponse: response.data,
        awsResponse: s3Result,
      },
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
