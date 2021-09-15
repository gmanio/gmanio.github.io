"use strict";
(() => {
var exports = {};
exports.id = 65;
exports.ids = [65];
exports.modules = {

/***/ 887:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: external "puppeteer"
var external_puppeteer_ = __webpack_require__(750);
var external_puppeteer_default = /*#__PURE__*/__webpack_require__.n(external_puppeteer_);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: external "aws-sdk"
const external_aws_sdk_namespaceObject = require("aws-sdk");
var external_aws_sdk_default = /*#__PURE__*/__webpack_require__.n(external_aws_sdk_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/api/lh/upload/index.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const baseUrl = "https://www.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcDetailView.do";
async function handler(req, res) {
  try {
    const {
      pblancId
    } = req.query;
    const browser = await external_puppeteer_default().launch({
      headless: true,
      devtools: false
    });
    const page = await browser.newPage();
    const urlParams = new URLSearchParams({
      pblancId: pblancId.toString()
    });
    await page.goto(`${baseUrl}?${urlParams.toString()}`);
    const articleId = parseInt(pblancId.toString(), 10);
    const basicInfos = await page.$eval(".viewArea", el => {
      let basicInfos = {};
      Array.from(el.querySelectorAll(".basicInfo > .info dt")).map(DT => {
        if (DT.innerText.trim() === "공급기관") {
          Object.assign(basicInfos, {
            corporation: DT.nextElementSibling.innerText
          });
        }

        if (DT.innerText.trim() === "유형") {
          Object.assign(basicInfos, {
            leaseType: DT.nextElementSibling.innerText
          });
        }

        if (DT.innerText.trim() === "주택유형") {
          Object.assign(basicInfos, {
            houseType: DT.nextElementSibling.innerText
          });
        }
      });
      Object.assign(basicInfos, {
        target: Array.from(el.querySelectorAll(".basicInfo > .info .ds")).map(el => el.innerText)
      });
      return {
        articleType: el.querySelector(".viewTop > span").innerText,
        articleTitle: el.querySelector(".viewTop > em").innerText,
        articleDetailLink: el.querySelector(".basicInfo .detailBtn a").href,
        basicInfo: basicInfos
      };
    });
    const list = await page.$$("#hsmpNmUl>li");
    let danjiInfos = [];

    for (const node of Array.from(list)) {
      await node.click();
      const danjiInfo = await page.$eval(".danjiInfo", el => {
        const dowunloadEl = el.querySelector("td > a");
        const supplyInfosEl = el.querySelector("#suplyTableBody");
        const rows = supplyInfosEl.children;
        const supplyInfos = Array.from(rows).map(row => {
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
            monthlyAmount: children[8].textContent
          };
        });
        return {
          name: el.querySelector("#hsmpNmUl>.on").innerText,
          address: el.querySelector("#fullAdres").innerText.trim(),
          totalUnit: el.querySelector("#totHshldCo").innerText.trim(),
          supplyUnit: el.querySelector("#lttotHoCo").innerText.trim(),
          entranceYear: el.querySelector("#mvnPrearngeYear").innerText.trim(),
          entranceMonth: el.querySelector("#mvnPrearngeMt").innerText.trim(),
          heatType: el.querySelector("#heatMthdNm").innerText.trim(),
          scale: el.querySelector("#dongCo").innerText.trim(),
          reference: el.querySelector("#refrnc").innerText.trim(),
          etc: el.querySelector("#partclrMatter").innerText.trim(),
          download: {
            filename: dowunloadEl.innerText.trim(),
            link: dowunloadEl.href
          },
          supplyInfos
        };
      });
      const naverAddressesResponse = await external_axios_default().get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(danjiInfo.address)}`, {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "supkh581zm",
          "X-NCP-APIGW-API-KEY": "fbz2fnolfzk3nJtxKkkh4dhs8mKBlOBbR27HjxS5"
        }
      });

      if (naverAddressesResponse.status === 200 && naverAddressesResponse.data && naverAddressesResponse.data.addresses.length > 0) {
        Object.assign(danjiInfo, {
          addressDetail: naverAddressesResponse.data.addresses[0]
        });
      }

      danjiInfos.push(_objectSpread({}, danjiInfo));
    }

    const planInfo = await page.$eval(".schInfo .table_type2", el => {
      let plansInfo = {};
      let supplyInfos = [];
      el.querySelectorAll("tr").forEach(row => {
        if (row.querySelector("th").innerText === "모집공고일") {
          Object.assign(plansInfo, {
            planDate: row.querySelector("td").innerText
          });
          return;
        }

        if (row.querySelector("th").innerText === "당첨자 발표일") {
          Object.assign(plansInfo, {
            lotteryDate: row.querySelector("td").innerText
          });
          return;
        }

        if (row.querySelector("th").innerText === "일정관련 안내사항") {
          Object.assign(plansInfo, {
            planNoticeInfo: row.querySelector("td").innerText
          });
          return;
        } // if (row.querySelectorAll("th").length === 1) {
        //   supplyInfos.push({
        //     supplyType: "일반공급",
        //     priority: row.querySelector("th").innerText,
        //     conditions: Array.from(row.querySelectorAll("td dt")).map(
        //       (dt: any) => {
        //         return {
        //           title: dt.innerText,
        //           description: dt.nextElementSibling.innerText,
        //         };
        //       }
        //     ),
        //   });
        // }


        const thLength = row.querySelectorAll("th").length;
        const rowSpan = parseInt(row.querySelector("th").getAttribute("rowspan"), 10);

        if (thLength === 1 && !!rowSpan) {
          supplyInfos.push({
            supplyType: row.querySelector("th").innerText,
            priority: "1순위",
            conditions: Array.from(row.querySelectorAll("td dt")).map(dt => {
              return {
                title: dt.innerText,
                description: dt.nextElementSibling.innerText
              };
            })
          });
        }

        if (thLength === 2 && rowSpan === 2) {
          supplyInfos.push({
            supplyType: row.querySelectorAll("th")[0].innerText,
            priority: row.querySelectorAll("th")[1].innerText,
            conditions: Array.from(row.querySelectorAll("td dt")).map(dt => {
              return {
                title: dt.innerText,
                description: dt.nextElementSibling.innerText
              };
            })
          });
          const nextRow = row.nextElementSibling;
          supplyInfos.push({
            supplyType: row.querySelectorAll("th")[0].innerText,
            priority: nextRow.querySelector("th").innerText,
            conditions: Array.from(nextRow.querySelectorAll("td dt")).map(dt => {
              return {
                title: dt.innerText,
                description: dt.nextElementSibling.innerText
              };
            })
          });
        }

        if (thLength === 2 && rowSpan === 3) {
          supplyInfos.push({
            supplyType: row.querySelectorAll("th")[0].innerText,
            priority: row.querySelectorAll("th")[1].innerText,
            conditions: Array.from(row.querySelectorAll("td dt")).map(dt => {
              return {
                title: dt.innerText,
                description: dt.nextElementSibling.innerText
              };
            })
          });
          const nextRow = row.nextElementSibling;
          supplyInfos.push({
            supplyType: row.querySelectorAll("th")[0].innerText,
            priority: nextRow.querySelector("th").innerText,
            conditions: Array.from(nextRow.querySelectorAll("td dt")).map(dt => {
              return {
                title: dt.innerText,
                description: dt.nextElementSibling.innerText
              };
            })
          });
          const nextnextRow = nextRow.nextElementSibling;
          supplyInfos.push({
            supplyType: row.querySelectorAll("th")[0].innerText,
            priority: nextnextRow.querySelector("th").innerText,
            conditions: Array.from(nextnextRow.querySelectorAll("td dt")).map(dt => {
              return {
                title: dt.innerText,
                description: dt.nextElementSibling.innerText
              };
            })
          });
        }
      });

      if (supplyInfos.length > 0) {
        Object.assign(plansInfo, {
          supplyInfos: [...supplyInfos]
        });
      }

      return plansInfo;
    });
    await browser.close();
    const uploadParams = {
      Bucket: "lease-project",
      Key: `detail/lease-item-${pblancId}.json`,
      ACL: "public-read",
      Body: JSON.stringify(_objectSpread(_objectSpread({
        articleId
      }, basicInfos), {}, {
        danjiInfos,
        planInfo
      })),
      ContentType: "application/json"
    };

    try {
      const s3 = new (external_aws_sdk_default()).S3({
        accessKeyId: "AKIAXW3POAMCWWENDUP6",
        secretAccessKey: "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",
        region: "ap-northeast-2"
      });
      await s3.upload(uploadParams).promise();
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        error: true,
        errorMessage: "S3 upload Failed",
        result: {}
      });
    }

    res.status(200).json({
      statusCode: 200,
      error: false,
      errorMessage: "",
      result: _objectSpread(_objectSpread({
        articleId
      }, basicInfos), {}, {
        danjiInfos,
        planInfo
      })
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      error: true,
      errorMessage: err.message,
      result: {}
    });
  }
}

/***/ }),

/***/ 376:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 750:
/***/ ((module) => {

module.exports = require("puppeteer");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(887));
module.exports = __webpack_exports__;

})();