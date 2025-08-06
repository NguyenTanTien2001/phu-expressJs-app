import { JwtPayload } from 'jsonwebtoken';

// Extend the default JwtPayload to include our custom fields
export interface CustomJWTPayload extends JwtPayload {
  accountId: string;
  userId: string;
}

export function isCustomJWTPayload(payload: any): payload is CustomJWTPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'accountId' in payload &&
    'userId' in payload
  );
}