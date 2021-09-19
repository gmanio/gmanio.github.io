// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs";
import { fromBuffer } from "pdf2pic";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { pblancId } = req.query;
    const pdfLink =
      "https://www.myhome.go.kr/hws/com/fms/cvplFileDownload.do?atchFileId=17bf2dd053b26&fileSn=1";

    const response = await axios.get(pdfLink, {
      responseType: "arraybuffer",
    });
    const options = {
      density: 100,
      saveFilename: "file",
      savePath: "./public/pdf",
      format: "png",
      width: 600,
      height: 800,
    };
    const storeAsImage = await fromBuffer(Buffer.from(response.data), options);
    const images = await storeAsImage.bulk(-1, false);

    res.status(200).send(images);
  } catch (e) {
    res.status(500).json({ name: e.message });
  }
}
