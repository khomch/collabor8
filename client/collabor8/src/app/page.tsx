"use client";
import Member from "@/components/user/user";
import Link from "next/link";
import { useDispatch, useSelector } from '../redux-store/customHooks';
import { getUserDetails } from '@/apiService/userServicesApi';

export default function LandingPage() {


  const userDetails = useSelector((state) => state.userDetails.loggedUser);
  console.log('User details = ', userDetails);

  return <div className="landing-page"></div>;
}
