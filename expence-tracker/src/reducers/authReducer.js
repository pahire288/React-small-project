export const initialAuthState = {
  isLoggedIn: false,
  token: null,
  userId: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case "LOGOUT":
      return initialAuthState;
    default:
      return state;
  }
};
