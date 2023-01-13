import Image from 'next/image'
import Grid from "@mui/material/Grid"

import styles from "../../styles/Book.module.css";
import { houses } from '../../hooks/useHouses';
import Typography from '@mui/material/Typography';
import { GameType } from '../../pages/api/socket';

type HouseSortingProps = {
    houses: typeof houses;
    data: GameType | undefined;
}
export const HouseSorting = ({houses, data}: HouseSortingProps) => {
    return (
        <Grid container justifyContent={'space-between'} minHeight={400}>
            {houses.map(house => <Grid item key={house.name} md={3}>
                <Grid container>
                    <Grid item xs={12} textAlign={'center'}>
                        <Image
                            className={styles.houseLogo}
                            src={house.image}
                            alt={house.name}
                            height={100}
                            width={100}
                        />  
                    </Grid>
                    <Grid container alignItems="flex-start" >
                        {data?.houses?.[house.name]?.users.map((user, idx) => <Grid item xs={12} key={user}>
                            <Typography
                                data-cy={`${house.name}-${idx}-${user}`}
                                align='center'>{user}</Typography>
                        </Grid>)}
                    </Grid>
                    
                </Grid>
            </Grid>)}
        </Grid>
    )
}