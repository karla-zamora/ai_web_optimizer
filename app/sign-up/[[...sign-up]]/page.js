import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div class="flex h-screen w-screen items-center justify-center">
      <SignUp />
    </div>
  );
}