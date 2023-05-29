import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { erc20ABI, useAccount, useContractRead } from 'wagmi'
import { Button } from '@mui/material'
import { BigNumber } from 'ethers'
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { useStEvmosContractAddressHook } from '../../hooks/useContractAddress.hook'

export function ProcessButton({ method, disabled, reverse }: any) {
  return (
    <>
      {
        <Button
          variant="contained"
          color="success"
          style={{
            textTransform: 'none',
          }}
          sx={{
            width: '120px',
          }}
          onClick={() => {
            console.log(method)
          }}
        >
          Next
        </Button>
      }

    </>
  )
}