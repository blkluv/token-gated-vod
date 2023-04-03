import React, { useEffect, useState } from "react";
import { Nav } from "../../components";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Player, usePlaybackInfo } from "@livepeer/react";
import useLit from "../../hooks/useLit";

//@ts-ignore
import LitJsSdk from "lit-js-sdk";

export default function Watch() {
  const router = useRouter();
  const playbackId = router.query.playbackId?.toString();
  const { address } = useAccount();
  const { litNodeClient, litConnected } = useLit();

  const [gatingError, setGatingError] = useState<string>();
  const [gateState, setGateState] = useState<"open" | "closed" | "checking">();
  const [jwt, setJwt] = useState("");

  // Step 1: Fetch playback URL
  const { data: playbackInfo, status: playbackInfoStatus } = usePlaybackInfo({
    playbackId,
  });

  async function checkLitGate(litNodeClient: any, playbackPolicy: any) {
    setGateState("checking");
    const bscSign = await LitJsSdk.checkAndSignAuthMessage({
      chain: "bsc",
      switchChain: false,
    });
    const jwt = await litNodeClient.getSignedToken({
      unifiedAccessControlConditions:
        playbackPolicy.webhookContext.accessControl,
      authSig: { ethereum: bscSign },
      resourceId: playbackPolicy.webhookContext.resourceId,
    });
    setJwt(jwt);
    return jwt;
  }

  // Step 2: Check Lit signing condition and obtain playback cookie
  useEffect(() => {
    if (playbackInfoStatus !== "success" || !playbackId) return;
    const { playbackPolicy } = playbackInfo?.meta ?? {};
    console.log(playbackInfo);
    checkLitGate(litNodeClient, playbackPolicy)
      .then(() => {})
      .catch((err: any) => {
        setGateState("closed");
      });
  }, [address, playbackInfoStatus, playbackInfo, playbackId, litNodeClient]);

  return (
    <>
      <Nav />
      <div className="flex flex-col text-lg items-center justify-center mt-40">
        <h1 className="text-4xl font-bold font-MontHeavy text-gray-100 mt-6">
          VOD Token Gating with Lit Signing Conditions
        </h1>
        <p className="text-base font-light text-gray-500 mt-2 w-1/2 text-center">
          Prove your identity to access the gated content.
        </p>
      </div>
      <div className="flex justify-center text-center font-matter">
        <div className="overflow-auto border border-solid border-[#C12EF150] rounded-md p-6 w-3/5 mt-20 "></div>
      </div>
    </>
  );
}
