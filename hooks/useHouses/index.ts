import { Refresh } from "@material-ui/icons";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { rejects } from "assert";
import { useEffect, useState } from "react";
import { GameType, HousesType, HouseType, newGame } from "../../pages/api/trivia/[...params]";
import { useSocket } from "../useSocket";

export const houses = [
    { name: "Gryffindor" as "Gryffindor", image: '/images/Gryffindor.png' },
    { name: "Ravenclaw" as "Ravenclaw", image: '/images/Ravenclaw.png' },
    { name: "Hufflepuff" as "Hufflepuff", image: '/images/Hufflepuff.png' },
    { name: "Slytherin" as "Slytherin", image: '/images/Slytherin.png' },
];

type UseHousesProps = {
    gameId: string;
}

export const useHouses = ({gameId}: UseHousesProps) => {
    const { socket } = useSocket();
    socket?.emit("join_game", { gameId })
    const queryKey = ["useHouses", {gameId}];
    const { data, isLoading, isError, isSuccess, refetch } = useQuery<GameType>(['useHouses', {gameId}], () => {
        return new Promise<GameType>((resolve, reject) => {
            console.log('running get_houses promise');
            if (!socket){
                console.log('Socket not connected');
                reject('Socket not connected');
            }
            return socket?.emit('get_houses', { gameId }, (response) => {
                resolve(response)
            });
        })
    });

    const queryClient = useQueryClient();
    
    useEffect(() => {
        socket?.emit("join_game", { gameId })
    }, [socket])

    const startGame = () => {
        socket?.emit("join_game", { gameId })
    }

    const userJoin = ({name, house}: {name: string; house: HouseType}) => {
        socket?.emit("user_join_game", { gameId, name, house }, (m: GameType) => {
            console.log('setting state', m);
        });
    }

    useEffect(() => {
        socket?.on('recieved_user_join_game', (data) => {
            console.log('New User Joined!', data);
            queryClient.invalidateQueries(queryKey);
        });
        socket?.on('get_houses_response', (data) => {
            console.log('get_houses_response success!', data);
            queryClient.setQueryData(queryKey, {houses: data});
        })
        refetch()
    }, [socket])

    return {
        houses,
        data,
        startGame,
        userJoin
    }
}