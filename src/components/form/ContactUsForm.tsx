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
import { useAppStore } from "@/lib/appStore";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const contactUsSchema = z.object({
  firstName: z.string().min(1, { message: "Please enter your name." }),
  lastName: z.string(),
  email: z.email({ message: "Please enter a valid email address" }),
  orderNumber: z.string(),
  topicType: z.enum([
    "returns",
    "warranty",
    "shipping",
    "selling",
    "general question",
  ]),
  message: z.string(),
});

const topics = [
  { label: "Returns", value: "returns" },
  { label: "Warranty", value: "warranty" },
  { label: "Shipping", value: "shipping" },
  { label: "Selling", value: "selling" },
  { label: "General Question", value: "general question" },
];

export default function ContactUsForm() {
  const { loading } = useAppStore();
  const loginForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      orderNumber: "",
      topicType: "",
      message: "",
    },
    validators: {
      onSubmit: contactUsSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
      } catch (err) {
        console.error(err);
      } finally {
      }
    },
  });

  return (
    <Card className="w-full shadow-2xl px-10 py-5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Send a Message</CardTitle>
        <CardDescription>
          We usually respond within 24 business hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="contact-us-form"
          onSubmit={(e) => {
            e.preventDefault();
            loginForm.handleSubmit(e);
          }}
        >
          <FieldGroup>
            <div className="flex flex-row gap-12">
              <loginForm.Field
                name="firstName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="John"
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
                name="lastName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Doe"
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
            </div>
            <loginForm.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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
              name="orderNumber"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Order Number (Optional)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="ORD-XXXXXX"
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
              name="topicType"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      What are you writing about?
                    </FieldLabel>
                    <Select disabled={loading} items={topics}>
                      <SelectTrigger id={field.name}>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {topics.map((topic) => (
                            <SelectItem key={topic.value} value={topic.value}>
                              {topic.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <loginForm.Field
              name="message"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      What are you writing about?
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Write your message..."
                      autoComplete="on"
                      rows={5}
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
          <Button type="submit" form="contact-us-form" disabled={loading}>
            Send Message
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
