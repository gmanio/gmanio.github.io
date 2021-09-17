"use strict";
(() => {
var exports = {};
exports.id = 452;
exports.ids = [452];
exports.modules = {

/***/ 184:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
const baseUrl = "https://www.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcDetailView.do";
async function handler(req, res) {
  try {
    var token = "YOUR_ACCESS_TOKEN";
    var header = "Bearer " + token; // Bearer 다음에 공백 추가

    var clubid = "CAFE_ID"; // 카페의 고유 ID값

    var nickname = "NICK_NAME";
    res.status(200).json({
      statusCode: 200,
      error: true,
      errorMessage: "",
      result: {}
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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(184));
module.exports = __webpack_exports__;

})();