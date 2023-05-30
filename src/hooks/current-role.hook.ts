import { useAccount, useContractRead, useBalance } from "wagmi"
import { useRelayerContractAddressHook } from "./useContractAddress.hook"
import { relayerABI } from "../contracts/relayer"
import { formatted } from "../utils/ether-big-number"

export function useCurrentRole() {
  const registerRelayerAddresses = useRelayerContractAddressHook()
  const { data: relayer } = useContractRead({
    address: registerRelayerAddresses,
    abi: relayerABI,
    functionName: 'registered',
  })
  return relayer ? formatted(relayer).toString() : false
}