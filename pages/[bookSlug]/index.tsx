import { TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { QuestionType } from '../../types/sanity';

const Trivia = () => {
    const router = useRouter();
    const { bookSlug } = router.query;
    const [form, setForm] = useState('');
    const handleChange = (e: any) => {
        e.preventDefault();
        setForm(e.currentTarget?.value)
    }
    useEffect(() => {
        fetch(`/api/trivia/${form}`).then(r => r.json()).then(r => console.log(r));
    }, [form])

    return <div>
        <p>Post: {bookSlug}</p>
        <TextField onChange={handleChange} value={form} />
    </div>;
};

export default Trivia;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const books: QuestionType[] = await fetch(`https://qxzwsq06.api.sanity.io/v1/data/query/production?query=*[_type == 'question']{...,category->,difficulty->}`)
        .then(r => r.json())
        .then(r => r.result);
    return {
        props: {
            books
        }
    }

}

