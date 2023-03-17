export interface IDeck {
    name: string
    cards: string[] | number[]
}

export const DECK_LIST: IDeck[] = [
    {
        name: 'Fibonacci',
        cards: [1, 2, 3, 5, 8, 13, 21, 34, 52],
    },
]