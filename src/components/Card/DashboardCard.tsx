import { Button, Card, CardContent, Grid, Skeleton, TextField, Typography, alpha } from "@mui/material";
import { erc20ABI, useAccount, useBalance, useContractRead } from "wagmi";
import { useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import { BigNumber } from "ethers";
import { formatted, invokeFormat } from "../../utils/ether-big-number";
import { CurrentBalanceDisplay } from "../Display/CurrentBalanceDisplay";
import { StakedBalanceDisplay } from "../Display/StakedBalanceDisplay";
import { TotalReStakedBalanceDisplay } from "../Display/TotalReStakedBalanceDisplay";
import { ValidatorsDisplay } from "../Display/ValidatorsDisplay";
import { useCurrentStakedBalance, useCurrentEvmosBalance } from "../../hooks/current-balance.hook";

export function DashboardCard() {
    const balance = useCurrentEvmosBalance()
    const router = useRouter();
    const handleRowClick = (id: any) => {
        router.push(`/restake/${id}`);
    };
    return (
        <Card
            sx={{
                p: 5,
                backgroundColor: alpha('#5B3700', 0.15),
                boxShadow: "0px 0px",
                width: '80%',
            }}
            style={{ borderRadius: "20px" }}
        >
            <Grid container item alignItems={'center'} justifyContent="center" sx={{ padding: '0 0 20px 0' }}>
                <div style={{ display: 'flex' }}>
                    <Image src="/evmos.png" width={30} height={30} style={{ padding: '0 10px 0 0' }} alt="token" />
                    <Typography display={'inline-block'} sx={{
                        fontSize: '20px'
                    }}>
                        EVMOS
                    </Typography>
                </div>
            </Grid>
            <Grid container item sx={{ padding: '0 0 20px 0' }} justifyContent="center">
                <TotalReStakedBalanceDisplay balance={balance} isTokenDisplayed={false} />
            </Grid>

            <Grid container item sx={{ padding: '0 0 20px 0' }} justifyContent="center">
                <ValidatorsDisplay />
            </Grid>
        </Card>
    )
}