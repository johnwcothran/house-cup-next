This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To install:
```bash
npm install --legacy-peer-deps
```

To run Cypress:
```bash
npm run cypress
```
Then click on `E2E Testing`. I've only been testing in Chrome.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

To run Cypress:
```bash
npm run cypress
```

Then click on `E2E Testing`. I've only been testing in Chrome.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is somewhat of a clone of a Jackbox.tv type of trivia game for Harry Potter. My group of friends has used a version of this 
in the past, so the questions are all loaded in the CMS (Sanity).

The past app has only been able to be interacted with from one interface, so we needed a facilitator to run the trivia game. The
goal with this project is to be able to have everyone play using their phones. This makes for an interesting challenge with Websockets 
(using Socked IO). This project is still early on, so please don't judge too harshly :)

Right now the backend is holding an in-memory cache that requires data mutation just to work (yuck!). This will eventually be persisted
in a Redis cache.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
