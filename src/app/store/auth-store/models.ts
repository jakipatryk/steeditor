export interface UserData {
  username: string;
  fullName: string;
  about: string;
  website: string;
  createdAt: string;
  recoveryPartner: string;
  location: string;
  avatar: string;
  coverImage: string;
  github: string;
  reputation: number;
  votingPower: number;
  VESTS: number;
  SBD: number;
  STEEM: number;
  witnessesVotedFor: Array<string>;
}
