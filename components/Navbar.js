"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";
import Avatar from "./Avatar";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const user = session?.user;

  const logout = async () => {
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
  };

  const link = (href, label) => (
    <Link href={href} className={pathname === href ? "font-bold text-primary" : ""}>{label}</Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h12" /></svg>
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-box bg-base-100 p-2 shadow-lg border border-base-300">
              <li>{link("/", "Home")}</li>
              <li>{link("/events", "Upcoming Events")}</li>
            </ul>
          </div>
          <Link href="/" className="brand flex items-center gap-2 text-xl font-extrabold text-primary">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-content">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 21s-7-4.4-9.3-9A5.3 5.3 0 0 1 12 6.2 5.3 5.3 0 0 1 21.3 12C19 16.600 12 21 12 21z"/></svg>
            </span>
            Hatey Hat
          </Link>
        </div>

        <nav className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">
            <li>{link("/", "Home")}</li>
            <li>{link("/events", "Upcoming Events")}</li>
          </ul>
        </nav>

        <div className="navbar-end gap-1">
          <ThemeToggle />
          {isPending ? (
            <div className="skeleton h-10 w-10 rounded-full" />
          ) : !user ? (
            <Link href="/login" className="btn btn-primary">Login</Link>
          ) : (
            <>
              <div className="dropdown dropdown-end">
                <div className="tooltip tooltip-bottom" data-tip={user.name}>
                  <button tabIndex={0} className="btn btn-ghost btn-circle avatar-btn" aria-label="Account menu">
                    <Avatar user={user} />
                  </button>
                </div>
                <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                  <li className="menu-title">{user.email}</li>
                  <li><Link href="/create-event">Create Event</Link></li>
                  <li><Link href="/manage-events">Manage Events</Link></li>
                  <li><Link href="/joined-events">Joined Events</Link></li>
                  <li><Link href="/profile">My Profile</Link></li>
                </ul>
              </div>
              <button onClick={logout} className="btn btn-outline btn-primary">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
