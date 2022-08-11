import Prisma from "@prisma/client";
import joi from "joi";

const {EconomicClass, SkinColor} = Prisma;

export const SignUp = joi.object().keys({
    name: joi.string().min(5).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    cpf: joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
    voteStateAbbreviation: joi.string().length(2).required(),
    
    phone: joi.string().regex(/^\d{2} \d{4,5}-\d{4}$/),
    birthDate: joi.date(),
    skinColor: joi.string().valid(...Object.values(SkinColor)),
    economicClass: joi.string().valid(...Object.values(EconomicClass)),

    diplomaticAxis: joi.number().min(0).max(100),
    economicAxis: joi.number().min(0).max(100),
    civilAxis: joi.number().min(0).max(100),
    socialAxis: joi.number().min(0).max(100),
} as const)


export const SignIn = joi.object().keys({
    password: joi.string().min(4).required(),
    email: joi.string().email(),
} as const)

export const PutUser = joi.object().keys({
    personId: joi.number().required(),
    name: joi.string().min(5),
    cpf: joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
    voteStateAbbreviation: joi.string().length(2),
    phone: joi.string().regex(/^\d{2} \d{4,5}-\d{4}$/),
    birthDate: joi.date(),
    skinColor: joi.string().valid(...Object.values(SkinColor)),
    economicClass: joi.string().valid(...Object.values(EconomicClass)),
    diplomaticAxis: joi.number().min(0).max(100),
    economicAxis: joi.number().min(0).max(100),
    civilAxis: joi.number().min(0).max(100),
    socialAxis: joi.number().min(0).max(100),
} as const)

export const PostCandidate = joi.object().keys({
    personId: joi.number().required(),
    name: joi.string().min(3).required(),
    description: joi.string().max(200).required(),
    stateAbbreviation: joi.string().length(2).required(),
    partyAbbreviation: joi.string().min(2).required(),
} as const)

export const PutCandidate = joi.object().keys({
    personId: joi.number().required(),
    name: joi.string().min(3),
    description: joi.string().max(200),
    stateAbbreviation: joi.string().length(2),
    partyAbbreviation: joi.string().min(2),
} as const)

export const PostVideo = joi.object().keys({
    personId: joi.number().required(),
    title: joi.string().min(3).required(),
    url: joi.string().uri().required(),
    thumbnail: joi.string().uri().required(),
} as const)

export default {
    auth: {
        signUp: SignUp,
        signIn: SignIn,
    },
    user: {
        putUser: PutUser,
        postCandidate: PostCandidate,
        putCandidate: PutCandidate,
    },
}