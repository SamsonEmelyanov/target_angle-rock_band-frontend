import * as Config from '../../config.json';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || Config.REACT_APP_API_BASE_URL;
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = process.env.REACT_APP_OAUTH2_REDIRECT_URI || Config.REACT_APP_OAUTH2_REDIRECT_URI;

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const SELLER_EMAIL =  process.env.REACT_APP_MERCH_SELLER_EMAIL || Config.REACT_APP_MERCH_SELLER_EMAIL
export const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY || Config.REACT_APP_STRIPE_KEY
export const STRIPE_NAME = process.env.REACT_APP_STRIPE_NAME || Config.REACT_APP_STRIPE_NAME
export const STRIPE_CURRENCY = process.env.REACT_APP_STRIPE_CURRENCY || Config.REACT_APP_STRIPE_CURRENCY