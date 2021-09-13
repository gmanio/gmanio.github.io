import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import cheerio from "cheerio";
import { ElementHandle } from "puppeteer";

type Data = {
  error: boolean;
  errorMessage: string;
  result: any;
  statusCode: number;
};

const baseUrl =
  "https://www.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcDetailView.do";

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

    const content = await page.content();
    const body = cheerio.load(content);

    const type = body(".viewTop > span").text();
    const title = body(".viewTop > em").text();
    const targets = body(".basicInfo > .info .ds")
      .toArray()
      .map((el) => body(el).text());

    let houses = [];

    const list: Array<ElementHandle<any>> = await page.$$("#hsmpNmUl>li");

    for (const node of Array.from(list)) {
      await node.click();

      const name = await page.$eval("#hsmpNmUl>.on", (el: any) => el.innerText);
      const address = await page.$eval("#fullAdres", (el: any) =>
        el.firstChild.nodeValue.trim()
      );
      const totalNumber = await page.$eval("#lttotHoCo", (el: any) =>
        el.innerText.trim()
      );
      const heatType = await page.$eval(
        "#heatMthdNm",
        (el: any) => el.innerText
      );
      const entranceYear = await page.$eval(
        "#mvnPrearngeYear",
        (el: any) => el.innerText
      );
      const entranceMonth = await page.$eval("#mvnPrearngeMt", (el: any) =>
        el.innerText.trim()
      );
      const scale = await page.$eval("#dongCo", (el: any) => el.innerText);
      const infos = await page.$eval(
        "#partclrMatter",
        (el: any) => el.innerText
      );
      const notice = await page.$eval(
        ".danjiWrap .table_type2 td > a",
        (el: any) => {
          return {
            noticeTitle: el.innerText,
            noticeDownload: el.href,
          };
        }
      );

      const supplyInfos = await page.$eval("#suplyTableBody", (el) => {
        const rows = el.children;
        const items = Array.from(rows).map((row) => {
          const children = row.children;
          return {
            type: children[0].textContent,
            exclusive: children[1].textContent,
            totalNumber: children[2].textContent,
            priorityNumber: children[3].textContent,
            normalNumber: children[4].textContent,
            totalAmount: children[4].textContent,
            depositAmount: children[5].textContent,
            middleAmount: children[6].textContent,
            remainAmount: children[7].textContent,
            monthlyAmount: children[8].textContent,
          };
        });
        return items;
      });

      houses.push({
        name,
        address,
        totalNumber,
        heatType,
        entranceYear,
        entranceMonth,
        scale,
        notice,
        infos,
        supplyInfos,
      });
    }

    const plansInfo = await page.$eval(".schInfo .table_type2", (el: any) => {
      let plansInfo = {};
      let supplyInfos: any = [];

      el.querySelectorAll("tr").forEach((row: any) => {
        if (row.querySelector("th").innerText === "일반공급") {
          supplyInfos.push({
            supplyType: "일반공급",
            priority:
              row.querySelectorAll("th").length > 2
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

        if (row.querySelector("th").innerText === "2,3 순위") {
          supplyInfos.push({
            supplyType: "일반공급",
            priority: row.querySelector("th").innerText,
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

        if (row.querySelector("th").innerText === "모집공고일") {
          Object.assign(plansInfo, {
            planDate: row.querySelector("td").innerText,
          });
        }

        if (row.querySelector("th").innerText === "당첨자 발표일") {
          Object.assign(plansInfo, {
            lotteryDate: row.querySelector("td").innerText,
          });
        }

        if (row.querySelector("th").innerText === "일정관련 안내사항") {
          Object.assign(plansInfo, {
            planNoticeInfo: row.querySelector("td").innerText,
          });
        }
      });

      if (supplyInfos.length > 0) {
        Object.assign(plansInfo, { supplyInfos: [...supplyInfos] });
      }

      return plansInfo;
    });

    await browser.close();

    res.status(200).json({
      statusCode: 200,
      error: false,
      errorMessage: "",
      result: { targets, type, title, houses, plansInfo },
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
