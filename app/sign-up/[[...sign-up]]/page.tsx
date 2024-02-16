import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <SignUp />
    </div>
  );
}
