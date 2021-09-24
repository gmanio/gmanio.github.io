import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error: boolean;
  errorMessage: string;
  result: any;
  statusCode: number;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { code, state } = req.query;
  res.status(200).json({
    error: false,
    errorMessage: "",
    result: { access_token: code, state: state },
    statusCode: 200,
  });
}
