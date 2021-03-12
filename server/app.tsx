import * as express from 'express';
import fs from 'fs';
import path from 'path';
import App from '../src/app';
import { renderToString } from 'react-dom/server';

const app: express.Application = express();
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

app.disable('x-powered-by');

app.get('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const renderString = renderToString(<App />);

  const result = html.replace('<div id="app"/>', `<div id="app">${renderString}</div>`);
  res.send(result);
});

export default app;
