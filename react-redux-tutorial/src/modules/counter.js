import { createAction, handleActions } from 'redux-actions'

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// export const increase = () => ({ tpye: INCREASE })
// export const decrease = () => ({ tpye: DECREASE })
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
  count: 0
}

// const counter = (state=initialState, action) => {
//   switch(action.type) {
//     case INCREASE:
//       return {
//         number: state.number+1
//       }
//     case DECREASE:
//       return {
//         number: state.number-1
//       }
//     default:
//       return state;
//   }
// }
const counter = handleActions({
  [INCREASE]: (state, action) => ({ number: state.number+1 }),
  [DECREASE]: (state, action) => ({ number: state.number-1 }),
}, initialState)

export default counter;