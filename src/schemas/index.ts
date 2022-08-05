import joi from "joi";

export default {
    user: {
        putUser: joi.object(),
        getUser: joi.object(),
        postCandidate: joi.object(),
        putCandidate: joi.object(),
    },
    auth: {
        signIn: joi.object(),
        signUp: joi.object(),
    },
    tinder: {
        react: joi.object(),
        postVideo: joi.object(),
    }
}