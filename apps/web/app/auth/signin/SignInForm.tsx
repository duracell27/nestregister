"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signIn, signUp } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type signInFormData = z.infer<typeof FormSchema>;
export function SignUpForm() {
  const redirect = useRouter();
  const form = useForm<signInFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: signInFormData) {
    const res = await signIn(data);

    if (res && res.status === "success") {
      toast.success(res.message);
      redirect.push("/");
    } else if (res && res.status === "error") {
      toast.error(res.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
