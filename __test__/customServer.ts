const { createServer } = require("http");
const next = require("next");
const { parse } = require("url");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req: { url: any }, res: any) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(3004, (err: any) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3004");
  });
});
