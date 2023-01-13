import { Button, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image'
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import styles from "../../../styles/Book.module.css";
import { BookType } from '../../../types/sanity';
import { useHouses } from '../../../hooks/useHouses';
import { HouseSorting } from '../../../components/molecules/houseSorting';
import { MainLayout } from '../../../components/layout/main';

type StartTriviaProps = {
    book: BookType
}

const TriviaGame = ({ book }: StartTriviaProps) => {
    const router = useRouter();
    const { gameId } = router.query;
    const GameId = gameId as string;
    const {
        houses,
        data,
        startGame,
    } = useHouses({ gameId: GameId.toUpperCase() });

    return <MainLayout>
        <>
            <Image
                className={styles.heroBackground}
                src="/images/poa.jpeg"
                alt="Next.js Logo"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <Container maxWidth='md' className={styles.content}>
                <Grid container justifyItems='center' alignItems='center' gap={2}>
                    <Grid item xs={12}>
                        <Typography align='center' component='h1' variant='h4' gutterBottom>
                            {book.title}
                        </Typography>
                        <Typography align='center' component='h2' variant='h5' gutterBottom>
                            Sorting Ceremony
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align='center'>
                            Your room code is:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="primary" align='center' variant='h4' component='p'>
                            {GameId.toUpperCase()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <HouseSorting data={data} houses={houses} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button size='large' fullWidth variant='outlined' onClick={startGame}>Begin Game</Button>
                    </Grid>
                </Grid>
            </Container>
        </>

    </MainLayout>;
};

export default TriviaGame;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { bookSlug } = context.query;
    const book: BookType[] = await fetch(`https://qxzwsq06.api.sanity.io/v1/data/query/production?query=*[slug.current=="${bookSlug}"][0]`)
        .then(r => r.json())
        .then(r => r.result);
    return {
        props: {
            book
        }
    }

}

