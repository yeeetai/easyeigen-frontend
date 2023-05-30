import { Button, Card, CardContent, Grid, Skeleton, TextField, Typography, alpha } from "@mui/material";
import { erc20ABI, useAccount, useBalance, useContractRead } from "wagmi";
import { useState } from "react";
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import { stakerABI } from "../../contracts/staker";
import Image from "next/image";
import { useStEvmosContractAddressHook } from "../../hooks/useContractAddress.hook";
import { ProcessButton } from "../Button/ProcessButton";
import { BigNumber } from "ethers";
import { CurrentBalanceDisplay } from "../Display/CurrentBalanceDisplay";
import { RestakedBalanceDisplay } from "../Display/RestakedBalanceDisplay";
import { GetMaxBalanceDisplay } from "../Display/GetMaxBalanceDisplay";
import { SetRelayerProcessDisplay } from "../Display/SetRelayerProcessDisplay";
import { StakedBalanceDisplay } from "../Display/StakedBalanceDisplay";
import { useCurrentStakedBalance, useCurrentEvmosBalance } from "../../hooks/current-balance.hook";

export function RelayerCard(
    {valAddress}:any
) {
    const stEvmosAddresses = useStEvmosContractAddressHook()
    const { address } = useAccount()
    const [writing, setWriting] = useState(false)
    const [stBalance, setStBalance] = useState(useCurrentStakedBalance())
    const [balance, setBalance] = useState(useCurrentEvmosBalance())
    const [isWithdraw, setProcess] = useState(0)
    const [amount, setAmount] = useState(0)
    const { data: any } = useContractRead({
        address: stEvmosAddresses,
        abi: stakerABI,
        functionName: 'allowance',
        args: [address!, stEvmosAddresses]
    })

    return (
        <Card
            sx={{
                p: 5,
                backgroundColor: 'rgba(124,124,124)',
                boxShadow: "0px 0px",
                width: '50%',
            }}
            style={{ borderRadius: "20px" }}
        >
            <Grid container item alignItems={'center'} justifyContent="center" sx={{ padding: '0 0 20px 0' }}>
                <div style={{ display: 'flex' }}>
                    <Typography display={'inline-block'} sx={{
                        fontSize: '20px'
                    }}>
                        Relayer
                    </Typography>
                </div>
            </Grid>
            <Grid container item sx={{ padding: '0 0 20px 0' }} justifyContent="center">
                <StakedBalanceDisplay balance={stBalance} isTokenDisplayed={false} />
            </Grid>

            <SetRelayerProcessDisplay
                onChange={(e: any) => {
                    setProcess(e)
                }}
            />
            <GetMaxBalanceDisplay
                balance={balance}
                onChange={(e: any) => {
                    setAmount(e)
                }}
            />
            <CurrentBalanceDisplay balance={balance} isTokenDisplayed={false} method={isWithdraw}/>


            <Grid container item xs={12} alignItems={'center'} justifyContent="flex-end">
                {
                    <ProcessButton method={isWithdraw} />
                }
            </Grid>
        </Card>
    )
}