import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Welcome to the Auth App</h1>
      <Link href="/login">Login</Link>
      <br />
      <Link href="/signup">Signup</Link>
    </div>
  );
}
