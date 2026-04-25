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
import { Button } from "../ui/button";
import { useAuthStore, type User } from "@/lib/authStore";
import { useAppStore } from "@/lib/appStore";
import { LoaderCircle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { axiosInstance } from "@/lib/axios";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useNavigate } from "react-router";

const verifyEmailSchema = z.object({
  verificationCode: z
    .string()
    .min(6, { message: "Invalid Code" })
    .min(6, { message: "Invalid Code" }),
});

export default function EmailVerificationForm() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { loading, setLoading } = useAppStore();
  const verifyEmailForm = useForm({
    defaultValues: {
      verificationCode: "",
    },
    validators: {
      onSubmit: verifyEmailSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        axiosInstance.post<User>("/auth/verifyEmail", value).then((res) => {
          setUser(res.data);
          navigate("/auth/email-verification");
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
        <CardTitle className="text-2xl font-bold">Verify Email</CardTitle>
        <CardDescription>Verify Email</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="reset-password-form"
          onSubmit={(e) => {
            e.preventDefault();
            verifyEmailForm.handleSubmit(e);
          }}
        >
          <FieldGroup>
            <verifyEmailForm.Field
              name="verificationCode"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="{field.name}">Email</FieldLabel>
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
              "Verify Email"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
