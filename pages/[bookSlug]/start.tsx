import { Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import Router from 'next/router'
import Image from 'next/image'
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import styles from "../../styles/Book.module.css";
import { BookType } from '../../types/sanity';
import { useSocket } from '../../hooks/useSocket';
import { houses, useHouses } from '../../hooks/useHouses';

type StartTriviaProps = {
    book: BookType
}

const StartTrivia = ({ book }: StartTriviaProps) => {
    const router = useRouter();
    const { socket } = useSocket();
    const { bookSlug, gameId } = router.query;
    const [form, setForm] = useState('');
    const [name, setName] = useState('');
    const [userHouse, setUserHouse] = useState<"Gryffindor" | "Ravenclaw" | "Hufflepuff" | "Slytherin" | null>(null);
    const handleChange = (e: any) => {
        e.preventDefault();
        setForm(e.currentTarget?.value.toUpperCase().trim())
    };
    const handleNameChange = (e: any) => {
        e.preventDefault();
        setName(e.currentTarget?.value.toUpperCase().trim())
    };
    useEffect(() => {
        if (form.length === 4 && userHouse) {
            socket.emit('user_join_game', {gameId: form, name, house: userHouse}, (message) => {
                console.log(message);
            })
            Router.push(`/${bookSlug}/${form}/waiting-room`);
        }
    }, [form]);

    return <main className={styles.main}>
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
                                <Button variant={userHouse === house.name ? 'outlined' : 'text'} onClick={() => {setUserHouse(house.name)}}>
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
                
                {name.length > 0 && userHouse && <>
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
    </main>;
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

