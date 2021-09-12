// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const puppeteer = require("puppeteer");
const $ = require("cheerio");

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
      devtools: true,
    });
    const page = await browser.newPage();
    const urlParams = new URLSearchParams({ pblancId: pblancId.toString() });

    await page.goto(`${baseUrl}?${urlParams.toString()}`);
    const content = await page.content();
    const body = $.load(content);
    const type = body(".viewTop > span").text();
    const title = body(".viewTop > em").text();
    const targets = body(".basicInfo > .info .ds")
      .toArray()
      .map((el) => body(el).text());

    let houses = [];
    const list = await page.$$("#hsmpNmUl>li");

    for (const node of Array.from(list)) {
      await node.click();
      const address = await page.$eval("#fullAdres", (el) => el.innerText);

      const totalNumber = await page.$eval("#lttotHoCo", (el) => el.innerText);
      const heatType = await page.$eval("#heatMthdNm", (el) => el.innerText);
      const entranceYear = await page.$eval(
        "#mvnPrearngeYear",
        (el) => el.innerText
      );
      const entranceMonth = await page.$eval(
        "#mvnPrearngeMt",
        (el) => el.innerText
      );
      const scale = await page.$eval("#dongCo", (el) => el.innerText);

      const infos = await page.$eval("#partclrMatter", (el) => el.innerText);

      const noticeTitle = await page.$eval(
        ".danjiWrap .table_type2 td > a",
        (el) => el.innerText
      );
      const noticeDownload = await page.$eval(
        ".danjiWrap .table_type2 td > a",
        (el) => el.href
      );

      const supplyInfos = await page.$eval("#suplyTableBody", (el) => {
        const rows = el.children;
        const items = Array.from(rows).map((row) => {
          const children = row.children;
          return {
            type: children[0].innerText,
            exclusive: children[1].innerText,
            totalNumber: children[2].innerText,
            priorityNumber: children[3].innerText,
            normalNumber: children[4].innerText,
            totalAmount: children[4].innerText,
            depositAmount: children[5].innerText,
            middleAmount: children[6].innerText,
            remainAmount: children[7].innerText,
            monthlyAmount: children[8].innerText,
          };
        });
        return items;
      });

      houses.push({
        address,
        totalNumber,
        heatType,
        entranceYear,
        entranceMonth,
        scale,
        notice: { noticeTitle, noticeDownload },
        infos,
        supplyInfos,
      });
    }

    await browser.close();

    res.status(200).json({
      statusCode: 200,
      error: false,
      errorMessage: "",
      result: { targets, type, title, houses },
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
