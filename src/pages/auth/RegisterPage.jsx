import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import FormField from "../../components/FormField";
import { AuthShell } from "./LoginPage";

export default function RegisterPage() {
  const { register } = useAuth(); const navigate = useNavigate(); const [loading,setLoading]=useState(false);
  const [form,setForm]=useState({firstName:"",lastName:"",email:"",username:"",password:""});
  const field=(key)=>(e)=>setForm({...form,[key]:e.target.value});
  const submit=async(e)=>{e.preventDefault();setLoading(true);try{await register(form);toast.success("Account created!");navigate("/admin");}catch(err){toast.error(err.message);}finally{setLoading(false);}};
  return <AuthShell title="Create your account" subtitle="Your account is stored locally for this frontend demo."><form onSubmit={submit} className="space-y-4"><div className="grid grid-cols-2 gap-3"><FormField label="First name" value={form.firstName} onChange={field("firstName")} required/><FormField label="Last name" value={form.lastName} onChange={field("lastName")} required/></div><FormField label="Email" type="email" value={form.email} onChange={field("email")} required/><FormField label="Username" value={form.username} onChange={field("username")} required/><FormField label="Password" type="password" minLength="6" value={form.password} onChange={field("password")} required/><button disabled={loading} className="w-full rounded-xl bg-charcoal py-3 text-sm font-semibold text-cream">{loading?"Creating…":"Create account"}</button></form><p className="mt-5 text-center text-sm text-charcoal-soft">Already registered? <Link to="/login" className="font-semibold text-paprika">Sign in</Link></p></AuthShell>;
}
