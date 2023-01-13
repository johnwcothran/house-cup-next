// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import NodeCache from 'node-cache';
type GameIdType = string


export type HousesType = {
    Gryffindor: {
        users: string[]
    },
    Ravenclaw: {
        users: string[]
    },
    Hufflepuff: {
        users: string[]
    },
    Slytherin: {
        users: string[]
    }
}

export type GameType = {
    houses: HousesType
}

type StateType = typeof NodeCache & {
    [key: GameIdType]: GameType
}

type Data = {
  houses?: any;
}

const paths = ["houses"] as const;
type PathsType = typeof paths;
type PathType = typeof paths[number];
type RoutesType = {
    [key: string]: () => void
}

export const houses = ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"] as const;
export type HouseType = typeof houses[number];

export const newGame = {
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

const trivia = new NodeCache({ stdTTL: 100000, checkperiod: 1000 });

type ActionsProps = {
    action: string;
    data: {
        gameId: GameIdType;
        house?: typeof houses[number];
        name?: string;
    }
}

export const dispatch = ({ action, data }: ActionsProps) => {
    switch(action) {
        case 'START_GAME': {
            if (!data.gameId) {
                throw new Error('Cannot START_GAME', { cause: data })
            }
            if (trivia.get(data.gameId)) {
                console.log('Game with gameId', data.gameId, 'already exists!')
                return null;
            }
            console.log('START_GAME')
            return trivia.set(data.gameId, newGame, 100000);
        }
        case 'ADD_USER': {
            if (!data.gameId || !data.house || !data.name) {
                throw new Error('Cannot ADD_USER', { cause: data })
            }
            console.log('ADD_USER');
            const currentTrivia: GameType | undefined = trivia.get(data.gameId);
            if (!currentTrivia) {
                console.log('No game currently exists with ID. Creating game with id ', data.gameId);
                const nextTrivia = {
                    ...newGame,
                    houses: {
                        ...newGame.houses,
                        [data.house]: {
                            ...newGame.houses[data.house],
                            users: [...newGame.houses[data.house].users, data.name]
                        }
                    }
                }
                return trivia.set(data.gameId, nextTrivia, 100000);
            }
            console.log(currentTrivia);
            console.log(currentTrivia?.houses[data.house].users.includes(data.name));
            if (currentTrivia?.houses[data.house].users.includes(data.name)) {
                console.log('Name already exists in this house!');
                return null;
            }
            const nextTrivia = {
                ...currentTrivia,
                houses: {
                    ...currentTrivia?.houses,
                    [data.house]: {
                        ...currentTrivia?.houses[data.house],
                        users: [...currentTrivia?.houses[data.house]?.users!, data.name]
                    }
                }
            }
            return data.name && trivia.set(data.gameId, nextTrivia, 100000);
        }
        default: return null;
    }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    
    const { params } = req.query;
    if (typeof params !== "object") return res.status(400);

    const [gameId, param1] = params;
    const restOfParams: PathsType | string[] = params.length > 1 ? params.slice(1) : [];
    const routePath = restOfParams.join('/');
    switch(true) {
        case (req.method === "GET" && routePath === 'houses'): {
            const response = () => {
                const currentTrivia: GameType | undefined = trivia.get(gameId);
                console.log(currentTrivia);
                return { houses: currentTrivia?.houses }
            };
            console.log(response());
            return res
                .status(200)
                .json(response());
        }
    }
}
