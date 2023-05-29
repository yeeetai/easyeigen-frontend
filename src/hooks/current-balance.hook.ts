import { useAccount, useContractRead, useBalance } from "wagmi"
import { useStEvmosContractAddressHook } from "./useContractAddress.hook"
import { stEvmosABI } from "../contracts/stEvmos"
import { formatted } from "../utils/ether-big-number"

export function useCurrentStakedBalance() {
  const stEvmosAddresses = useStEvmosContractAddressHook()
  const { address } = useAccount()
  const { data: balance } = useContractRead({
    address: stEvmosAddresses,
    abi: stEvmosABI,
    functionName: 'balanceOf',
    args: [address]
  })
  console.log(balance)
  return balance ? formatted(balance).toString() : null
}

export function useCurrentEvmosBalance() {
  const { address } = useAccount()
  const { data, isError, isLoading } = useBalance({
    address: address,
  })

  return data ? data?.formatted.toString() : null
}