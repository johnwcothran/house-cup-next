import { useEffect } from 'react';
import {io, Socket} from 'socket.io-client'
import { GameType, HousesType, HouseType } from '../../pages/api/trivia/[...params]';

interface ServerToClientEvents {
    noArg: () => void;
    send_message: ({message}: {message: string}) => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    recieved_user_join_game: (data: {gameId: string; name: string}) => void;
    get_houses_response: (data: HousesType) => void;
  }
  type JoinGameCallbackType = (r: string) => void;
  interface ClientToServerEvents {
    join_game: ({ gameId }: { gameId: string }, cb?: JoinGameCallbackType) => void;
    user_join_game: ({ gameId, name, house }: { gameId: string, name: string; house: HouseType }, cb: (m: GameType) => void) => void;
    get_houses: ({gameId}: {gameId: string}, cb: (response: GameType) => void) => void
  }


interface InterServerEvents {
    ping: () => void;
  }
  
  interface SocketData {
    name: string;
    age: number;
  }

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;


export const useSocket = () => {
    
    useEffect(() => {
        socketInitializer()
    }, [])

    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io()

        socket.on('connect', () => {
            console.log('connected')
        });
    }

    return {
        socket
    }
}