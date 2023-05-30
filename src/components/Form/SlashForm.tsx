import { Button, Grid, Skeleton, TextField, alpha, Typography } from "@mui/material";
import { prepareWriteContract, writeContract, waitForTransaction } from "@wagmi/core"
import { useState } from "react";
import { invokeFormat } from "../../utils/ether-big-number";

export function SlashForm({
  loading,
  onStart,
  onComplete,
}: any) {
  const [amount, setAmount] = useState(0)
  const [merkle, setMerkle] = useState('')
  const [transactionLoading, setTransactionLoading] = useState(false);
  // const zkafiAddress = useZkafiContractAddressHook();
  // async function proof(amount: number, merkle: any) {
  //   setTransactionLoading(true);
  //   const zkProof = await generateProof(
  //     invokeFormat(amount.toString()).toString(),
  //     merkle
  //   )
  //   const config = await prepareWriteContract({
  //     address: zkafiAddress,
  //     abi: zkafiABI,
  //     functionName: "noPermissionBorrow",
  //     args: [zkProof],
  //   });
  //   const {hash} = await writeContract(config)
  //   await waitForTransaction({hash}) 
  // }
  return (
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
            setAmount(Number(e.target.value))
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
              onStart()
              // proof(amount, merkle)
              //   .finally(() => {
              //     onComplete()
              //     setTransactionLoading(false)
              //   })
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
  )
}