export interface IMemberData {
  id: number;
  name: string;
  email: string;
}

export interface IMembersData {
  count: number;
  users: IMemberData[];
}

export interface IMembersParams {
  search: string;
}
