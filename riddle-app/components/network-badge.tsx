"use client";
import React, { useMemo } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { Badge } from "./ui/badge";

const Networkbadge = () => {
  const { chainId } = useAccount();
  const isRightNetwork = useMemo(() => {
    if (chainId) {
      return chainId === 11155111;
    }
    return true;
  }, [chainId]);
  const { switchChain } = useSwitchChain();


  if (!isRightNetwork)
    return (
      <Badge
        className={`m-2 mr-5 ${!isRightNetwork && "cursor-pointer"}`}
        variant={isRightNetwork ? "default" : "destructive"}
        onClick={() => {
          switchChain({ chainId: 11155111 });
        }}
      >
        {"Wrong network, click here."}
      </Badge>
    );
};

export default Networkbadge;