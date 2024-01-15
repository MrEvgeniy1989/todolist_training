type InitialStateType = typeof initialState
type xxxACType = ReturnType<typeof xxxAC>
type ActionType =
    | xxxACType

const initialState = {
    isLoggedIn: false
}
export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'xxx': {
            return state
        }
        default: {
            return state
        }
    }
}

const xxxAC = () => ({type: 'xxx'})