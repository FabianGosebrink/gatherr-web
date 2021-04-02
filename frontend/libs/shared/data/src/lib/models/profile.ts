export class UserProfile {
  id: string;
  userIdentifier: string;
  username: string;
  aboutMe: string;
  imageUrl: string;
}

export class UserProfileCreate {
  userIdentifier: string;
  username: string;
  imageUrl: string;
}
