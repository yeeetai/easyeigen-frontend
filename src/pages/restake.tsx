import { Button, Grid, TextField } from "@mui/material"
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { useState } from "react"
import { ReStakeCard } from "../components/Card/ReStakeCard"
import { useStEvmosContractAddressHook } from "../hooks/useContractAddress.hook"

function Page() {
    return (
        <Grid sx={{
            m: 0,
        }} container rowSpacing={4}>
            <Grid container item justifyContent={'center'}>
                <ReStakeCard />
            </Grid>
        </Grid>
    )
}

export default Page