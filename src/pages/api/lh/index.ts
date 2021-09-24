import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import { ElementHandle } from "puppeteer";
import axios from "axios";
import AWS from "aws-sdk";

type Data = {
  error: boolean;
  errorMessage: string;
  result: any;
  statusCode: number;
};

const baseUrl =
  "https://www.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcDetailView.do";

  // const baseUrl =
  // "https://www.myhome.go.kr/hws/portal/sch/selectLttotHouseDetailView.do";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { pblancId } = req.query;

    const browser = await puppeteer.launch({
      headless: true,
      devtools: false,
    });

    const page = await browser.newPage();
    const urlParams = new URLSearchParams({ pblancId: pblancId.toString() });
    await page.goto(`${baseUrl}?${urlParams.toString()}`);

    const articleId = parseInt(pblancId.toString(), 10);

    const basicInfos = await page.$eval(".viewArea", (el: any) => {
      let basicInfos = {};

      Array.from(el.querySelectorAll(".basicInfo > .info dt")).map(
        (DT: any) => {
          if (DT.innerText.trim() === "공급기관") {
            Object.assign(basicInfos, {
              corporation: DT.nextElementSibling.innerText,
            });
          }

          if (DT.innerText.trim() === "유형") {
            Object.assign(basicInfos, {
              leaseType: DT.nextElementSibling.innerText,
            });
          }

          if (DT.innerText.trim() === "주택유형") {
            Object.assign(basicInfos, {
              houseType: DT.nextElementSibling.innerText,
            });
          }
        }
      );

      Object.assign(basicInfos, {
        target: Array.from(el.querySelectorAll(".basicInfo > .info .ds")).map(
          (el: any) => el.innerText
        ),
      });

      return {
        articleType: el.querySelector(".viewTop > span").innerText,
        articleTitle: el.querySelector(".viewTop > em").innerText,
        articleDetailLink: el.querySelector(".basicInfo .detailBtn a").href,
        basicInfo: basicInfos,
      };
    });

    const list: Array<ElementHandle<any>> = await page.$$("#hsmpNmUl>li");

    let danjiInfos = [];

    for (const node of Array.from(list)) {
      await node.click();

      const danjiInfo = await page.$eval(".danjiInfo", (el: any) => {
        const downloadEl = el.querySelector("td > a");
        const supplyInfosEl = el.querySelector("#suplyTableBody");

        const rows = supplyInfosEl.children;
        const supplyInfos = Array.from(rows).map((row: any) => {
          const children = row.children;
          return {
            type: children[0].innerText,
            exclusive: children[1].innerText,
            totalNumber: children[2].innerText,
            priorityNumber: children[3].innerText,
            normalNumber: children[4].innerText,
            totalAmount: children[5].innerText,
            depositAmount: children[6].innerText,
            middleAmount: children[7].innerText,
            remainAmount: children[8].innerText,
            monthlyAmount: children[9].innerText,
          };
        });

        return {
          name: el.querySelector("#hsmpNmUl>.on").innerText,
          address: el.querySelector("#fullAdres").firstChild.nodeValue.trim(),
          totalUnit: el.querySelector("#totHshldCo").innerText.trim(),
          supplyUnit: el.querySelector("#lttotHoCo").innerText.trim(),
          entranceYear: el.querySelector("#mvnPrearngeYear").innerText.trim(),
          entranceMonth: el.querySelector("#mvnPrearngeMt").innerText.trim(),
          heatType: el.querySelector("#heatMthdNm").innerText.trim(),
          scale: el.querySelector("#dongCo").innerText.trim(),
          reference: el.querySelector("#refrnc").innerText.trim(),
          etc: el.querySelector("#partclrMatter").innerText.trim(),
          download: {
            filename: !!downloadEl ? downloadEl.innerText.trim() : "",
            link: !!downloadEl ? downloadEl.href : "",
          },
          supplyInfos,
        };
      });

      const naverAddressesResponse = await axios.get(
        `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
          danjiInfo.address
        )}`,
        {
          headers: {
            "X-NCP-APIGW-API-KEY-ID": "supkh581zm",
            "X-NCP-APIGW-API-KEY": "fbz2fnolfzk3nJtxKkkh4dhs8mKBlOBbR27HjxS5",
          },
        }
      );

      if (
        naverAddressesResponse.status === 200 &&
        naverAddressesResponse.data &&
        naverAddressesResponse.data.addresses.length > 0
      ) {
        Object.assign(danjiInfo, {
          addressDetail: naverAddressesResponse.data.addresses[0],
        });
      }

      danjiInfos.push({ ...danjiInfo });
    }

    const planInfo = await page.$eval(".schInfo .table_type2", (el: any) => {
      let plansInfo = {};
      let supplyInfos: any = [];

      el.querySelectorAll("tr").forEach((row: any) => {
        if (
          row.querySelector("th") &&
          row.querySelector("th").innerText === "모집공고일"
        ) {
          Object.assign(plansInfo, {
            planDate: row.querySelector("td").innerText,
          });
          return;
        }

        if (
          row.querySelector("th") &&
          row.querySelector("th").innerText === "당첨자 발표일"
        ) {
          Object.assign(plansInfo, {
            lotteryDate: row.querySelector("td").innerText,
          });
          return;
        }

        if (
          row.querySelector("th") &&
          row.querySelector("th").innerText === "일정관련 안내사항"
        ) {
          Object.assign(plansInfo, {
            planNoticeInfo: row.querySelector("td").innerText,
          });
          return;
        }
        const thLength = row.querySelectorAll("th").length;
        const rowSpan =
          row.querySelector("th") &&
          parseInt(row.querySelector("th").getAttribute("rowspan"), 10);

        if (thLength === 1 && !!rowSpan) {
          supplyInfos.push({
            supplyType: row.querySelector("th").innerText,
            priority: "1순위",
            conditions: Array.from(row.querySelectorAll("td dt")).map(
              (dt: any) => {
                return {
                  title: dt.innerText,
                  description: dt.nextElementSibling.innerText,
                };
              }
            ),
          });
        }

        if (thLength === 2 && !!rowSpan) {
          supplyInfos.push({
            supplyType: row.querySelectorAll("th")[0].innerText,
            priority:
              row.querySelectorAll("th").length > 1
                ? row.querySelectorAll("th")[1].innerText
                : "1순위",
            conditions: Array.from(row.querySelectorAll("td dt")).map(
              (dt: any) => {
                return {
                  title: dt.innerText,
                  description: dt.nextElementSibling.innerText,
                };
              }
            ),
          });
        }

        if (thLength === 2 && rowSpan === 2) {
          supplyInfos.push({
            supplyType: row.querySelectorAll("th")[0].innerText,
            priority:
              row.querySelectorAll("th").length > 1
                ? row.querySelectorAll("th")[1].innerText
                : "1순위",
            conditions: Array.from(row.querySelectorAll("td dt")).map(
              (dt: any) => {
                return {
                  title: dt.innerText,
                  description: dt.nextElementSibling.innerText,
                };
              }
            ),
          });

          const nextRow = row.nextElementSibling;

          supplyInfos.push({
            supplyType: row.querySelectorAll("th")[0].innerText,
            priority: nextRow.querySelector("th")
              ? nextRow.querySelector("th").innerText
              : "1순위",
            conditions: Array.from(nextRow.querySelectorAll("td dt")).map(
              (dt: any) => {
                return {
                  title: dt.innerText,
                  description: dt.nextElementSibling.innerText,
                };
              }
            ),
          });
        }

        if (thLength === 2 && rowSpan === 3) {
          supplyInfos.push({
            supplyType: row.querySelectorAll("th")[0].innerText,
            priority:
              row.querySelectorAll("th").length > 1
                ? row.querySelectorAll("th")[1].innerText
                : "1순위",
            conditions: Array.from(row.querySelectorAll("td dt")).map(
              (dt: any) => {
                return {
                  title: dt.innerText,
                  description: dt.nextElementSibling.innerText,
                };
              }
            ),
          });

          const nextRow = row.nextElementSibling;

          supplyInfos.push({
            supplyType: row.querySelectorAll("th")[0].innerText,
            priority: nextRow.querySelector("th")
              ? nextRow.querySelector("th").innerText
              : "1순위",
            conditions: Array.from(nextRow.querySelectorAll("td dt")).map(
              (dt: any) => {
                return {
                  title: dt.innerText,
                  description: dt.nextElementSibling.innerText,
                };
              }
            ),
          });

          const nextnextRow = nextRow.nextElementSibling;

          supplyInfos.push({
            supplyType: row.querySelectorAll("th")[0].innerText,
            priority: nextnextRow.querySelector("th")
              ? nextnextRow.querySelector("th").innerText
              : "1순위",
            conditions: Array.from(nextnextRow.querySelectorAll("td dt")).map(
              (dt: any) => {
                return {
                  title: dt.innerText,
                  description: dt.nextElementSibling.innerText,
                };
              }
            ),
          });
        }
      });

      if (supplyInfos.length > 0) {
        Object.assign(plansInfo, { supplyInfos: [...supplyInfos] });
      }

      return plansInfo;
    });

    await browser.close();

    // const uploadParams = {
    //   Bucket: "lease-project",
    //   Key: `detail/lease-item-${pblancId}.json`,
    //   ACL: "public-read",
    //   Body: JSON.stringify({ articleId, ...basicInfos, danjiInfos, planInfo }),
    //   ContentType: "application/json",
    // };

    // try {
    //   const s3 = new AWS.S3({
    //     accessKeyId: "AKIAXW3POAMCU54ICH7I",
    //     secretAccessKey: "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",
    //     region: "ap-northeast-2",
    //   });

    //   await s3.upload(uploadParams).promise();
    // } catch (err) {
    //   res.status(500).json({
    //     statusCode: 500,
    //     error: true,
    //     errorMessage: "S3 upload Failed",
    //     result: {},
    //   });
    // }

    res.status(200).json({
      statusCode: 200,
      error: false,
      errorMessage: "",
      result: { articleId, ...basicInfos, danjiInfos, planInfo },
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
