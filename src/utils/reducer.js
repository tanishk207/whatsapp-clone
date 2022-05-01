export const initialState = {
    user: null,
}

export const actionType = {
    SET_USER: 'SET_USER',
    OPEN_DIALOG: 'OPEN_DIALOG',
    CLOSE_DIALOG: 'CLOSE_DIALOG',
    NOTIFY: 'NOTIFY',
    SHOW_CHATMENU: 'SHOW_CHATMENU',
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actionType.SET_USER: return { ...state, user: action.user };
        case actionType.OPEN_DIALOG: return { ...state, open: action.open };
        case actionType.CLOSE_DIALOG: return { ...state, open: action.open };
        case actionType.NOTIFY: return { ...state, notify: action.notify, message: action.message, status: action.status }
        case actionType.SHOW_CHATMENU: return { ...state, openMenu: action.openMenu }
        default: return state;
    }
}