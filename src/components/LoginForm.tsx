import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const loginSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Please enter an email address" }),
  password: z
    .string()
    .min(1, { message: "Please enter a password" })
    .min(8, { message: "Password must be at least 6 characters" }),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const loginForm = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginSchemaType) {
    // Do something with the form values.
    console.log(data);
  }
  return <>Hi</>;
}
