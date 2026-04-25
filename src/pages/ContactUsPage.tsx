import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock, Mail, Phone } from "@hugeicons/core-free-icons";
import ContactUsForm from "@/components/form/ContactUsForm";

function ContactUsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          How can we help?
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Whether you're tracking a package or just want to tell us how much you
          love your new gear, our team is standing by.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ContactUsForm />
        </div>

        <div className="space-y-6">
          {/* Quick Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Direct Contact</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <HugeiconsIcon icon={Mail} className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email Us</p>
                  <p className="text-sm text-muted-foreground">
                    support@shopnet.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <HugeiconsIcon
                    icon={Phone}
                    className="h-5 w-5 text-primary"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Call Us</p>
                  <p className="text-sm text-muted-foreground">
                    +91-866-881-3909
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hours Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HugeiconsIcon icon={Clock} className="h-5 w-5" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Mon — Fri</span>
                <span className="font-medium text-foreground">
                  9am — 6pm IST
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Saturday</span>
                <span className="font-medium text-foreground">
                  10am — 4pm IST
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 text-muted-foreground">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
