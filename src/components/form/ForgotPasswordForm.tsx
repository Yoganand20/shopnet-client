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
import { useAuthStore } from "@/feature/authStore";
import { LoaderCircle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { axiosInstance } from "@/services/axios";
import { useAppStore } from "@/feature/appStore";
import type { User } from "@/lib/types";

const forgotPasswordSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Please enter an email address" }),
});

export default function ForgotPasswordForm() {
  const { setUser } = useAuthStore();
  const { loading, setLoading } = useAppStore();
  const forgotPasswordForm = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        axiosInstance.post<User>("/auth/forgotPassword", value).then((res) => {
          setUser(res.data);
        });
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
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>Forgot Password</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="forgot-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            forgotPasswordForm.handleSubmit(e);
          }}
        >
          <FieldGroup>
            <forgotPasswordForm.Field
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="forgot-password-form" disabled={loading}>
            {loading ? (
              <HugeiconsIcon
                icon={LoaderCircle}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
            ) : (
              "Forgot Password"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
