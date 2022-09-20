# 🏛️ Polis

## Links
- [App](http://polis.cf/)
- [Composer Repo](https://github.com/estevamfurtado/polis)
- [Front End Repo](https://github.com/estevamfurtado/polis-frontend)
- [Back End Repo](https://github.com/estevamfurtado/polis-backend)

## Overview
- Context: Brazil has over +500 congresspeople and +25 political parties. Corruption is a huge problem and the system is known for its bad incentives. There already are civil initiatives to evaluate political performance (Ranking dos Políticos), but it lacks people engagement.
- Goal: Leverage Brazilian people politics knowledge and help to improve marginally the system accountability.
- Idea: a 100% digital stickers album where the stickers are Brazilian politicians.

## How does it work (features)
- Album: each user has an album copy with +500 empty stickers. Your goal is to find it all.
- Stickers: Stickers come in packs of 5 random stickers. When you sign up you earn 40 free packs. Each 20 minutes you can take 2 free packs. It is harder to get stickers of good politicians.
- Exchange Stickers: You can exchange repeated stickers with friends and other users.
- Knowledge: Cards have basic info and you can see more stats by clicking on it. Stats source are Ranking dos Políticos.
- Play (not implemented): You can play games to test your cards strengths and your political knowledge to earn new packs.

## Stack
- Back end: TypeScript, PostgreSQL, Prisma.
- Front end: TypeScript, React, StyledComponents, ChakraUI.
- Others: Docker, AWS

## How to Run in Development

Start by cloning the Composer Repo. Then, clone the Back and Front end repos inside the composer repo.

```
| polis
|- polis-backend
|- polis-frontend
```

Create env files in the backend and frontend according to .env.example.

In your Composer Repo folder, run the following command:
```
docker-compose up -d
```
And it should build the entire app.
