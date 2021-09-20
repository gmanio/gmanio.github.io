import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs";
import { fromBuffer } from "pdf2pic";
import FromData from "form-data";
import iconv from "iconv-lite";

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
  const { pblancId } = req.query;
  const refresh_token =
    "0rt7KQtEipOXwCEToUG8WwIpMIPaPSqgMdk42T2FUSiiAubDipKjPbm5SmCw8riiyqMbLcwJ84CZ68iiuTIeZap12aQYgvZF3RZcVq1P33c5RuKkYkAIz1K3asDy3Tb9v9VdH";
  const NAVER_CLIENT_ID = "mM5ado2kxolULgq8iK6E";
  const NAVER_SECRET_KEY = "5rjFMzLEho";
  const response = await axios.get(
    `https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SECRET_KEY}&refresh_token=${refresh_token}`
  );
  const access_token = response.data.access_token;
  const header = "Bearer " + access_token; // Bearer 다음에 공백 추가
  const clubid = 30537001; // 카페의 고유 ID값
  const menuid = 17; // 카페 게시판 id (상품게시판은 입력 불가)

  const responseParser = await axios.get(
    `http://front.tumblbug.com:3000/api/lh?pblancId=${pblancId}`
  );

  const parserTitleType = `[${responseParser.data.result.articleType}]`;
  const parserTitle = responseParser.data.result.articleTitle;
  const parserDetailLink = responseParser.data.result.articleDetailLink;
  const subject = encodeURI(parserTitleType + " " + parserTitle);
  const fileName = responseParser.data.result.danjiInfos[0].download.filename;
  const fileLink = responseParser.data.result.danjiInfos[0].download.link;
  const content = `
    <div style='display:flex;flex-direction:column;justify-content:space-between;'>
      <a style='display:flex;justify-content: center; align-items: center; min-height: 50px; font-size: 22px; line-height: 28px; font-weight: bold; text-decoration: none; box-sizing:border-box; border:1px dashed #333; color: #666;' href=${parserDetailLink}>공고 자세히 보기</a>
      <a style='display:flex;justify-content: center; align-items: center; min-height: 50px; font-size: 22px; line-height: 28px; font-weight: bold; text-decoration: none; box-sizing:border-box; border:1px dashed #333; color: #666;' href=${fileLink}>${fileName}</a>
    </div>
  `;
  const formData = new FromData();

  formData.append("subject", subject.toString());
  formData.append("content", iconv.encode(content, "EUC-KR"));

  try {
    const response = await axios.get(fileLink, {
      responseType: "arraybuffer",
    });

    const options = {
      density: 100,
      saveFilename: "file",
      savePath: "./public/pdf",
      format: "jpeg",
      width: 960,
      height: 1280,
    };

    const storeAsImage: any = await fromBuffer(
      Buffer.from(response.data),
      options
    );
    const images: any = await storeAsImage.bulk(-1, false);

    images.map((image: any) =>
      formData.append(
        "image",
        fs.createReadStream(`${process.cwd()}/public/pdf/${image.name}`)
      )
    );
    const postResponse = await axios.post(
      `https://openapi.naver.com/v1/cafe/${clubid}/menu/${menuid}/articles`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: header,
        },
      }
    );

    res.status(200).json({
      statusCode: 200,
      error: true,
      errorMessage: "",
      result: postResponse.data,
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
