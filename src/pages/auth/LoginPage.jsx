import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import FormField from "../../components/FormField";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const [form,setForm] = useState({ username:"emilys", password:"emilyspass" }); const [loading,setLoading] = useState(false);
  if (isAuthenticated) return <Navigate to="/admin" replace />;
  const submit = async (e) => { e.preventDefault(); setLoading(true); try { await login(form); toast.success("Welcome back!"); navigate(location.state?.from?.pathname || "/admin", {replace:true}); } catch(err) { toast.error(err.message); } finally { setLoading(false); } };
  return <AuthShell title="Welcome back" subtitle="Sign in to manage Kitchen Notes."><form onSubmit={submit} className="space-y-4"><FormField label="Username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} required /><FormField label="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required /><button disabled={loading} className="w-full rounded-xl bg-charcoal py-3 text-sm font-semibold text-cream disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button></form><p className="mt-5 text-center text-sm text-charcoal-soft">New here? <Link className="font-semibold text-paprika" to="/register">Create an account</Link></p></AuthShell>;
}
export function AuthShell({title,subtitle,children}) { return <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-10"><div className="w-full max-w-md rounded-3xl border border-line bg-white/70 p-7 shadow-xl shadow-charcoal/5 sm:p-9"><Link to="/" className="mb-8 flex justify-center gap-2"><ChefHat className="text-paprika" /><span className="font-display text-xl font-semibold">Kitchen Notes</span></Link><h1 className="font-display text-3xl font-semibold">{title}</h1><p className="mb-7 mt-2 text-sm text-charcoal-soft">{subtitle}</p>{children}</div></div>; }
