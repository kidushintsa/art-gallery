import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { roles } from "@/entities/roles";
import RoleSubmit from "./roleSubmit";

export default function RoleSelection() {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      role: "",
    },
  });

  const selectedRole = watch("role");
  const router = useRouter();
  const { status } = useSession();

  const onSubmit = async (data: { role: string }) => {
    if (status === "authenticated") {
      try {
        const res = await fetch("/api/register/role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: data.role.toUpperCase() }),
          cache: "no-store",
        });

        if (res.ok) {
          window.alert("Role inserted successfully!");
          if (data.role === "artist") {
            router.push("/paymentmethods");
          } else if (data.role === "customer") {
            router.push("/dashboard/user");
          } else {
            console.log("admin");
          }
        } else {
          const { error } = await res.json();
          window.alert("Error: " + error);
        }
      } catch (error) {
        console.error("Submission error:", error);
        window.alert("Something went wrong. Try again.");
      }
    } else {
      window.alert("You must be logged in to select a role.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Role
          </h1>
          <p className="text-gray-600">
            Select how you&apos;d like to use our art gallery platform
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
                  }`}
                  onClick={() => setValue("role", role.id)}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-2 relative">
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center ${
                          isSelected ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          className={`w-10 h-10 ${
                            isSelected ? "text-blue-600" : "text-gray-600"
                          }`}
                        />
                      </div>
                      <Badge
                        variant={isSelected ? "default" : "secondary"}
                        className="absolute -top-2 -right-2"
                      >
                        {role.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{role.title}</CardTitle>
                    <CardDescription className="text-base">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {role.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Hidden input registered with React Hook Form */}
          <input type="hidden" {...register("role")} />

          <div className="text-center">
            <RoleSubmit selectedRole={selectedRole} />
          </div>
        </form>
      </div>
    </div>
  );
}
