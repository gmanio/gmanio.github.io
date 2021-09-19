"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/cafe";
exports.ids = ["pages/api/cafe"];
exports.modules = {

/***/ "./src/pages/api/cafe.ts":
/*!*******************************!*\
  !*** ./src/pages/api/cafe.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var pdf2pic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pdf2pic */ \"pdf2pic\");\n/* harmony import */ var pdf2pic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pdf2pic__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! form-data */ \"form-data\");\n/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(form_data__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nasync function handler(req, res) {\n  const {\n    title,\n    description\n  } = req.query;\n  const refresh_token = \"0rt7KQtEipOXwCEToUG8WwIpMIPaPSqgMdk42T2FUSiiAubDipKjPbm5SmCw8riiyqMbLcwJ84CZ68iiuTIeZap12aQYgvZF3RZcVq1P33c5RuKkYkAIz1K3asDy3Tb9v9VdH\";\n  const NAVER_CLIENT_ID = \"mM5ado2kxolULgq8iK6E\";\n  const NAVER_SECRET_KEY = \"5rjFMzLEho\";\n  const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SECRET_KEY}&refresh_token=${refresh_token}`);\n  const access_token = response.data.access_token;\n  const header = \"Bearer \" + access_token; // Bearer 다음에 공백 추가\n\n  const clubid = 30537001; // 카페의 고유 ID값\n\n  const menuid = 1; // 카페 게시판 id (상품게시판은 입력 불가)\n\n  const subject = encodeURI(title.toString());\n  const content = encodeURI(description.toString());\n  const formData = new (form_data__WEBPACK_IMPORTED_MODULE_3___default())({\n    maxDataSize: 20971520\n  });\n  formData.append(\"subject\", subject);\n  formData.append(\"content\", content);\n\n  try {\n    const pdfLink = \"https://www.myhome.go.kr/hws/com/fms/cvplFileDownload.do?atchFileId=17bf2dd053b26&fileSn=1\";\n    const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(pdfLink, {\n      responseType: \"arraybuffer\"\n    });\n    const options = {\n      density: 70,\n      saveFilename: \"file\",\n      savePath: \"./public/pdf\",\n      format: \"png\",\n      width: 600,\n      height: 800\n    };\n    const storeAsImage = await (0,pdf2pic__WEBPACK_IMPORTED_MODULE_2__.fromBuffer)(Buffer.from(response.data), options);\n    const images = await storeAsImage.bulk(-1, false);\n    const formData = {\n      subject: subject,\n      content: content,\n      image: [...images.map(image => {\n        const dir = process.cwd();\n        return {\n          value: fs__WEBPACK_IMPORTED_MODULE_1___default().createReadStream(`${dir}/public/pdf/${image.name}`),\n          options: {\n            filename: image.name,\n            contentType: \"image/png\"\n          }\n        };\n      })]\n    };\n    const postResponse = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(`https://openapi.naver.com/v1/cafe/${clubid}/menu/${menuid}/articles`, formData, {\n      headers: {\n        Authorization: header\n      }\n    });\n    res.status(200).json({\n      statusCode: 200,\n      error: true,\n      errorMessage: \"\",\n      result: postResponse.data\n    });\n  } catch (err) {\n    res.status(500).json({\n      statusCode: 500,\n      error: true,\n      errorMessage: err.message,\n      result: {}\n    });\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBLENBQ3hCLHFDQUFvQ2tCLE1BQU8sU0FBUUMsTUFBTyxXQURsQyxFQUV6QkssUUFGeUIsRUFHekI7QUFDRTZCLE1BQUFBLE9BQU8sRUFBRTtBQUNQQyxRQUFBQSxhQUFhLEVBQUVyQztBQURSO0FBRFgsS0FIeUIsQ0FBM0I7QUFVQVgsSUFBQUEsR0FBRyxDQUFDaUQsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQ25CQyxNQUFBQSxVQUFVLEVBQUUsR0FETztBQUVuQkMsTUFBQUEsS0FBSyxFQUFFLElBRlk7QUFHbkJDLE1BQUFBLFlBQVksRUFBRSxFQUhLO0FBSW5CQyxNQUFBQSxNQUFNLEVBQUVULFlBQVksQ0FBQ25DO0FBSkYsS0FBckI7QUFNRCxHQWhERCxDQWdERSxPQUFPNkMsR0FBUCxFQUFpQjtBQUNqQnZELElBQUFBLEdBQUcsQ0FBQ2lELE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUNuQkMsTUFBQUEsVUFBVSxFQUFFLEdBRE87QUFFbkJDLE1BQUFBLEtBQUssRUFBRSxJQUZZO0FBR25CQyxNQUFBQSxZQUFZLEVBQUVFLEdBQUcsQ0FBQ0MsT0FIQztBQUluQkYsTUFBQUEsTUFBTSxFQUFFO0FBSlcsS0FBckI7QUFNRDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ21hbmlvLy4vc3JjL3BhZ2VzL2FwaS9jYWZlLnRzPzBjY2QiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGZyb21CdWZmZXIgfSBmcm9tIFwicGRmMnBpY1wiO1xuaW1wb3J0IEZyb21EYXRhIGZyb20gXCJmb3JtLWRhdGFcIjtcbmltcG9ydCByZXF1ZXN0IGZyb20gXCJyZXF1ZXN0XCI7XG50eXBlIERhdGEgPSB7XG4gIGVycm9yOiBib29sZWFuO1xuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgcmVzdWx0OiBhbnk7XG4gIHN0YXR1c0NvZGU6IG51bWJlcjtcbn07XG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxEYXRhPlxuKSB7XG4gIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uIH0gPSByZXEucXVlcnk7XG4gIGNvbnN0IHJlZnJlc2hfdG9rZW4gPVxuICAgIFwiMHJ0N0tRdEVpcE9Yd0NFVG9VRzhXd0lwTUlQYVBTcWdNZGs0MlQyRlVTaWlBdWJEaXBLalBibTVTbUN3OHJpaXlxTWJMY3dKODRDWjY4aWl1VEllWmFwMTJhUVlndlpGM1JaY1ZxMVAzM2M1UnVLa1lrQUl6MUszYXNEeTNUYjl2OVZkSFwiO1xuICBjb25zdCBOQVZFUl9DTElFTlRfSUQgPSBcIm1NNWFkbzJreG9sVUxncThpSzZFXCI7XG4gIGNvbnN0IE5BVkVSX1NFQ1JFVF9LRVkgPSBcIjVyakZNekxFaG9cIjtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoXG4gICAgYGh0dHBzOi8vbmlkLm5hdmVyLmNvbS9vYXV0aDIuMC90b2tlbj9ncmFudF90eXBlPXJlZnJlc2hfdG9rZW4mY2xpZW50X2lkPSR7TkFWRVJfQ0xJRU5UX0lEfSZjbGllbnRfc2VjcmV0PSR7TkFWRVJfU0VDUkVUX0tFWX0mcmVmcmVzaF90b2tlbj0ke3JlZnJlc2hfdG9rZW59YFxuICApO1xuICBjb25zdCBhY2Nlc3NfdG9rZW4gPSByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbjtcbiAgY29uc3QgaGVhZGVyID0gXCJCZWFyZXIgXCIgKyBhY2Nlc3NfdG9rZW47IC8vIEJlYXJlciDri6TsnYzsl5Ag6rO167CxIOy2lOqwgFxuICBjb25zdCBjbHViaWQgPSAzMDUzNzAwMTsgLy8g7Lm07Y6Y7J2YIOqzoOycoCBJROqwklxuICBjb25zdCBtZW51aWQgPSAxOyAvLyDsubTtjpgg6rKM7Iuc7YyQIGlkICjsg4Htkojqsozsi5ztjJDsnYAg7J6F66ClIOu2iOqwgClcbiAgY29uc3Qgc3ViamVjdCA9IGVuY29kZVVSSSh0aXRsZS50b1N0cmluZygpKTtcbiAgY29uc3QgY29udGVudCA9IGVuY29kZVVSSShkZXNjcmlwdGlvbi50b1N0cmluZygpKTtcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRnJvbURhdGEoeyBtYXhEYXRhU2l6ZTogMjA5NzE1MjAgfSk7XG4gIGZvcm1EYXRhLmFwcGVuZChcInN1YmplY3RcIiwgc3ViamVjdCk7XG4gIGZvcm1EYXRhLmFwcGVuZChcImNvbnRlbnRcIiwgY29udGVudCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwZGZMaW5rID1cbiAgICAgIFwiaHR0cHM6Ly93d3cubXlob21lLmdvLmtyL2h3cy9jb20vZm1zL2N2cGxGaWxlRG93bmxvYWQuZG8/YXRjaEZpbGVJZD0xN2JmMmRkMDUzYjI2JmZpbGVTbj0xXCI7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChwZGZMaW5rLCB7XG4gICAgICByZXNwb25zZVR5cGU6IFwiYXJyYXlidWZmZXJcIixcbiAgICB9KTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgZGVuc2l0eTogNzAsXG4gICAgICBzYXZlRmlsZW5hbWU6IFwiZmlsZVwiLFxuICAgICAgc2F2ZVBhdGg6IFwiLi9wdWJsaWMvcGRmXCIsXG4gICAgICBmb3JtYXQ6IFwicG5nXCIsXG4gICAgICB3aWR0aDogNjAwLFxuICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgfTtcbiAgICBjb25zdCBzdG9yZUFzSW1hZ2UgPSBhd2FpdCBmcm9tQnVmZmVyKEJ1ZmZlci5mcm9tKHJlc3BvbnNlLmRhdGEpLCBvcHRpb25zKTtcbiAgICBjb25zdCBpbWFnZXMgPSBhd2FpdCBzdG9yZUFzSW1hZ2UuYnVsaygtMSwgZmFsc2UpO1xuXG4gICAgY29uc3QgZm9ybURhdGEgPSB7XG4gICAgICBzdWJqZWN0OiBzdWJqZWN0LFxuICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgIGltYWdlOiBbXG4gICAgICAgIC4uLmltYWdlcy5tYXAoKGltYWdlKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGlyID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IGZzLmNyZWF0ZVJlYWRTdHJlYW0oYCR7ZGlyfS9wdWJsaWMvcGRmLyR7aW1hZ2UubmFtZX1gKSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHsgZmlsZW5hbWU6IGltYWdlLm5hbWUsIGNvbnRlbnRUeXBlOiBcImltYWdlL3BuZ1wiIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH07XG5cbiAgICBjb25zdCBwb3N0UmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KFxuICAgICAgYGh0dHBzOi8vb3BlbmFwaS5uYXZlci5jb20vdjEvY2FmZS8ke2NsdWJpZH0vbWVudS8ke21lbnVpZH0vYXJ0aWNsZXNgLFxuICAgICAgZm9ybURhdGEsXG4gICAgICB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBoZWFkZXJcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgZXJyb3I6IHRydWUsXG4gICAgICBlcnJvck1lc3NhZ2U6IFwiXCIsXG4gICAgICByZXN1bHQ6IHBvc3RSZXNwb25zZS5kYXRhLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgZXJyb3JNZXNzYWdlOiBlcnIubWVzc2FnZSxcbiAgICAgIHJlc3VsdDoge30sXG4gICAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJheGlvcyIsImZzIiwiZnJvbUJ1ZmZlciIsIkZyb21EYXRhIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJxdWVyeSIsInJlZnJlc2hfdG9rZW4iLCJOQVZFUl9DTElFTlRfSUQiLCJOQVZFUl9TRUNSRVRfS0VZIiwicmVzcG9uc2UiLCJnZXQiLCJhY2Nlc3NfdG9rZW4iLCJkYXRhIiwiaGVhZGVyIiwiY2x1YmlkIiwibWVudWlkIiwic3ViamVjdCIsImVuY29kZVVSSSIsInRvU3RyaW5nIiwiY29udGVudCIsImZvcm1EYXRhIiwibWF4RGF0YVNpemUiLCJhcHBlbmQiLCJwZGZMaW5rIiwicmVzcG9uc2VUeXBlIiwib3B0aW9ucyIsImRlbnNpdHkiLCJzYXZlRmlsZW5hbWUiLCJzYXZlUGF0aCIsImZvcm1hdCIsIndpZHRoIiwiaGVpZ2h0Iiwic3RvcmVBc0ltYWdlIiwiQnVmZmVyIiwiZnJvbSIsImltYWdlcyIsImJ1bGsiLCJpbWFnZSIsIm1hcCIsImRpciIsInByb2Nlc3MiLCJjd2QiLCJ2YWx1ZSIsImNyZWF0ZVJlYWRTdHJlYW0iLCJuYW1lIiwiZmlsZW5hbWUiLCJjb250ZW50VHlwZSIsInBvc3RSZXNwb25zZSIsInBvc3QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInN0YXR1cyIsImpzb24iLCJzdGF0dXNDb2RlIiwiZXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJyZXN1bHQiLCJlcnIiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/api/cafe.ts\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "form-data":
/*!****************************!*\
  !*** external "form-data" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("form-data");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "pdf2pic":
/*!**************************!*\
  !*** external "pdf2pic" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("pdf2pic");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/api/cafe.ts"));
module.exports = __webpack_exports__;

})();