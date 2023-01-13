import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from 'next';
import { Inter } from '@next/font/google'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material';
import {
    yellow
} from '@material-ui/core/colors';

import styles from '../styles/Home.module.css';
import { theme } from '../styles/muiThemes/harryPotterTheme';
import { HomeMenuItem } from '../components/atoms/MenuItem';
import { BookType } from '../types/sanity';

type HomeProps = {
    books: BookType[];
}

export default function Home({ books }: HomeProps) {
    return (
        <>
            <Head>
                <title>House Cup Trivia</title>
                <meta name="description" content="A Harry Potter group trivia game" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <ThemeProvider theme={theme}>
                    <Image
                        className={styles.heroBackground}
                        src="/images/title-page.png"
                        alt="Next.js Logo"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <div className={styles.homeMenuWrapper}>
                        <div className={styles.homeMenu}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h1"
                                        align="center"
                                        style={{ color: yellow[600], fontWeight: 'bold', fontFamily: 'Henny Penny' }}>
                                        House Cup Trivia
                                    </Typography>
                                </Grid>
                                {books.map(({title, _id, slug: { current: href }}) => (
                                    <Grid key={_id} item xs={12}>
                                        <HomeMenuItem {...{ title, href: `${href}/start` }} />
                                    </Grid>
                                ))}
                            </Grid>

                        </div>
                    </div>
                </ThemeProvider>

            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const books: BookType[] = await fetch(`https://qxzwsq06.api.sanity.io/v1/data/query/production?query=*[_type == 'book']`)
        .then(r => r.json())
        .then(r => r.result);
    return {
        props: {
            books
        }
    }

}
