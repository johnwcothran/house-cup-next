import { Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import Image from 'next/image'
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import styles from "../../styles/Book.module.css";
import { BookType } from '../../types/sanity';
import { MainLayout } from '../../components/layout/main';

type StartTriviaProps = {
    book: BookType
}

const TriviaGame = ({ book }: StartTriviaProps) => {
    const router = useRouter();
    const { bookSlug, gameId } = router.query;
    const [form, setForm] = useState('');
    const [name, setName] = useState('');
    const handleChange = (e: any) => {
        e.preventDefault();
        setForm(e.currentTarget?.value.toUpperCase().trim())
    };
    const handleNameChange = (e: any) => {
        e.preventDefault();
        setName(e.currentTarget?.value.toUpperCase().trim())
    };
    useEffect(() => {
        fetch(`/api/trivia/${form}`).then(r => r.json()).then(r => console.log(r));
    }, [form]);

    return <MainLayout>
        <>
            <Image
                className={styles.heroBackground}
                src="/images/poa.jpeg"
                alt="Next.js Logo"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <Container maxWidth='sm' className={styles.content}>
                <Grid container justifyItems='center' alignItems='center' gap={2}>
                    <Grid item xs={12}>
                        <Typography align='center' component='h1' variant='h4' color='primary' gutterBottom>
                            {gameId}
                            {' Trivia'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Your Name'
                            fullWidth
                            variant='outlined'
                            size='large'
                            placeholder={`Enter Your Name`}
                            onChange={handleNameChange}
                            value={name} />
                    </Grid>

                    {name.length > 0 && <>
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
                            <Button size='large' fullWidth variant='outlined'>Start a New Game</Button>
                        </Grid>
                    </>}
                </Grid>
            </Container>
        </>
    </MainLayout>;
};

export default TriviaGame;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { bookSlug } = context.query;
    console.log(bookSlug)
    const book: BookType[] = await fetch(`https://qxzwsq06.api.sanity.io/v1/data/query/production?query=*[slug.current=="${bookSlug}"][0]`)
        .then(r => r.json())
        .then(r => r.result);
    console.log(book);
    return {
        props: {
            book
        }
    }

}

