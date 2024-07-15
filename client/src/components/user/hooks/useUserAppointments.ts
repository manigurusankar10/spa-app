import type { Appointment } from "@shared/types";

import { axiosInstance, getJWTHeader } from "../../../axiosInstance";

import { useLoginData } from "@/auth/AuthContext";
import { generateUserAppointmentKey } from "@/react-query/key-factories";
import { useQuery } from "@tanstack/react-query";

// for when we need a query function for useQuery
async function getUserAppointments(
  userId: number,
  userToken: string
): Promise<Appointment[] | null> {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  return data.appointments;
}

export function useUserAppointments(): Appointment[] {

  //get details on userId
  const { userId, userToken } = useLoginData();
  const fallback: Appointment[] = [];
  const { data: userAppointments = fallback } = useQuery({
    enabled: !!userId,
    queryKey: generateUserAppointmentKey(userId, userToken),
    queryFn: () => getUserAppointments(userId ,userToken)
  });
  
  return userAppointments;
}
