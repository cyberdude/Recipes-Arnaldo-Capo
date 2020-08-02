import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";
// const httpProxyMiddleware = require("next-http-proxy-middleware");

export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target: "http://www.recipepuppy.com",
  });
