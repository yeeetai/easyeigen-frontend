import { Button, Card, CardContent, Grid, Skeleton, TextField, Typography, alpha } from "@mui/material";
import { erc20ABI, useAccount, useBalance, useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import { relayerABI } from "../../contracts/relayer";
import Image from "next/image";
import { useRelayerContractAddressHook } from "../../hooks/useContractAddress.hook";
import { RelayerProcessButton } from "../Button/RelayerProcessButton";
import { BigNumber } from "ethers";
import { CurrentBalanceDisplay } from "../Display/CurrentBalanceDisplay";
import { RestakedBalanceDisplay } from "../Display/RestakedBalanceDisplay";
import { GetMaxBalanceDisplay } from "../Display/GetMaxBalanceDisplay";
import { SetRelayerProcessDisplay } from "../Display/SetRelayerProcessDisplay";
import { StakedBalanceDisplay } from "../Display/StakedBalanceDisplay";
import { useCurrentStakedBalance, useCurrentEvmosBalance } from "../../hooks/current-balance.hook";
import { useCurrentRole } from "../../hooks/current-role.hook";

export function RelayerCard(
    {valAddress}:any
) {
    const registerRelayerAddresses = useRelayerContractAddressHook()
    const { address } = useAccount()
    const [stBalance, setStBalance] = useState(useCurrentStakedBalance())
    const [isRelayer, setProcess] = useState(useCurrentRole())
    console.log(useCurrentStakedBalance())

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
            { isRelayer ? 
                <Grid container item alignItems={'center'} justifyContent="center" sx={{ padding: '0 0 20px 0' }}>
                    <div style={{ display: 'flex' }}>
                        <Typography display={'inline-block'} sx={{
                            fontSize: '20px'
                        }}>
                            You already registered
                        </Typography>
                    </div>
                </Grid>
                : <CurrentBalanceDisplay 
                        type='EEE' 
                        balance={stBalance}
                        isTokenDisplayed={false} 
                    />} 
            <Grid container item xs={12} alignItems={'center'} justifyContent="center">
                {
                    <RelayerProcessButton 
                        isRelayer={isRelayer} 
                        label={isRelayer ? 'Quit' : 'Register' }
                        />
                }
            </Grid>
        </Card>
    )
}