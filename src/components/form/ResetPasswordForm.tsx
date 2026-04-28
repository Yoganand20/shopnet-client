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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useAppStore } from "@/feature/appStore";
import type { User } from "@/lib/types";

const resetPasswordSchema = z.object({
  verificationCode: z
    .string()
    .min(6, { message: "Invalid Code" })
    .min(6, { message: "Invalid Code" }),
  password: z
    .string()
    .min(1, { message: "Please enter a password" })
    .min(8, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Please enter a password" })
    .min(8, { message: "Password must be at least 6 characters" }),
});

export default function ResetPasswordForm() {
  const { setUser } = useAuthStore();
  const { loading, setLoading } = useAppStore();
  const resetPasswordForm = useForm({
    defaultValues: {
      verificationCode: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
        setLoading(true);
        axiosInstance.post<User>("/auth/resetPassword", value).then((res) => {
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
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>Reset Password</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="reset-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            resetPasswordForm.handleSubmit(e);
          }}
        >
          <FieldGroup>
            <resetPasswordForm.Field
              name="verificationCode"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="{field.name}">
                      Verification Code
                    </FieldLabel>
                    <InputOTP
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e)}
                      aria-invalid={isInvalid}
                      placeholder="XXXXXX"
                      autoComplete="on"
                      disabled={loading}
                      maxLength={6}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <resetPasswordForm.Field
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
            <resetPasswordForm.Field
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
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="reset-password-form"
            disabled={loading}
          >
            {loading ? (
              <HugeiconsIcon
                icon={LoaderCircle}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
            ) : (
              "Reset Password"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
