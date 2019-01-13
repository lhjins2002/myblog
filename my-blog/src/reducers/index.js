import { MODIFYPAGE } from '../actions';
import { combineReducers } from 'redux';

const pageInitialState = {
    pageType: 0,
    value: 0,
};

const page = (state = pageInitialState, action) => {
    switch(action.type) {
        case MODIFYPAGE:
            return Object.assign({}, state, {
                pageType: action.pageType,
                value: action.value,
            });
        default:
            return state;
    }
};


const extra = (state = { value: 'this_is_extra_reducer' }, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

const pageApp = combineReducers({
    page,
    extra
});

export default pageApp;