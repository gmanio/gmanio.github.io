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

    let result = Object.assign({}, {});

    const page = await browser.newPage();
    const urlParams = new URLSearchParams({ pblancId: pblancId.toString() });
    await page.goto(`${baseUrl}?${urlParams.toString()}`);

    try {
      const articleId = parseInt(pblancId.toString(), 10);
      result = Object.assign(result, { articleId });
    } catch (err: any) {
      res.status(500).json({
        statusCode: 500,
        error: true,
        errorMessage: `articleId Parse Error! : ${err.message}`,
        result: {},
      });
    }

    try {
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

      result = Object.assign(result, { ...basicInfos });
    } catch (err) {
      return res.status(500).json({
        statusCode: 500,
        error: true,
        errorMessage: "basicInfos Parse Error!",
        result: {},
      });
    }

    try {
      const leaseSupplyInfo = await page.$eval(".danjiInfo", (el: any) => {
        const supplyInfosEl = el.querySelector("#suplyTableBody");
        let leaseInfo = {};

        if (supplyInfosEl) {
          return [];
        }

        Array.from(el.querySelectorAll(".danjiWrap .table_type2")).map(
          (table: any) => {
            const title = table.summary && table.summary;
            let region = "";

            if (title.indexOf("대상지역") > -1) {
              Object.assign(leaseInfo, {
                targetRegion: {
                  title: title,
                  values: [
                    ...Array.from(table.querySelectorAll("tr")).map(
                      (row: any) => {
                        const index =
                          row.querySelector("th") &&
                          row.querySelector("th").innerText;

                        return {
                          index,
                          value:
                            row.querySelector("td") &&
                            row.querySelector("td").innerText,
                        };
                      }
                    ).filter((item: any) => !!item),
                  ],
                },
              });
            }

            if (title.indexOf("대상주택") > -1) {
              Object.assign(leaseInfo, {
                targetConditionInfo: {
                  title: title,
                  values: [
                    ...Array.from(table.querySelectorAll("tr")).map(
                      (row: any) => {
                        const index =
                          row.querySelector("th") &&
                          row.querySelector("th").innerText;
                          
                          if (index.indexOf("공고") > -1) {
                            Object.assign(leaseInfo, {
                              download: {
                                filename:
                                  row.querySelector("a") &&
                                  row.querySelector("a").innerText.trim(),
                                link:
                                  row.querySelector("a") &&
                                  row.querySelector("a").href,
                              },
                            });
  
                            return null;
                          }
                        return {
                          index,
                          value:
                            row.querySelector("td") &&
                            row.querySelector("td").innerText,
                        };
                      }
                    ).filter((item: any) => !!item),
                  ],
                },
              });
            }

            if (title.indexOf("모집") > -1) {
              Object.assign(leaseInfo, {
                supplyInfo: {
                  title: title,
                  values: [
                    ...Array.from(table.querySelectorAll("tr"))
                      .map((row: any) => {
                        let result = null;

                        if (row.querySelector("#mhshldTot")) {
                          result = {
                            key: "계",
                            value: [
                              {
                                key: "계",
                                value:
                                  row.querySelector("#mhshldTot").innerText,
                              },
                              row.querySelector("#totCol1") && {
                                key: "1~2인 가구",
                                value: row.querySelector("#totCol1").innerText,
                              },
                              row.querySelector("#totCol2") && {
                                key: "3~4인 가구",
                                value: row.querySelector("#totCol2").innerText,
                              },
                              row.querySelector("#totCol3") && {
                                key: "5인이상 가구",
                                value: row.querySelector("#totCol3").innerText,
                              },
                            ],
                          };
                        }
                        const THAll: any = Array.from(
                          row.querySelectorAll("th")
                        );

                        if (
                          row.querySelectorAll("th") &&
                          row.querySelectorAll("th").length > 0 &&
                          row.querySelectorAll("td").length > 1
                        ) {
                          if (THAll.length > 1) {
                            region = THAll[0].innerText;
                          }

                          result = {
                            index:
                              THAll.length === 1
                                ? `${region} ` +
                                  THAll.map((th: any) => th.innerText)
                                : THAll.map((th: any) => th.innerText).join(
                                    " "
                                  ),
                            value: [
                              ...Array.from(row.querySelectorAll("td")).map(
                                (td: any, index) => {
                                  let key = "";
                                  if (index == 0) {
                                    key = "계";
                                  }
                                  if (index == 1) {
                                    key = "1~2인 가구";
                                  }
                                  if (index == 2) {
                                    key = "3~4인 가구";
                                  }
                                  if (index == 3) {
                                    key = "5인이상 가구";
                                  }

                                  return {
                                    column: key,
                                    value: td.innerText,
                                  };
                                }
                              ),
                            ],
                          };
                        }

                        return result;
                      })
                      .filter((item: any) => !!item),
                  ],
                },
              });
            }

            if (title.indexOf("조건") > -1) {
              Object.assign(leaseInfo, {
                leaseConditionInfo: {
                  title: title,
                  values: [
                    ...Array.from(table.querySelectorAll("tr"))
                      .map((row: any) => {
                        const key =
                          row.querySelector("th") &&
                          row.querySelector("th").innerText;

                        if (key.indexOf("공고") > -1) {
                          Object.assign(leaseInfo, {
                            download: {
                              filename:
                                row.querySelector("a") &&
                                row.querySelector("a").innerText.trim(),
                              link:
                                row.querySelector("a") &&
                                row.querySelector("a").href,
                            },
                          });

                          return null;
                        }

                        return {
                          index: key,
                          value:
                            row.querySelector("td") &&
                            row.querySelector("td").innerText,
                        };
                      })
                      .filter((item: any) => !!item),
                  ],
                },
              });
            }

            if (title.indexOf("문의") > -1) {
              Object.assign(leaseInfo, {
                question: {
                  title: title,
                  value:
                    table.querySelector("td") &&
                    table.querySelector("td").innerText,
                },
              });
            }
          }
        );

        return leaseInfo;
      });

      result = Object.assign(result, { leaseSupplyInfo });
    } catch (err: any) {
      return res.status(500).json({
        statusCode: 500,
        error: true,
        errorMessage: `leaseInfos Parse Error! : ${err.message}`,
        result: {},
      });
    }

    try {
      let danjiInfos = [];

      const list: Array<ElementHandle<any>> = await page.$$("#hsmpNmUl>li");

      for (const node of Array.from(list)) {
        await node.click();

        const danjiInfo = await page.$eval(".danjiInfo", (el: any) => {
          const downloadEl = el.querySelector("td > a");
          const supplyInfosEl = el.querySelector("#suplyTableBody");

          const rows =
            supplyInfosEl && supplyInfosEl.children
              ? supplyInfosEl.children
              : [];

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
            name:
              el.querySelector("#hsmpNmUl>.on") &&
              el.querySelector("#hsmpNmUl>.on").innerText,
            address:
              el.querySelector("#fullAdres") &&
              el.querySelector("#fullAdres").firstChild.nodeValue.trim(),
            totalUnit:
              el.querySelector("#totHshldCo") &&
              el.querySelector("#totHshldCo").innerText.trim(),
            supplyUnit:
              el.querySelector("#lttotHoCo") &&
              el.querySelector("#lttotHoCo").innerText.trim(),
            entranceYear:
              el.querySelector("#mvnPrearngeYear") &&
              el.querySelector("#mvnPrearngeYear").innerText.trim(),
            entranceMonth:
              el.querySelector("#mvnPrearngeMt") &&
              el.querySelector("#mvnPrearngeMt").innerText.trim(),
            heatType:
              el.querySelector("#heatMthdNm") &&
              el.querySelector("#heatMthdNm").innerText.trim(),
            scale:
              el.querySelector("#dongCo") &&
              el.querySelector("#dongCo").innerText.trim(),
            reference:
              el.querySelector("#refrnc") &&
              el.querySelector("#refrnc").innerText.trim(),
            etc:
              el.querySelector("#partclrMatter") &&
              el.querySelector("#partclrMatter").innerText.trim(),
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

      result = Object.assign(result, { danjiInfos });
    } catch (err: any) {
      return res.status(500).json({
        statusCode: 500,
        error: true,
        errorMessage: `danjiInfos Parse Error! : ${err.message}`,
        result: {},
      });
    }

    try {
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

      result = Object.assign(result, { planInfo });
    } catch (err: any) {
      return res.status(500).json({
        statusCode: 500,
        error: true,
        errorMessage: `planInfo Parse Error! : ${err.message}`,
        result: {},
      });
    }

    const uploadParams = {
      Bucket: "lease-project",
      Key: `detail/lease-item-${pblancId}.json`,
      ACL: "public-read",
      Body: JSON.stringify(result),
      ContentType: "application/json",
    };

    try {
      const s3 = new AWS.S3({
        accessKeyId: "AKIAXW3POAMCU54ICH7I",
        secretAccessKey: "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",
        region: "ap-northeast-2",
      });

      await s3.upload(uploadParams).promise();
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        error: true,
        errorMessage: "S3 upload Failed",
        result: {},
      });
    }

    let articleCafeId = 0;

    const naverCafeUrl = `https://cafe.naver.com/ArticleSearchList.nhn?search.clubid=30537001&search.searchdate=all&search.searchBy=0&search.query=${encodeURIComponent(
      result.articleTitle
    )}&search.defaultValue=1&search.menuid=4`;

    try {
      await page.goto(naverCafeUrl);

      const articleId = await page.$eval(".result-board", (el: any) => {
        if (!el.querySelectorAll("tr")) {
          return 0;
        }

        return Array.from(el.querySelectorAll("tr")).map((tr: any) => {
          return tr.querySelector(".border-number .innernumber").innerText;
        });
      });

      articleCafeId = articleId && articleId[0];
    } catch (err: any) {
      // return res.status(500).json({
      //   statusCode: 500,
      //   error: true,
      //   errorMessage: `get NaverCafeArticleId Error : ${err.message}`,
      //   result: {},
      // });
    }

    result = Object.assign(result, { articleCafeId });

    await browser.close();

    return res.status(200).json({
      statusCode: 200,
      error: false,
      errorMessage: "",
      result: result,
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
