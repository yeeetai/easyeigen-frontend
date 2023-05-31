import { Button, Grid, Skeleton, TextField, alpha, Typography } from "@mui/material";
import { prepareWriteContract, writeContract, waitForTransaction } from "@wagmi/core"
import { useState } from "react";
import { invokeFormat } from "../../utils/ether-big-number";
import { useRelayerContractAddressHook } from "../../hooks/useContractAddress.hook";
import { relayerABI } from "../../contracts/relayer";
import { LoadingDialog } from "../Dialog/LoadingDialog"

export function SlashForm({
}: any) {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [merkle, setMerkle] = useState('')
  const registerRelayerAddresses = useRelayerContractAddressHook()

  async function slash (data: any, relayerAddress : string) {
    setLoading(true)
    const config = await prepareWriteContract({
      address: registerRelayerAddresses,
      abi: relayerABI,
      functionName: 'slash',
      args:[data, relayerAddress]
    })
    const {hash:registerHash} = await writeContract(config)
    await waitForTransaction({
      hash: registerHash,
    })
  }

  return (
    <>
      <Grid container rowSpacing={4} justifyContent="center">
        <Grid container item alignItems={'center'} justifyContent="center" sx={{ padding: '0 0 20px 0' }}>
                  <div style={{ display: 'flex' }}>
                      <Typography display={'inline-block'} sx={{
                          fontSize: '20px'
                      }}>
                          Slasher
                      </Typography>
                  </div>
              </Grid>
        <Grid container item columnSpacing={2} alignItems="center">
          <Grid item>
            <Button
              variant="outlined"
              component="label"
              style={{
                color: alpha("#000000", 0.8),
                borderColor: alpha("#6C221C", 0.8),
                textTransform: 'none',
              }}
              sx={{
                width: '150px',
              }}
            >
              Upload Proof File
              <input
                type="file"
                hidden
                onChange={(e: any) => {
                  if (!window.FileReader) return; // Browser is not compatible

                  var reader = new FileReader();

                  reader.onload = function (evt: any) {
                    if (evt.target.readyState != 2) return;
                    if (evt.target.error) {
                      alert('Error while reading file');
                      return
                    }
                    // setMerkle(JSON.parse(evt.target.result))
                  }
                  reader.readAsText(e.target.files[0]);
                }}
              />
            </Button>
          </Grid>
          <Grid item>
            {
              merkle ? 'proof uploaded' : 'proof not uploaded'
            }
          </Grid>
        </Grid>
        <Grid container item>
          <TextField
            type="string"
            label="Relayer Address"
            placeholder="enter address"
            onChange={(e) => {
              setAddress(e.target.value)
            }}
            disabled={loading}
            style={{
              width: '100%'
            }}
          />
        </Grid>
        <Grid container item xs={12} columnSpacing={3} justifyContent="flex-end">
          <Grid item>
            <Button
              variant="contained"
              disabled={loading}
              style={{
                textTransform: 'none',
              }}
              sx={{
                width: '120px',
              }}
              onClick={() => {
                slash('data', address)
                  .finally(() => {
                  setLoading(false)
                })
              }}
            >
              {
                loading ? (
                  <>
                    Slash Checking...
                  </>)
                  : 'Slash'
              }
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <LoadingDialog open={loading}/>
    </>
  )
}