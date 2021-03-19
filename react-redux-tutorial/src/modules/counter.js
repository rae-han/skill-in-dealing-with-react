const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const increase = () => ({ tpye: INCREASE })
export const decrease = () => ({ tpye: DECREASE })

const initialState = {
  count: 0
}

const counter = (state=initialState, action) => {
  switch(action.type) {
    case INCREASE:
      return {
        number: state.number+1
      }
    case DECREASE:
      return {
        number: state.number-1
      }
    default:
      return state;
  }
}

export default counter;