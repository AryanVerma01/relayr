"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import github from '../../../public/github-icon-1.svg' 
import google from '../../../public/google-color-svgrepo-com.svg' 

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Loginform = () => {
  
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: '/'
    },{
        onSuccess: (ctx) => {
            router.push('/');
        },

        onError : (ctx) => {
            toast.error(ctx.error.message);
        }
    })
  }

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-10  selection:bg-white selection:text-black">
      <CardHeader className="text-center">
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Login to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant={"outline"}
                  type="button"
                  disabled={isPending}
                  className="w-full bg-black text-center text-white border-neutral-700 hover:cursor-pointer transition-all hover:-translate-y-0.5 hover:bg-neutral-800 font-medium"
                >
                  <Image src={github} alt="github" className="w-4 bg-white rounded-full"></Image>Continue with Github
                </Button>
                <Button
                  type="button"
                  variant={"outline"}
                  disabled={isPending}
                  className="w-full bg-black text-center border-neutral-700 text-white hover:cursor-pointer transition-all hover:-translate-y-0.5 hover:bg-neutral-800 font-medium"
                >
                  <Image src={google} alt="" className="w-4"/> Continue with Google
                </Button>
              </div>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <label>Email</label>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="a@example.com"
                          {...field}
                          className="border-neutral-800"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400"/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <label>Password</label>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                          className="border-neutral-800"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400"/>
                    </FormItem>
                  )}
                />
                <Button
                  variant={"secondary"}
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-orange-500 text-center text-white hover:cursor-pointer transition-all hover:-translate-y-0.5 hover:bg-orange-400 font-medium"
                >
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

export default Loginform;