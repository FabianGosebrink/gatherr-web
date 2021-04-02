export interface Meetup {
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
  state: MeetupState;

  groupName: string;
  groupLinkName: string;
  groupId: string;
}

export interface MeetupCreate {
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

export interface MeetupUpdate {
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
  state?: MeetupState;
}

export interface MeetupFilter {
  city: string;
  country: string;
  type?: string;
  skip?: number;
  take?: number;
}

export enum MeetupState {
  Ok,
  Cancelled,
}
