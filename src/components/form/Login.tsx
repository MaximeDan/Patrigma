"use client";
import React from "react";
import { loginSchema } from "@/validators/loginSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { Icons } from "../Icons";
import TopBar from "../TopBar";

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await signIn("credentials", {
        redirect: true,
        identifier: data.email,
        password: data.password,
        callbackUrl: "/",
        cache: "no-cache",
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col overflow-scroll bg-background px-5 pb-12 pt-5">
      <TopBar />
      <div className="mb-6 flex justify-center">
        <h1 className="text-center text-xl font-extrabold text-orange">
          Connexion
        </h1>
      </div>
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full max-w-md flex-col items-center space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="example@email.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4 w-full bg-orange text-white hover:bg-orange-500 md:w-auto"
            >
              <span>Se connecter</span>
              <Icons.check
                width={16}
                height={16}
                className="ml-2"
                fill="#fff"
              />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
