import { Typography } from "@mui/material";
import { formatted } from "../../utils/ether-big-number";
import { useAccount, useContractRead, useToken } from "wagmi";
import { useStEvmosContractAddressHook } from "../../hooks/useContractAddress.hook";

export function TotalReStakedBalanceDisplay({
  size = '18px',
  balance,
  isTokenDisplayed = true
}: any) {
  return (
    <Typography
      component="div"
      sx={{
        fontWeight: 'normal',
        fontSize: size,
        textAlign: 'center',
      }}
    >
      <div>TotalReStaked:</div>
      <div style={{ fontWeight: 'bold' }}>{balance}</div>
    </Typography>
  )
}