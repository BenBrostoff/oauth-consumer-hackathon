import { useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>
  }

  return <a href="/api/auth/signin" className="rounded p-4 text-white text-bold" style={{
    backgroundColor: "rgb(239, 99, 81)"
  }}>
    Connect Klaviyo account
  </a>

};

export default SignIn;
