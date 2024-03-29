import { UserProfile } from './profile';

export interface GatheringMember {
  memberId: string;
  userProfile: UserProfile;
  role: GatheringRole;
}

export enum GatheringRole {
  Admin = 0,
  Organiser = 1,
  Attendee = 2,
  WaitingList = 3,
}

export interface GroupMember {
  memberId: string;
  userProfile: UserProfile;
  role: GroupRole;
}

export enum GroupRole {
  Admin = 0,
  Organiser = 1,
  Member = 2,
}
