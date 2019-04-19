import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Settings from './Settings';
import Languages from './Languages';


const reducers = combineReducers ({
    routing: routerReducer,
    settings: Settings,

    languages: Languages
});

export default reducers;
