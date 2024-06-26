"use client";
import React from "react";
import registerSchema from "@/validators/registerSchema";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/tailwindUtils";
import { signIn } from "next-auth/react";
import { registerUserApi } from "@/apiClient/registerUser";
import TopBar from "../TopBar";
import { Icons } from "../Icons";

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastName: "",
      username: "",
      dateOfBirth: undefined,
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUserApi({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        username: data.username,
        name: data.name,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
      });

      await signIn("credentials", {
        redirect: true,
        identifier: data.email,
        password: data.password,
        callbackUrl: "/",
      });
    } catch (error: any) {
      if (error.message === "Email already in use") {
        form.setError("email", {
          type: "manual",
          message: "Email déjà utilisé ou invalide",
        });
      } else {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex size-full flex-col overflow-scroll bg-background px-5 pb-12 pt-5">
      <TopBar />
      <div className="mb-6 flex justify-center">
        <h1 className="text-center text-xl font-extrabold text-orange">
          Inscris toi sur Patrigma et découvre ton patrimoine !
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
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date d'anniversaire</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value && format(field.value, "PPP")}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Confirmer votre mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4 w-full bg-orange text-white hover:bg-orange-600 md:w-auto"
            >
              <span>S'inscrire</span>
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

export default Register;
