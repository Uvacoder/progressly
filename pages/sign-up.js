import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../src/authProvider";
import SignUpForm from "../src/components/SignUpForm";

export default function SignUp() {
  const router = useRouter();
  const { user } = useAuth();
  if (user) router.push("/my-profile");
  return <SignUpForm />;
}
