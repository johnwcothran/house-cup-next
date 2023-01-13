import { loadStaticPaths } from 'next/dist/server/dev/static-paths-worker';
import { Server } from 'Socket.IO';
import { GameType, HouseType } from './trivia/[...params]';
import { set, get, cloneDeep } from 'lodash';

const newGame = {
    houses: {
        Gryffindor: {
            users: []
        },
        Ravenclaw: {
            users: []
        },
        Hufflepuff: {
            users: []
        },
        Slytherin: {
            users: []
        }
    }
}

type TriviaType = {
    [key: string]: GameType
}

let trivia: TriviaType = {}

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
        console.log('user connected', socket.id);

        socket.on('join_game', ({gameId}, cb) => {
            console.log('Game Joined: ', gameId)
            if (!trivia[gameId]) {
                trivia[gameId] = {
                    houses: {
                        Gryffindor: {
                            users: []
                        },
                        Ravenclaw: {
                            users: []
                        },
                        Hufflepuff: {
                            users: []
                        },
                        Slytherin: {
                            users: []
                        }
                    }
                }
            }

            socket.join(gameId);
            typeof cb === 'function' && cb('Success!')
        },)

        socket.on('user_join_game', ({gameId, name, house}: {gameId: string; name: string, house: HouseType}, cb) => {
            socket.join(gameId);
            if (!trivia[gameId]) {
                trivia[gameId] = {
                    houses: {
                        Gryffindor: {
                            users: []
                        },
                        Ravenclaw: {
                            users: []
                        },
                        Hufflepuff: {
                            users: []
                        },
                        Slytherin: {
                            users: []
                        }
                    }
                }
            }
            if (trivia[gameId].houses[house].users.includes(name)) {
                return console.log('User already in house.');
            }
            console.log(name, house, gameId);
            trivia[gameId].houses[house].users.push(name);
            console.log(get(trivia, [gameId, 'houses', house, 'users']));
            socket.to(gameId).emit('recieved_user_join_game', { trivia: trivia[gameId] })
            cb(trivia[gameId]);
        })

        socket.on('get_houses', ( { gameId }: { gameId: string }, cb) => {
            console.log('get_houses hit');
            socket.to(gameId).emit('get_houses_response', { houses: trivia[gameId]?.houses });
            cb({ houses: trivia[gameId]?.houses });
        });
      })
  }
  res.end()
}

export default SocketHandler