export interface IBid {
  id: number;
  name: string;
  position: string;
  company: string;
  email: string;
}

export interface IRejectedBid extends IBid {
  reason: string;
}

export interface IBidsData {
  newBid: IBid[];
  rejectedBid: IRejectedBid[];
}

export interface IUpdateRoleResponse {
  idUser: number;
  role: string;
  reason?: string;
}
