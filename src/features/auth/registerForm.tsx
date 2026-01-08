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


const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string()  
}).refine((data)=> data.password === data.confirmPassword , {
    message: "Password don't match",
    path: ['confirmPassword']
});


type RegisterFormValues = z.infer<typeof registerSchema>;  // ? Typescript type for ract-hook form

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    
    // ? All the values come in this function after form is submitted

    await authClient.signUp.email(
        {
            name: values.email,
            email: values.email,
            password: values.password,
            callbackURL: '/'
        },
        {
            onSuccess: (ctx) => {
                router.push("/");
            },

            onError: (ctx) => {
                toast.error(ctx.error.message)
            }
        }
    )
  }

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-10 mx-40">
      <CardHeader className="text-center">
        <CardTitle>Get Started</CardTitle>
        <CardDescription>Login to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  className="w-full bg-white text-center text-black hover:cursor-pointer"
                  variant={"outline"}
                  type="button"
                  disabled={isPending}
                >
                  Continue with Github
                </Button>
                <Button
                  className="w-full bg-white text-center text-black "
                  type="button"
                  variant={"outline"}
                  disabled={isPending}
                >
                  Continue with Google
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
                        />
                      </FormControl>
                      <FormMessage />
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <label>Confirm Password</label>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant={"secondary"}
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-white text-center text-black "
                >
                  Sign up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="underline underline-offset-4"
                >
                  login
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

export default RegisterForm;