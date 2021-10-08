import AWS from "aws-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { reset } = req.query;
  const cloudfront = new AWS.CloudFront({
    apiVersion: "2020-05-31",
    accessKeyId: "AKIAXW3POAMCU54ICH7I",
    secretAccessKey: "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",
    region: "ap-northeast-2",
  });

  cloudfront.createInvalidation(
    {
      DistributionId: "E31ESUOG7R97CU",
      InvalidationBatch: {
        Paths: { Quantity: 1, Items: [`/${reset}/*`] },
        CallerReference: `validationRef_${new Date()}`,
      },
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({
          statusCode: 500,
          error: true,
          errorMessage: JSON.stringify(err),
          result: {},
        });
      }

      return res.status(200).json({
        statusCode: 200,
        error: false,
        errorMessage: "",
        result: data,
      });
    }
  );
}
