export interface Gathering {
  id: string;
  title: string;
  description: string;
  maxAttendees: number;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  created: Date;
  date: Date;
  imageUrl: string;
  linkName: string;
  state: GatheringState;

  groupName: string;
  groupLinkName: string;
  groupId: string;
}

export interface GatheringCreate {
  title: string;
  description: string;
  maxAttendees: number;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  date: Date;
  imageUrl: string;
}

export interface GatheringUpdate {
  id: string;
  title: string;
  description: string;
  maxAttendees: number;
  latitude: number;
  longitude: number;
  linkName: string;
  city: string;
  country: string;
  date: Date;
  state?: GatheringState;
}

export interface GatheringFilter {
  city: string;
  country: string;
  type?: string;
  skip?: number;
  take?: number;
}

export enum GatheringState {
  Ok,
  Cancelled,
}
