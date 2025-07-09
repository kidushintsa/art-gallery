import z from "zod";

export const formSchema = z.object({
  category: z.string().min(1, "Please select a complaint category"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});
