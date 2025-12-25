export const AppRoute = {
  Main: '/',
  Profile: '/profile',
  Members: '/members',
  Events: '/events',
  Bid: '/bid',
} as const;

export const ModalType = {
  Authorization: 'authorization',
  Apply: 'apply',
} as const;

export const APIRoute = {
  Status: '/user/status',
  Refresh: '/auth/token',
  Register: '/user/create',
  Login: '/auth/login',
  Bid: '/user/bids',
  Role: '/user/updateRole',
} as const;

export const AuthorizationStatus = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  NEW_BID: 'NEW_BID',
  REJECTED_BID: 'REJECTED_BID',
  UNKNOWN: 'UNKNOWN',
} as const;

export type AuthorizationStatusType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

export const BidConst = {
  New: 'new',
  Rejected: 'rejected',
} as const;

export type BidType = typeof BidConst[keyof typeof BidConst];
