import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Props = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    form: string;
    onStartNewGame: () => void;
}

export const JoinGame = ({
    handleChange,
    form,
    onStartNewGame
}: Props) => (
    <>
    <Grid item xs={12} margin={4}>
        <Divider />
    </Grid>
    <Grid item xs={12}>
        <TextField
            label='Join Existing Game'
            fullWidth
            variant='outlined'
            color='primary'
            size='large'
            placeholder={`Enter your 4-digit code to join!`}
            onChange={handleChange}
            value={form} />
    </Grid>
    <Grid item xs={12}>
        <Typography align='center' variant='h4' component='p'>Or</Typography>
    </Grid>
    <Grid item xs={12}>
        <Button size='large' fullWidth variant='outlined' onClick={onStartNewGame}>Start a New Game</Button>
    </Grid>
</>
)