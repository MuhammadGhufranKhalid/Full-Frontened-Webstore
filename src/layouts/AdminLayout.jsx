import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { ChefHat, LayoutDashboard, CookingPot, Tags, Users, UserCircle, Settings, Menu, X, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  ["/admin", "Overview", LayoutDashboard, true], ["/admin/recipes", "Recipes", CookingPot], ["/admin/categories", "Categories", Tags],
  ["/admin/users", "Users", Users], ["/admin/profile", "Profile", UserCircle], ["/admin/settings", "Settings", Settings],
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const sidebar = <aside className="flex h-full w-64 flex-col bg-charcoal text-cream">
    <div className="flex h-18 items-center gap-2 border-b border-white/10 px-5"><ChefHat className="h-6 w-6 text-paprika" /><span className="font-display text-lg font-semibold">Kitchen Admin</span></div>
    <nav className="flex-1 space-y-1 p-3">{links.map(([to,label,Icon,end]) => <NavLink key={to} end={end} to={to} onClick={() => setOpen(false)} className={({isActive}) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${isActive ? "bg-paprika text-white" : "text-cream-dim hover:bg-white/10"}`}><Icon className="h-4 w-4" />{label}</NavLink>)}</nav>
    <Link to="/" className="m-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm hover:bg-white/10"><ExternalLink className="h-4 w-4" />View website</Link>
  </aside>;
  return <div className="min-h-screen bg-cream-dim/40 lg:flex">
    <div className="fixed inset-y-0 left-0 z-50 hidden lg:block">{sidebar}</div>
    {open && <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close menu" className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />{sidebar}</div>}
    <div className="min-w-0 flex-1 lg:ml-64"><header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-line bg-cream/90 px-4 backdrop-blur sm:px-6">
      <button className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <div className="ml-auto flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-semibold">{user?.firstName || user?.username}</p><p className="text-xs text-charcoal-soft">{user?.email}</p></div><img src={user?.image || `https://ui-avatars.com/api/?name=${user?.username}`} className="h-9 w-9 rounded-full object-cover" alt="" /><button onClick={logout} title="Log out"><LogOut className="h-4 w-4 text-charcoal-soft" /></button></div>
    </header><main className="p-4 sm:p-6 lg:p-8"><Outlet /></main></div>
  </div>;
}
