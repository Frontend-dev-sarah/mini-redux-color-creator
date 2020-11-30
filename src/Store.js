import { createStore } from 'redux';
import { reducer as ColorCreatorReducer } from './redux/ColorCreatorRedux';

const store = createStore(ColorCreatorReducer);

export default store;