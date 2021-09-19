import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs";
import { fromBuffer } from "pdf2pic";
import FromData from "form-data";

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
  const { title, description } = req.query;
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
  const menuid = 1; // 카페 게시판 id (상품게시판은 입력 불가)
  const subject = encodeURI(title.toString());
  const content = encodeURI(description.toString());
  const formData = new FromData({ maxDataSize: 20971520 });

  formData.append("subject", subject);
  formData.append("content", content);

  try {
    const pdfLink =
      "https://www.myhome.go.kr/hws/com/fms/cvplFileDownload.do?atchFileId=17bf2dd053b26&fileSn=1";

    const response = await axios.get(pdfLink, {
      responseType: "arraybuffer",
    });

    const options = {
      density: 70,
      saveFilename: "file",
      savePath: "./public/pdf",
      format: "png",
      width: 600,
      height: 800,
    };

    const storeAsImage = await fromBuffer(Buffer.from(response.data), options);
    const images: any = await storeAsImage(-1, false);

    const formData = {
      subject: subject,
      content: content,
      image: [
        ...images.map((image: any) => {
          const dir = process.cwd();

          return {
            value: fs.createReadStream(`${dir}/public/pdf/${image.name}`),
            options: { filename: image.name, contentType: "image/png" },
          };
        }),
      ],
    };

    const postResponse = await axios.post(
      `https://openapi.naver.com/v1/cafe/${clubid}/menu/${menuid}/articles`,
      formData,
      {
        headers: {
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
