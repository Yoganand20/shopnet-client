import z from "zod";
import { useForm } from "@tanstack/react-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FieldGroup, Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { axiosInstance } from "@/lib/axios";
import { Link } from "react-router";
import { useAppStore } from "@/lib/appStore";

const signupSchema = z
  .object({
    email: z
      .email({ message: "Please enter a valid email address" })
      .min(1, { message: "Please enter an email address" }),
    password: z
      .string()
      .min(1, { message: "Please enter a password" })
      .min(8, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please enter a password" })
      .min(8, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const { loading, setLoading } = useAppStore();
  const signupForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        const { confirmPassword, ...reqData } = { ...value };
        const res = await axiosInstance.post("/auth/signup", reqData);
        return res;
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Card className="w-full sm:max-w-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>Create new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            signupForm.handleSubmit(e);
          }}
        >
          <FieldGroup>
            <signupForm.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="{field.name}">Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="john.doe@email.com"
                      autoComplete="on"
                      disabled={loading}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <signupForm.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="{field.name}">Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Password"
                      autoComplete="on"
                      disabled={loading}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <signupForm.Field
              name="confirmPassword"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="{field.name}">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Confirm Password"
                      autoComplete="on"
                      disabled={loading}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="signup-form"
            disabled={loading}
          >
            Sign Up
          </Button>
        </Field>
        <Field orientation="horizontal">
          <FieldLabel>
            Already Registered?
            <Link
              to="/auth/login"
              className="underline-offset-4 hover:underline"
            >
              Login.
            </Link>
          </FieldLabel>
        </Field>
      </CardFooter>
    </Card>
  );
}
