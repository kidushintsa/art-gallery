import { roles } from "@/entities/roles";
import { ArrowRight } from "lucide-react";
const RoleSubmit = ({ selectedRole }: { selectedRole: string }) => {
  return (
    <button
      type="submit"
      disabled={!selectedRole}
      className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Continue as{" "}
      {selectedRole && roles.find((r) => r.id === selectedRole)?.title}
      <ArrowRight className="ml-2 w-4 h-4" />
    </button>
  );
};

export default RoleSubmit;
