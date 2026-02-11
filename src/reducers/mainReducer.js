
export const songsReducer = (state = {
    songs : [],
    loading: true,
    error: false}, action) => {

    switch (action.type) {
        case 'SONGS_LOADED':
            return {
                ...state,
                songs: action.payload,
                loading: false,
                error: false
            };
        case 'SONGS_REQUESTED':
            return {
                ...state,
                songs: state.songs,
                loading: true,
                error: false
            };
        case 'SONGS_ERROR':
            return {
                ...state,
                songs: state.songs,
                error: true
            };
        default:
            return state;
    }

}


export const mainReducer = (state = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0
}, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;

            const itemInd = state.items.findIndex(item => item.id === id);
            if (itemInd >= 0){
                const itemInState = state.items.find(item => item.id === id);
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty
                }
                localStorage.setItem('items',JSON.stringify([...state.items.slice(0, itemInd),
                    newItem,
                    ...state.items.slice(itemInd + 1)]));
                localStorage.setItem('totalPrice',(state.totalPrice + newItem.price).toString());
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }

            }
            // товара раньше не было в корзине
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                name: item.name,
                price: item.price,
                imageURL: item.imageURL,
                id: item.id,
                qtty: 1
            };
            localStorage.setItem('items',JSON.stringify([...state.items, newItem]));
            localStorage.setItem('totalPrice',(state.totalPrice + newItem.price).toString())
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            };

        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx)
            const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty'];

            localStorage.setItem('items',JSON.stringify([
                ...state.items.slice(0, itemIndex),
                ...state.items.slice(itemIndex + 1)]
            ));
            localStorage.setItem('totalPrice',(state.totalPrice - price).toString())
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                totalPrice: state.totalPrice - price
            }
        default:
            return {...state,items: JSON.parse(localStorage.getItem('items'))||state.items,
                totalPrice: +localStorage.getItem('totalPrice')};
    }
}
