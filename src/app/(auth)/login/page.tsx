import LoginForm from "@/features/auth/loginForm";
import { authClient } from "@/lib/auth-client";
import { requireUnauth } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

const Login = async () => {

  await requireUnauth();
  
  return <LoginForm />

};

export default Login;
