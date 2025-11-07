// параметр по умолчанию
const initialState = {
    songs : [
        {
            name: "ГЕТТО",
            artist: "Ракурс цели",
            audio: "https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%93%D0%B5%D1%82%D1%82%D0%BE(KUSTOM%20Groove%201200).mp3?alt=media&token=c47deb62-09c3-47bd-867b-d4b703519b8c",
            id: 0,
            duration: "3:36",
        },
        {
            name: "Забвение",
            artist: "Ракурс цели",
            audio: "https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%A0%D0%B0%D0%BA%D1%83%D1%80%D1%81%20%D1%86%D0%B5%D0%BB%D0%B8%20-%20%D0%97%D0%B0%D0%B1%D0%B2%D0%B5%D0%BD%D0%B8%D0%B5(%D0%B4%D0%B5%D0%BC%D0%BE).mp3?alt=media&token=5682073f-28b4-49de-aeef-1ac692a88cbd",
            id: 1,
            duration: "4:54",
        },
        {
            name: "Судьба",
            artist: "Ракурс цели",
            audio: "https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%A0%D0%B0%D0%BA%D1%83%D1%80%D1%81%20%D1%86%D0%B5%D0%BB%D0%B8%20-%20%D0%A1%D1%83%D0%B4%D1%8C%D0%B1%D0%B0(%D0%B4%D0%B5%D0%BC%D0%BE).mp3?alt=media&token=00295371-dc14-4e19-93c9-f926f669ab10",
            id: 2,
            duration: "3:53",
        },
        {
            name: "Вперед",
            artist: "Ракурс цели",
            audio: "https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%A0%D0%B0%D0%BA%D1%83%D1%80%D1%81%20%D1%86%D0%B5%D0%BB%D0%B8%20-%20%D0%92%D0%BF%D0%B5%D1%80%D0%B5%D0%B4(%D0%B4%D0%B5%D0%BC%D0%BE).mp3?alt=media&token=34041390-140c-4c04-9395-96ac46353924",
            id: 3,
            duration: "3:01",
        },
        {
            name: "Игра",
            artist: "Ракурс цели",
            audio: "https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%A0%D0%B0%D0%BA%D1%83%D1%80%D1%81%20%D1%86%D0%B5%D0%BB%D0%B8%20-%20%D0%98%D0%B3%D1%80%D0%B0(%D0%B4%D0%B5%D0%BC%D0%BE).mp3?alt=media&token=cc813968-e8a1-4701-bbc6-44c74ff90b2e",
            id: 4,
            duration: "4:20",
        },
        {
            name: "Ракурс цели",
            artist: "Ракурс цели",
            audio: "https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%A0%D0%B0%D0%BA%D1%83%D1%80%D1%81%20%D1%86%D0%B5%D0%BB%D0%B8%20-%20%D0%A0%D0%B0%D0%BA%D1%83%D1%80%D1%81%20%D1%86%D0%B5%D0%BB%D0%B8(%D0%B4%D0%B5%D0%BC%D0%BE).mp3?alt=media&token=21c9b145-d1ac-4de3-8d02-5375c83ffaab",
            id: 5,
            duration: "5:40",
        },
        {
            name: "Живи, пока живой...",
            artist: "Ракурс цели",
            audio: "https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%A0%D0%B0%D0%BA%D1%83%D1%80%D1%81%20%D1%86%D0%B5%D0%BB%D0%B8%20-%20%D0%96%D0%B8%D0%B2%D0%B8%20%D0%BF%D0%BE%D0%BA%D0%B0%20%D0%B6%D0%B8%D0%B2%D0%BE%D0%B9(%D0%B4%D0%B5%D0%BC%D0%BE).mp3?alt=media&token=37134f28-8052-4005-9f2a-8b73c74b0042",
            id: 6,
            duration: "4:21",
        },
        {
            name: "Метрополитен",
            artist: "Ракурс цели",
            audio: "https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%A0%D0%B0%D0%BA%D1%83%D1%80%D1%81%20%D1%86%D0%B5%D0%BB%D0%B8%20-%20Metropolitain(Horizon%20NT-7B).mp3?alt=media&token=ad0c71a9-f0de-4915-8e2c-4f001ee5eea9",
            id: 7,
            duration: "4:39",
        },
        {
            name: "Шторм",
            artist: "Ракурс цели",
            audio: "https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%A0%D0%B0%D0%BA%D1%83%D1%80%D1%81%20%D1%86%D0%B5%D0%BB%D0%B8%20-%20%D0%A8%D1%82%D0%BE%D1%80%D0%BC(Instrumental).mp3?alt=media&token=ad3df80d-88ab-4cde-a42c-a69de06d644d",
            id: 8,
            duration: "4:46",
        },
        {
            name: "Путник(Bonus track)",
            artist: "Ракурс цели",
            audio: "https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%9F%D1%83%D1%82%D0%BD%D0%B8%D0%BA_2025.mp3?alt=media&token=a2677099-842f-4dd0-8475-eb29d9e7fc55",
            id: 9,
            duration: "3:25",
        },
    ],
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0
}


const mainReducer = (state = initialState, action) => {
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

export default mainReducer;
