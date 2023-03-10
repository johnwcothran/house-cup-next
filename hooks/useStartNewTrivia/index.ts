import Router from "next/router";
import { useEffect, useState } from "react";
import { makeid } from "../../utils/utilityFunctions";
import { useSocket } from "../useSocket";

type Props = {
    bookSlug: string;
}
export const useStartNewTrivia = ({bookSlug}: Props) => {
    const { socket } = useSocket();
    const [form, setForm] = useState('');
    const [name, setName] = useState('');
    const [userHouse, setUserHouse] = useState<"Gryffindor" | "Ravenclaw" | "Hufflepuff" | "Slytherin" | null>(null);
    const handleChange = (e: any) => {
        e.preventDefault();
        setForm(e.currentTarget?.value.toUpperCase().trim())
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setName(e.currentTarget?.value.toUpperCase().trim())
    };
    const onStartNewGame = () => {
        const newGameId = makeid()
        socket.emit('join_game', {gameId: newGameId}, (response) => {
            userHouse && socket.emit('user_join_game', {gameId: newGameId, house: userHouse, name}, (r) => {console.log('User Joined Game', r)});
            Router.push(`/${bookSlug}/${newGameId}/waiting-room`);
        });
    }
    useEffect(() => {
        if (form.length === 4 && userHouse) {
            socket.emit('user_join_game', { gameId: form, name, house: userHouse }, (message) => {
                console.log('User Joined Game', message);
            })
            Router.push(`/${bookSlug}/${form}/waiting-room`);
        }
    }, [form]);

    return {
        name,
        userHouse,
        form,
        setUserHouse,
        handleNameChange,
        handleChange,
        onStartNewGame
    }
}