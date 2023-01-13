import { Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import Router from 'next/router'
import Image from 'next/image'
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react';
import styles from "../../styles/Book.module.css";
import { BookType } from '../../types/sanity';
import { useSocket } from '../../hooks/useSocket';
import { houses, useHouses } from '../../hooks/useHouses';
import { MainLayout } from '../../components/layout/main';
import { JoinGame } from '../../components/molecules/joinGame';
import { useStartNewTrivia } from '../../hooks/useStartNewTrivia';

type StartTriviaProps = {
    book: BookType
}

const StartTrivia = ({ book }: StartTriviaProps) => {
    const router = useRouter();
    const { bookSlug, gameId } = router.query;
    const {
        handleNameChange,
        userHouse,
        setUserHouse,
        form,
        handleChange,
        onStartNewGame,
        name,
    } = useStartNewTrivia({bookSlug: bookSlug as string});

    return <MainLayout>
        <>
            <Image
                className={styles.heroBackground}
                src="/images/platform9-3-4.jpeg"
                alt="Next.js Logo"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <Container maxWidth='sm' className={styles.content}>
                <Grid container justifyItems='center' alignItems='center' gap={2}>
                    <Grid item xs={12}>
                        <Typography align='center' component='h1' variant='h4' color='primary'>
                            {book.title}
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
                    <Grid item xs={12}>
                        <Typography color='primary' align='center'>Select your house:</Typography>
                        <Grid container justifyContent={'space-between'}>
                            {houses.map(house => (
                                <Grid item xs={12 / (houses.length)} key={house.name} textAlign={'center'}>
                                    <Button variant={userHouse === house.name ? 'outlined' : 'text'} onClick={() => { setUserHouse(house.name) }}>
                                        <Image
                                            src={house.image}
                                            alt={house.name}
                                            height={60}
                                            width={60}
                                        />
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {name.length > 0 && userHouse && <JoinGame {...{form, handleChange, onStartNewGame}} />}
                </Grid>
            </Container>
        </>

    </MainLayout>;
};

export default StartTrivia;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { bookSlug } = context.query;
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

