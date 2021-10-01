import type { NextApiRequest, NextApiResponse } from "next";

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
    const NAVER_CLIENT_ID = 'mM5ado2kxolULgq8iK6E';
    var api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + NAVER_CLIENT_ID + '&redirect_uri=' + 'http://front.tumblbug.com:3000/api/naver/login/callback' + '&state=' + 'RAMDOM_STATE';
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
}