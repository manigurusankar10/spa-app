import { queryKeys } from "./constants"

export const generateUserKey = (userId: number) => {
  // remove userToken from dependency array to keep
  // key consistent regardless of token changes
  return [queryKeys.user, userId];
}

export const generateUserAppointmentKey = (userId: number, userToken: string) => {
  return [queryKeys.appointments, queryKeys.user, userId, userToken];
}