import type { NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
import LitJsSdk from "@lit-protocol/sdk-nodejs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessKey, webhookContext } = req.body;
  const { verified, header, payload } = LitJsSdk.verifyJwt({ accessKey });

  let errorMessage: string;
  let resourceId = webhookContext?.resourceId ?? {};
  if (!verified) {
    res.status(403);
    errorMessage = "jwt is not valid";
  } else if (
    resourceId.baseUrl !== payload.baseUrl ||
    resourceId.path !== payload.path ||
    resourceId.orgId !== payload.orgId
  ) {
    res.status(403);
    errorMessage = "resourceId does not match";
  }

  return res.json({
    verified,
    header,
    payload,
  });
};

export default handler;
