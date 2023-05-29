import { useNetwork } from "wagmi"
import { stEvmosAddresses } from "../utils/contract-address"

export function useStEvmosContractAddressHook() {
  const { chain } = useNetwork()
  console.log("chain: ", chain)
  // @ts-ignore
  return chain !== undefined ? stEvmosAddresses[chain!.name] : ''
}