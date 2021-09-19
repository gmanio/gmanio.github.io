"use strict";
(() => {
var exports = {};
exports.id = 452;
exports.ids = [452];
exports.modules = {

/***/ 79:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = require("fs");
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_namespaceObject);
;// CONCATENATED MODULE: external "pdf2pic"
const external_pdf2pic_namespaceObject = require("pdf2pic");
;// CONCATENATED MODULE: external "form-data"
const external_form_data_namespaceObject = require("form-data");
var external_form_data_default = /*#__PURE__*/__webpack_require__.n(external_form_data_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/api/cafe.ts




async function handler(req, res) {
  const {
    title,
    description
  } = req.query;
  const refresh_token = "0rt7KQtEipOXwCEToUG8WwIpMIPaPSqgMdk42T2FUSiiAubDipKjPbm5SmCw8riiyqMbLcwJ84CZ68iiuTIeZap12aQYgvZF3RZcVq1P33c5RuKkYkAIz1K3asDy3Tb9v9VdH";
  const NAVER_CLIENT_ID = "mM5ado2kxolULgq8iK6E";
  const NAVER_SECRET_KEY = "5rjFMzLEho";
  const response = await external_axios_default().get(`https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SECRET_KEY}&refresh_token=${refresh_token}`);
  const access_token = response.data.access_token;
  const header = "Bearer " + access_token; // Bearer 다음에 공백 추가

  const clubid = 30537001; // 카페의 고유 ID값

  const menuid = 1; // 카페 게시판 id (상품게시판은 입력 불가)

  const subject = encodeURI(title.toString());
  const content = encodeURI(description.toString());
  const formData = new (external_form_data_default())({
    maxDataSize: 20971520
  });
  formData.append("subject", subject);
  formData.append("content", content);

  try {
    const pdfLink = "https://www.myhome.go.kr/hws/com/fms/cvplFileDownload.do?atchFileId=17bf2dd053b26&fileSn=1";
    const response = await external_axios_default().get(pdfLink, {
      responseType: "arraybuffer"
    });
    const options = {
      density: 70,
      saveFilename: "file",
      savePath: "./public/pdf",
      format: "png",
      width: 600,
      height: 800
    };
    const storeAsImage = await (0,external_pdf2pic_namespaceObject.fromBuffer)(Buffer.from(response.data), options);
    const images = await storeAsImage(-1, false);
    const formData = {
      subject: subject,
      content: content,
      image: [...images.map(image => {
        const dir = process.cwd();
        return {
          value: external_fs_default().createReadStream(`${dir}/public/pdf/${image.name}`),
          options: {
            filename: image.name,
            contentType: "image/png"
          }
        };
      })]
    };
    const postResponse = await external_axios_default().post(`https://openapi.naver.com/v1/cafe/${clubid}/menu/${menuid}/articles`, formData, {
      headers: {
        Authorization: header
      }
    });
    res.status(200).json({
      statusCode: 200,
      error: true,
      errorMessage: "",
      result: postResponse.data
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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(79));
module.exports = __webpack_exports__;

})();