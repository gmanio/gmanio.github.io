import AWS from "aws-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import moment from "moment";
import FromData from "form-data";
import iconv from "iconv-lite";

const refresh_token =
  "0rt7KQtEipOXwCEToUG8WwIpMIPaPSqgMdk42T2FUSiiAubDipKjPbm5SmCw8riiyqMbLcwJ84CZ68iiuTIeZap12aQYgvZF3RZcVq1P33c5RuKkYkAIz1K3asDy3Tb9v9VdH";
const NAVER_CLIENT_ID = "mM5ado2kxolULgq8iK6E";
const NAVER_SECRET_KEY = "5rjFMzLEho";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const naverAuthResponse = await axios.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SECRET_KEY}&refresh_token=${refresh_token}`
    );
    const access_token = naverAuthResponse.data.access_token;
    const header = "Bearer " + access_token; // Bearer 다음에 공백 추가
    const clubid = 30537001; // 카페의 고유 ID값
    const menuid = 1; // 카페 게시판 id (상품게시판은 입력 불가)

    const response = await axios.get(
      `https://d3sr66w7pj3296.cloudfront.net/main/lease_main_list.json`
    );

    const itemList = response.data.itemList.splice(0, 10);

    const currentDate = moment().format("YYYY-MM-DD");

    const title = `[${currentDate}] 오늘의 추천 Top10 임대 정보`;
    const content = `
    <div style='display:flex; flex-direction:column;'>
      <div style='display:flex; flex-direction:column;'>
        <span style='font-size: 15px; line-height: 20px; color:#333;'>
          안녕하세요. 임대분석가입니다.<br>
          <strong style='font-size: 18px; line-height: 24px; color:#333;'>${title}를 알려드릴께요.</strong>
        </span>
      </div>
      <div style='display:flex;flex-direction:column;justify-content:space-between;'>
        ${itemList
          .map((item: any, index: number) => {
            return `<a style='display:flex;justify-content: flex-start; align-items: center; min-height: 60px; font-size: 22px; line-height: 28px; font-weight: bold; text-decoration: none; box-sizing:border-box; border:1px dashed #333; color: #666;' href=${
              item.url
            }>
          <strong style='padding: 0 10px; font-size: 30px; line-height: 28px; color:red;'>${
            index + 1
          } 위.</strong> ${item.pblancNm}
          </a><br/>`;
          })
          .join(" ")}
      </div>
      <div style='display:flex; flex-direction:column;'>
        <span style='font-size: 15px; line-height: 20px; color:#333;'>
          임대분석가가 알려드린 <strong style='font-size: 18px; line-height: 24px; color:#333;'>${title}</strong>.<br>
          많은 도움이 되셨나요?
        </span>
        <span style='margin-top: 20px; font-size: 15px; line-height: 20px; color:#333;'>
          도움이 되셨다면 댓글도 함께 달아주시는 센스!<br>
          오늘 하루도 행복하세요 :)
        </span>
      </div>
    </div>
  `;

    const formData = new FromData();
    formData.append("subject", iconv.encode(title, "EUC-KR"));
    formData.append("content", iconv.encode(content.trim(), "EUC-KR"));

    const postResponse = await axios.post(
      `https://openapi.naver.com/v1/cafe/${clubid}/menu/${menuid}/articles`,
      formData,
      {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
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
    return res.status(500).json({
      statusCode: 500,
      error: true,
      errorMessage: err.message,
      result: {},
    });
  }
}
