export type Session = {
  _id: string;
  createdAt: Date;
  ip: string;
  sessionToken: string;
  updatedAt: Date;
  userAgent: string;
  userId: string;
  valid: boolean;
};
