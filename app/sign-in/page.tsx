"use client";
import { SignIn, useUser } from "@clerk/nextjs";

export default function SignInPage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className=" w-full max-w-md">
          <SignIn
            routing="hash"
            forceRedirectUrl={"/dashboard"}
            appearance={{
              elements: {
                rootBox: "w-full",
              },
            }}
          />
        </div>
      </div>
    );
  }

  return <div>Welcome!</div>;
}
