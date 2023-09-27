import { useEffect } from "react";
import log from "loglevel";
import {LOAD_SHOPPING_BAG_PRODUCTS} from "../actions/types";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {PRODUCT_BY_ID_DATA_API} from "../components/constants/api_routes";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useAddProductsToShoppingBag() {
    const addToCart = useSelector(state => state.mainReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (addToCart.items) {
            dispatch({
                type: LOAD_SHOPPING_BAG_PRODUCTS,
                payload: {isLoading: false, data: addToCart.items}
            })
        }
    }, [])
}
