import jwt from 'jsonwebtoken';
import {config} from '../config/index.js';

export const jwtAccessTokenGenerator = (payload) => {
    return jwt.sign(payload, config.jwt.access.secret, {
        expiresIn: config.jwt.access.expiresIn
    });
}

export const jwtAccessTokenVerify = (refreshToken) => {
    return jwt.verify(refreshToken, config.jwt.access.secret);
}

export const jwtRefreshTokenGenerator = (payload) => {
    return jwt.sign(payload, config.jwt.refresh.secret, {
        expiresIn: config.jwt.refresh.expiresIn
    });
}

export const jwtRefreshTokenVerify = (refreshToken) => {
    return jwt.verify(refreshToken, config.jwt.refresh.secret);
}