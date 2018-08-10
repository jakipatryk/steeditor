export interface AuthState {
  currentUser: string | null;
  loggingOut: boolean;
}

export const initialState: AuthState = {
  currentUser: null,
  loggingOut: false
};
