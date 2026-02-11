import {
    LOAD_FILTER_PRODUCTS,
    SHIPPING_ADDRESS_CONFIRMED,
    PAYMENT_RESPONSE,
    PAYMENT_RESPONSE_ERROR
} from './types';
import {INTERNAL_SERVER_ERROR_CODE, BAD_REQUEST_ERROR_CODE} from '../components/constants/http_error_codes'
import {SHOPPERS_PRODUCT_INFO_COOKIE, CART_TOTAL_COOKIE} from '../components/constants/cookies'
import history  from "../components/history";
import Cookies from 'js-cookie';
import log from "loglevel";
import {commonServiceAPI} from "../api/service_api";
import axios from 'axios';
import {API_BASE_URL} from "../components/constants";
import RestoService from "../services/resto-service";


export const setShippingAddress = payload => {
    log.info(`[ACTION]: setShippingAddress payload = ${JSON.stringify(payload)}`)
    return {
        type: SHIPPING_ADDRESS_CONFIRMED,
        payload: payload
    }
}

export const sendPaymentToken = (token) => async dispatch => {
    log.info(`Token = ${JSON.stringify(token)}`)
    if (!token || (token && !token.hasOwnProperty("id"))) {
        dispatch({
            type: PAYMENT_RESPONSE_ERROR,
            payload: {errorMsg: "Unable to fetch token. Try again later"}
        })
    }

    let url = API_BASE_URL+`/payment`;

    let config = {
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(token)
    };

    log.info(`URL = ${config.url}`)

    axios(config)
        .then(function (response) {
            let paymentResponse = {
                ...response.data,
                last4: token.card.last4, exp_year: token.card.exp_year,
                exp_month: token.card.exp_month, brand: token.card.brand
            }

            if (paymentResponse.payment_failed) {
                history.push(`/checkout/cancel-payment/${response.data.charge_id}`)
            } else {
                history.push(`/checkout/success-payment/${response.data.charge_id}`)
                Cookies.remove(CART_TOTAL_COOKIE)
                Cookies.remove(SHOPPERS_PRODUCT_INFO_COOKIE)

            }

            dispatch({
                type: PAYMENT_RESPONSE,
                payload: {...paymentResponse, error: false, errorMsg: null}
            })

        })
        .catch(function (error) {
            log.error(`[sendPaymentToken]: Error = ${error} `)
            dispatch({
                type: PAYMENT_RESPONSE_ERROR,
                payload: {errorMsg: "Something Went Wrong"}
            })
        });
}


export const getDataViaAPI = (type, route, query, synchronous = true) => async dispatch => {
    if (route) {
        if (query) {
            route += query
        }

        log.info(`[ACTION]: invokeAndDispatchAPIData Calling API = ${route}.`)
        let isFetchError = false
        if (synchronous) {
            await commonServiceAPI.get(route)
                .then(response => processResponse(response, query, type, route))
                .catch(err => {
                    isFetchError = true
                });
        } else {
            commonServiceAPI.get(route)
                .then(response => processResponse(response, query, type, route, dispatch))
                .catch(err => {
                    isFetchError = true
                });
        }

        if (isFetchError) {
            log.info(`[ACTION]: unable to fetch response for API = ${route}`)
            dispatch({type: type, payload: {isLoading: false, statusCode: INTERNAL_SERVER_ERROR_CODE}});
        }
    }
}

export const processResponse = (response, query, type, uri, dispatch) => {
    log.debug(`[ACTION]: Data = ${JSON.parse(JSON.stringify(response.data))}.`)
    if (response.data !== null) {
        let payload = {isLoading: false, data: JSON.parse(JSON.stringify(response.data))}
        if (query) {
            dispatch({
                type: type, payload:
                    {...payload, query: query}
            });
        } else {
            dispatch({
                type: type, payload: payload
            });
        }

        if (LOAD_FILTER_PRODUCTS.localeCompare(type) === 0 &&
            window.location.search.localeCompare(uri.split("/products")[1]) !== 0) {
            history.push(uri)
        }
    } else {
        dispatch({type: type, payload: {isLoading: false, statusCode: BAD_REQUEST_ERROR_CODE}});
    }
}

const songsLoaded = () => async (dispatch, getState) => {
    const state = getState();
    // если в сторе уже есть песни — не дергаем сервис
    if (state.mainReducer.songs && state.mainReducer.songs.length){
        dispatch({
            type: 'SONGS_LOADED',
            payload: state.mainReducer.songs
        })
        return;
    }
    new RestoService().getSongItems()
        .then(songs => {
            dispatch({
                type: 'SONGS_LOADED',
                payload: songs
            })
        }).catch(() => dispatch(songsError()))
}

const songsRequested = () => {
    return {
        type: 'SONGS_REQUESTED',
    }
}

const songsError = () => {
    return {
        type: 'SONGS_ERROR',
    }
}

const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    }
}

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED',
    }
}

const menuError = () => {
    return {
        type: 'MENU_ERROR',
    }
}

const addedToCart = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    }
}

const deleteFromCart = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    }
}

export {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart,
    deleteFromCart,
    songsLoaded,
    songsRequested,
    songsError
};
