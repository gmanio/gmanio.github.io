"use strict";
(() => {
var exports = {};
exports.id = 452;
exports.ids = [452];
exports.modules = {

/***/ 452:
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
;// CONCATENATED MODULE: external "iconv-lite"
const external_iconv_lite_namespaceObject = require("iconv-lite");
var external_iconv_lite_default = /*#__PURE__*/__webpack_require__.n(external_iconv_lite_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/api/cafe.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






async function handler(req, res) {
  const {
    pblancId
  } = req.query;
  const refresh_token = "0rt7KQtEipOXwCEToUG8WwIpMIPaPSqgMdk42T2FUSiiAubDipKjPbm5SmCw8riiyqMbLcwJ84CZ68iiuTIeZap12aQYgvZF3RZcVq1P33c5RuKkYkAIz1K3asDy3Tb9v9VdH";
  const NAVER_CLIENT_ID = "mM5ado2kxolULgq8iK6E";
  const NAVER_SECRET_KEY = "5rjFMzLEho";
  const response = await external_axios_default().get(`https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SECRET_KEY}&refresh_token=${refresh_token}`);
  const access_token = response.data.access_token;
  const header = "Bearer " + access_token; // Bearer 다음에 공백 추가

  const clubid = 30537001; // 카페의 고유 ID값

  const menuid = 17; // 카페 게시판 id (상품게시판은 입력 불가)

  const responseParser = await external_axios_default().get(`http://front.tumblbug.com:3000/api/lh?pblancId=${pblancId}`);
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
  const formData = new (external_form_data_default())();
  formData.append("subject", subject.toString());
  formData.append("content", external_iconv_lite_default().encode(content, "EUC-KR"));

  try {
    const response = await external_axios_default().get(fileLink, {
      responseType: "arraybuffer"
    });
    const options = {
      density: 100,
      saveFilename: "file",
      savePath: "./public/pdf",
      format: "jpeg",
      width: 960,
      height: 1280
    };
    const storeAsImage = await (0,external_pdf2pic_namespaceObject.fromBuffer)(Buffer.from(response.data), options);
    const images = await storeAsImage.bulk(-1, false);
    images.map(image => formData.append("image", external_fs_default().createReadStream(`${process.cwd()}/public/pdf/${image.name}`)));
    const postResponse = await external_axios_default().post(`https://openapi.naver.com/v1/cafe/${clubid}/menu/${menuid}/articles`, formData, {
      headers: _objectSpread(_objectSpread({}, formData.getHeaders()), {}, {
        Authorization: header
      })
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
var __webpack_exports__ = (__webpack_exec__(452));
module.exports = __webpack_exports__;

})();