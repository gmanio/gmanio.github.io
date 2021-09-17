import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const baseUrl =
  "https://www.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcDetailView.do";

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
  try {
    var token = "YOUR_ACCESS_TOKEN";
    var header = "Bearer " + token; // Bearer 다음에 공백 추가
    var clubid = "CAFE_ID";// 카페의 고유 ID값
    var nickname = "NICK_NAME";

    res.status(200).json({
      statusCode: 200,
      error: true,
      errorMessage: "",
      result: {},
    });
  } catch (err: any) {
    res.status(500).json({
      statusCode: 500,
      error: true,
      errorMessage: err.message,
      result: {},
    });
  }
}
