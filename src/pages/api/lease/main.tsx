import ReactDOMServer from "react-dom/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { BaseApiResponseType } from "../../../types/Api";
import fetch from "isomorphic-unfetch";
import FormData from "form-data";
import iconv from "iconv-lite";
import prettier from "prettier";
import moment from "moment";

const NAVER_AUTH_REFRESH_TOKEN =
  "0rt7KQtEipOXwCEToUG8WwIpMIPaPSqgMdk42T2FUSiiAubDipKjPbm5SmCw8riiyqMbLcwJ84CZ68iiuTIeZap12aQYgvZF3RZcVq1P33c5RuKkYkAIz1K3asDy3Tb9v9VdH";
const NAVER_CLIENT_ID = "mM5ado2kxolULgq8iK6E";
const NAVER_SECRET_KEY = "5rjFMzLEho";

type NewsItem = {
  pblancId: string; //"10223",
  brtcCodeNm: string; //"충청남도",
  houseTyNm: string; //"아파트",
  pblancNm: string; //"보령명천A-1BL 공공실버 입주자 및 예비입주자 추가모집",
  przwnerPresnatnDe: string; //"20220126",
  rcritPblancDe: string; //"20211008",
  sttusNm: string; //"일반공고",
  suplyInsttNm: string; //"LH",
  suplyInsttUrl: string; //"http://www.lh.or.kr",
  suplyTyNm: string; //"영구임대",
  url: string; //"https://apply.lh.or.kr/LH/index.html?gv_url=SIL::CLCC_SIL_0060.xfdl&gv_menuId=1010203&gv_param=CCR_CNNT_SYS_DS_CD:03,PAN_ID:2015122300009791,LCC:Y",
  applyStartDate: string; //"2021년 10월 19일",
  applyEndDate: string; //"2021년 10월 21일",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BaseApiResponseType>
) {
  // const { pblancId } = req.query;
  const getAccessTokenApi = `https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SECRET_KEY}&refresh_token=${NAVER_AUTH_REFRESH_TOKEN}`;

  try {
    const getAccessTokenApiResponse = await (
      await fetch(getAccessTokenApi)
    ).json();

    const getMainListApi = `https://d3sr66w7pj3296.cloudfront.net/main/lease_main_list.json`;
    const getMainListApiResponse = await (await fetch(getMainListApi)).json();

    const access_token = getAccessTokenApiResponse.access_token;
    const header = "Bearer " + access_token; // Bearer 다음에 공백 추가
    const clubid = 30537001; // 카페의 고유 ID값
    const menuid = 58; // 카페 게시판 id (상품게시판은 입력 불가)

    const currentDate = moment().format("YYYY-MM-DD");
    const title = `[${currentDate}] 오늘의 추천 Top10 임대 정보`;

    const generateRows = (items: Array<NewsItem>[]) => {
      return (
        <>
          {items.map((item: any, index: number) => {
            return (
              <tr key={`item-` + index}>
                <td
                  colSpan={1}
                  rowSpan={1}
                  style={{
                    width: "5%25",
                    height: 43,
                    boxSizing: "border-box",
                    border: "1px solid rgb(210, 210, 210)",
                    textAlign: "center",
                  }}
                >
                  {index + 1}위
                </td>
                <td
                  colSpan={1}
                  rowSpan={1}
                  style={{
                    width: "8%25",
                    height: 43,
                    boxSizing: "border-box",
                    border: "1px solid rgb(210, 210, 210)",
                    textAlign: "center",
                  }}
                >
                  {item.suplyTyNm}
                </td>
                <td
                  colSpan={1}
                  rowSpan={1}
                  style={{
                    width: "57%25",
                    height: 43,
                    boxSizing: "border-box",
                    border: "1px solid rgb(210, 210, 210)",
                    textAlign: "center",
                  }}
                >
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.pblancNm}
                  </a>
                </td>

                <td
                  colSpan={1}
                  rowSpan={1}
                  style={{
                    width: "10%25",
                    height: 43,
                    boxSizing: "border-box",
                    border: "1px solid rgb(210, 210, 210)",
                    textAlign: "center",
                  }}
                >
                  {item.brtcCodeNm}
                </td>
                <td
                  colSpan={1}
                  rowSpan={1}
                  style={{
                    width: "10%25",
                    height: 43,
                    boxSizing: "border-box",
                    border: "1px solid rgb(210, 210, 210)",
                    textAlign: "center",
                  }}
                >
                  {moment(item.applyStartDate.replace(/[^\d]/g, "")).format(
                    "YYYY.MM.DD"
                  )}
                </td>
                <td
                  colSpan={1}
                  rowSpan={1}
                  style={{
                    width: "10%25",
                    height: 43,
                    boxSizing: "border-box",
                    border: "1px solid rgb(210, 210, 210)",
                    textAlign: "center",
                  }}
                >
                  {moment(item.applyEndDate.replace(/[^\d]/g, "")).format(
                    "YYYY.MM.DD"
                  )}
                </td>
              </tr>
            );
          })}
        </>
      );
    };

    const content = (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            marginBottom: 40,
            display: "flex",
            flexDirection: "column",
            fontSize: 15,
            lineHeight: "20px",
            color: "#333",
          }}
        >
          <span>안녕하세요. 임대분석가입니다.</span>
          <strong style={{ fontSize: 18, lineHeight: "24px", color: "#333" }}>
            {title}를 알려드릴께요.
          </strong>
        </div>
        <table style={{ borderCollapse: "collapse", width: "100%25" }}>
          <tbody>
            <tr>
              <td
                colSpan={1}
                rowSpan={1}
                style={{
                  width: "5%25",
                  height: 43,
                  boxSizing: "border-box",
                  borderWidth: "0 1px 1px 0",
                  border: "1px solid rgb(210, 210, 210)",
                  textAlign: "center",
                }}
              >
                순위
              </td>
              <td
                colSpan={1}
                rowSpan={1}
                style={{
                  width: "8%25",
                  height: 43,
                  boxSizing: "border-box",
                  border: "1px solid rgb(210, 210, 210)",
                  textAlign: "center",
                }}
              >
                형태
              </td>
              <td
                colSpan={1}
                rowSpan={1}
                style={{
                  width: "57%25",
                  height: 43,
                  boxSizing: "border-box",
                  border: "1px solid rgb(210, 210, 210)",
                  textAlign: "center",
                }}
              >
                제목
              </td>
              <td
                colSpan={1}
                rowSpan={1}
                style={{
                  width: "10%25",
                  height: 43,
                  boxSizing: "border-box",
                  border: "1px solid rgb(210, 210, 210)",
                  textAlign: "center",
                }}
              >
                지역
              </td>
              <td
                colSpan={1}
                rowSpan={1}
                style={{
                  width: "10%25",
                  height: 43,
                  boxSizing: "border-box",
                  border: "1px solid rgb(210, 210, 210)",
                  textAlign: "center",
                }}
              >
                시작일
              </td>
              <td
                colSpan={1}
                rowSpan={1}
                style={{
                  width: "10%25",
                  height: 43,
                  boxSizing: "border-box",
                  border: "1px solid rgb(210, 210, 210)",
                  textAlign: "center",
                }}
              >
                종료일
              </td>
            </tr>
            {generateRows(getMainListApiResponse.itemList.slice(0, 20))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 15,
            lineHeight: "20px",
            color: "#333",
          }}
        >
          <span
            style={{
              marginTop: 30,
            }}
          >
            임대분석가가 알려드린 <br />
            <strong style={{ fontSize: 18, lineHeight: "24px", color: "#333" }}>
              {title}.
              <br />
            </strong>
            많은 도움이 되셨나요?
          </span>
          <span
            style={{
              marginTop: 20,
              fontSize: 15,
              lineHeight: "20px",
              color: "#333",
            }}
          >
            도움이 되셨다면 댓글도 함께 달아주시는 센스!
            <br />
            오늘 하루도 행복하세요 :)
          </span>
        </div>
      </div>
    );
    const htmlWDoc = ReactDOMServer.renderToStaticMarkup(content);
    const prettyHtml = prettier.format(htmlWDoc, {
      parser: "html",
      htmlWhitespaceSensitivity: "ignore",
      singleQuote: true,
      jsxSingleQuote: true,
      bracketSpacing: false,
      bracketSameLine: true,
      endOfLine: "cr",
    });
    const iconVcontent = iconv.encode(prettyHtml, "EUC-KR");

    const formData = new FormData();

    formData.append("subject", iconv.encode(title, "EUC-KR"));
    formData.append("content", iconVcontent);
    formData.append("openyn", "true");
    formData.append("ccl", "true");

    const fetchResponse = await fetch(
      `https://openapi.naver.com/v1/cafe/${clubid}/menu/${menuid}/articles`,
      {
        method: "POST",
        headers: {
          ...formData.getHeaders(),
          Authorization: header,
        },
        body: formData,
      }
    );

    res.status(200).json({
      statusCode: 200,
      error: true,
      errorMessage: "",
      result: await fetchResponse.json(),
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
