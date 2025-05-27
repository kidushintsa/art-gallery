import ProfileForm from "@/custom-components/setting/ProfileForm";
import SettingFooter from "@/custom-components/setting/SettingFooter";
import { PencilLine } from "lucide-react";
import React from "react";
const page = () => {
  return (
    <div className="p-7">
      <div className="w-[30%] border p-3 bg-gray-100">
        <section className="flex border border-indigo-600 mb-2 items-center">
          <div className="size-16 bg-gray-300 rounded-full grid place-items-end">
            <span className="size-7 rounded-full bg-white grid place-items-center">
              <PencilLine
                className="
            text-gray-500"
                size={20}
              />
            </span>
          </div>
          <section className="border ms-3">
            <h2>Your name</h2>
            <h2 className="text-gray-500">yourname@gmail.com</h2>
          </section>
        </section>
        <ProfileForm />
      </div>
      <section className="flex justify-end pe-10">
        <SettingFooter />
      </section>
    </div>
  );
};

export default page;
