"use strict";
(() => {
var exports = {};
exports.id = 168;
exports.ids = [168];
exports.modules = {

/***/ 761:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
const baseUrl = "https://www.myhome.go.kr/hws/portal/sch/selectRsdtRcritNtcDetailView.do";
async function handler(req, res) {
  const NAVER_CLIENT_ID = 'mM5ado2kxolULgq8iK6E';
  var api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + NAVER_CLIENT_ID + '&redirect_uri=' + 'http://front.tumblbug.com:3000/api/naver/login/callback' + '&state=' + 'RAMDOM_STATE';
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });
  res.end("<a href='" + api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
}

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(761));
module.exports = __webpack_exports__;

})();