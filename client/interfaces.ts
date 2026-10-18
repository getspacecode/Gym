export interface Membership {
  membershipId: string;
  active: boolean;
  name: string;
  start: string;
  end: string;
}
export interface MembershipDTO {
  token: string;
  membership: Membership;
}
export interface Attendation {
  id: string;
  activeMembership: boolean;
  membershipId: string;
  name: string;
  time: string;
}
export interface Exercises {
  day: string;
  id: string;
  membership: string;
  name: string;
}
