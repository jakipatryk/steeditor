import { UserData } from './models';

export interface AuthState {
  currentUser: string | null;
  currentUserData: UserData;
  userDataLoading: boolean;
  loggingOut: boolean;
}

export const initialState: AuthState = {
  currentUser: null,
  currentUserData: {
    username: null,
    fullName: null,
    about: null,
    website: null,
    createdAt: null,
    recoveryPartner: null,
    location: null,
    avatar: null,
    coverImage: null,
    github: null,
    reputation: null,
    votingPower: null,
    VESTS: null,
    SBD: null,
    STEEM: null,
    witnessesVotedFor: null
  },
  userDataLoading: false,
  loggingOut: false
};
