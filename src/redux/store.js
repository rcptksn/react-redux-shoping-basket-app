import {createStore} from 'redux';
import {products} from '../data/products';

let initialState = {
    siteName: 'RecepTeksan.com',
    siteDescription: 'Alışverişin hesaplı hali',
    products: products,
    basket: [],
    basketCount: 0,
    basketTotalPrice: 0
};

function myReducer(state, action) {
    switch (action.type) {
        case 'SET-BASKET-PRODUCT':

            //eklenen ürün daha önce sepete eklenmişmi kontrol et
            let isProdInBasket = false;
            if (state.basket.some(item => item.prodId === action.payload.prodId)) {
                isProdInBasket = true;
            }

            //daha önce sepete eklenen bir ürün değilse sepete ekle
            if (!isProdInBasket) {
                return Object.assign({}, state, {
                    basket: state.basket.concat(action.payload),
                    basketCount: state.basketCount + 1
                });
            }

        case 'REMOVE-BASKET-PRODUCT':
            let myIndex = state.basket.findIndex(item => item.prodId === action.prodId);
            state.basket.splice(myIndex, 1);
            return Object.assign({}, state, {
                basket: [...state.basket],
                basketCount: state.basketCount - 1
            });

        case 'SUM-BASKET-TOTAL-PRICE':
            return Object.assign({}, state, {
                basketTotalPrice: state.basketTotalPrice + action.payload
            });

        case 'SUBTRACT-BASKET-TOTAL-PRICE':
            return Object.assign({}, state, {
                basketTotalPrice: state.basketTotalPrice - action.payload
            });

        default:
            return state;
    }
}

export default createStore(myReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
