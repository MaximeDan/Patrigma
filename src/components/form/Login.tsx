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
    <div className="fixed left-0 top-0 z-10 flex size-full flex-col overflow-scroll bg-background px-5 pb-12 pt-5">
      <TopBar />
      <div className="flex justify-center mb-6">
        <h1 className="text-xl font-extrabold text-orange">
          Inscris toi sur Patrigma et découvre ton patrimoine !
        </h1>
      </div>
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col items-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
              className="bg-orange text-white hover:bg-orange-600 mt-4"
            >
              <span>Se connecter</span>
              <Icons.check
                width={14}
                height={14}
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
