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
import { useAuthStore, type User } from "@/lib/authStore";
import { axiosInstance } from "@/lib/axios";
import { Link, useNavigate } from "react-router";
import { useAppStore } from "@/lib/appStore";

const loginSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Please enter an email address" }),
  password: z
    .string()
    .min(1, { message: "Please enter a password" })
    .min(8, { message: "Password must be at least 6 characters" }),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { loading, setLoading } = useAppStore();
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true, "Authenticating...");
        axiosInstance.post<User>("/auth/signup", value).then((res) => {
          setUser(res.data);
          setLoading(false);
          navigate("/auth/email-verification");
        });
      } catch (err) {
        console.error(err);
        setLoading(false);
      } finally {
      }
    },
  });

  return (
    <Card className="w-full sm:max-w-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Use your credentials to login.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            loginForm.handleSubmit(e);
          }}
        >
          <FieldGroup>
            <loginForm.Field
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
            <loginForm.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Link
                        to="/auth/forgot-password"
                        className="ml-auto underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="login-form"
            disabled={loading}
          >
            Login
          </Button>
        </Field>
        <Field orientation="horizontal">
          <FieldLabel>
            New User?
            <Link
              to="/auth/signup"
              className="underline-offset-4 hover:underline"
            >
              Signup.
            </Link>
          </FieldLabel>
        </Field>
      </CardFooter>
    </Card>
  );
}
