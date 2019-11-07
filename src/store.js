import { createStore, compose } from 'redux';
import { reducer } from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function initStore(preloadedState) {

    return createStore(
        reducer,
        preloadedState,
        composeEnhancers()
    );
}