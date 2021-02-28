import React from "react";
import { useRouter } from "next/router";
import SignInForm from "../src/components/SignInForm";
import { useAuth } from "../src/authProvider";

export default function SignIn() {
  const router = useRouter();
  const { user } = useAuth();
  if (user) router.push("/my-profile");
  return <SignInForm />;
}
