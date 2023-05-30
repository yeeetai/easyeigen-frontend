import { Button, Grid, TextField, alpha } from "@mui/material";
import { useState } from "react";

export function SetRelayerProcessDisplay({
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
            backgroundColor: isWithdraw === 0 ? alpha('#000000', 0.8) : 'transparent',
            color: isWithdraw === 0 ? '#fff' : alpha('#000000', 0.8),
            '&:hover': {
              backgroundColor: alpha('#bdbdbd', 0.8),
            },
          }}
          onClick={() => handleButtonClick(0)}
        >
          Register
        </Button>
      </Grid>
      <Grid container item xs={6}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderRadius: '0 20px 20px 0',
            width: '100%',
            backgroundColor: isWithdraw === 1 ? alpha('#000000', 0.8) : 'transparent',
            color: isWithdraw === 1 ? '#fff' : alpha('#000000', 0.8),
            '&:hover': {
              backgroundColor: alpha('#bdbdbd', 0.8),
            },
          }}
          onClick={() => handleButtonClick(1)}
        >
          Quit
        </Button>
      </Grid>
    </Grid >
  )
}
