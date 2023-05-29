import { Button, Grid, TextField, alpha } from "@mui/material";
import { useState } from "react";

export function SetProcessDisplay({
  onChange
}: any) {
  const [isWithdraw, setProcess] = useState(0)
  const handleButtonClick = (selectedButton: number) => {
    setProcess(selectedButton);
    onChange(selectedButton);
  };

  return (
    <Grid container item justifyContent="space-between" alignItems='center' sx={{ padding: '0 0 20px 0' }}>
      <Grid container item xs={6} justifyContent="flex-end">
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderRadius: '20px 0 0 20px',
            width: '100%',
            backgroundColor: isWithdraw === 0 ? alpha('#6C221C', 0.8) : 'transparent',
            color: isWithdraw === 0 ? '#fff' : alpha('#6C221C', 0.8),
            '&:hover': {
              backgroundColor: alpha('#FFDCB9', 0.8),
            },
          }}
          onClick={() => handleButtonClick(0)}
        >
          ReStake
        </Button>
      </Grid>
      <Grid container item xs={6}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderRadius: '0 20px 20px 0',
            width: '100%',
            backgroundColor: isWithdraw === 1 ? alpha('#6C221C', 0.8) : 'transparent',
            color: isWithdraw === 1 ? '#fff' : alpha('#6C221C', 0.8),
            '&:hover': {
              backgroundColor: alpha('#FFDCB9', 0.8),
            },
          }}
          onClick={() => handleButtonClick(1)}
        >
          Withdraw
        </Button>
      </Grid>
    </Grid >
  )
}
