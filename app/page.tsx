// // import ProfileForm from "@/custom-components/setting/ProfileForm";
// // import ArtCardGrid from "@/custom-components/user/ArtCardGrid";
// import ArtSubmitForm from "@/custom-components/user/ArtSubmitForm";
// // import Hero from "@/custom-components/user/Hero";
// export default function Home() {
//   return (
//     <>
//       {/* <Hero />console.log('Rendering Home component');
//       <header className="ps-3 pt-4 font-semibold font-serif">
//         <h1>Discover Art You Love From the Local</h1>
//         <h1>Leading Online Gallery</h1>
//       </header>
//       <ArtCardGrid /> */}
//       {/* <div className="flex flex-col">
//         {NavLinkData.map(({ name, href, children }) => (
//           <AdminNavLink key={name} name={name} href={href}>
//             {children}
//           </AdminNavLink>
//         ))}
//       </div> */}
//       {/* <Admin /> */}
//       {/* <Hero /> */}
//       {/* //the data inside the art card is demo data, in production the real data inside the card comes from backend */}
//       {/* <ArtCardGrid /> */}
//       {/* <ArtSubmitForm /> */}
//     </>
//   );
// }

"use client";

import { type FieldValues, useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ArtworkSubmissionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-medium text-gray-900">
            Artwork management
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Artwork Image */}
          <div className="flex justify-center">
            <div className="w-80 h-96 py-2 shadow-lg border border-gray-700 bg-indigo-400 rounded-lg overflow-hidden">
              <Image
                src="/images/img1.jpg"
                alt="Spirits of the Women artwork"
                width={320}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-indigo-500 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Spirits of the Women
                </h2>
                <div className="size-40 overflow-hidden">
                  <img
                    src="/images/img1.jpg"
                    alt="Artist profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Category
                  </label>
                  <input
                    {...register("category", { required: true, minLength: 3 })}
                    className="w-full border border-gray-300 p-2 rounded bg-white text-sm"
                    placeholder="e.g. Painting"
                    defaultValue="Painting"
                  />
                  {errors.category?.type === "required" && (
                    <p className="text-red-600 text-xs mt-1">
                      Category is required
                    </p>
                  )}
                  {errors.category?.type === "minLength" && (
                    <p className="text-red-600 text-xs mt-1">
                      Must contain at least 3 characters
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Subject
                  </label>
                  <input
                    {...register("subject", { required: true, minLength: 3 })}
                    className="w-full border border-gray-300 p-2 rounded bg-white text-sm"
                    placeholder="e.g. Cultural"
                    defaultValue="Cultural"
                  />
                  {errors.subject?.type === "required" && (
                    <p className="text-red-600 text-xs mt-1">
                      Subject is required
                    </p>
                  )}
                  {errors.subject?.type === "minLength" && (
                    <p className="text-red-600 text-xs mt-1">
                      Must contain at least 3 characters
                    </p>
                  )}
                </div>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Style
                </label>
                <input
                  {...register("style", { required: true, minLength: 3 })}
                  className="w-full border border-gray-300 p-2 rounded bg-white text-sm"
                  placeholder="e.g. Traditional"
                  defaultValue="Traditional"
                />
                {errors.style?.type === "required" && (
                  <p className="text-red-600 text-xs mt-1">Style is required</p>
                )}
                {errors.style?.type === "minLength" && (
                  <p className="text-red-600 text-xs mt-1">
                    Must contain at least 3 characters
                  </p>
                )}
              </div>

              {/* Painted By */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Painted by
                </label>
                <input
                  {...register("paintedBy", { required: true, minLength: 1 })}
                  className="w-full border border-gray-300 p-2 rounded bg-white text-sm"
                  placeholder="Artist Name"
                  defaultValue="Kelas Abdoune"
                />
                {errors.paintedBy?.type === "required" && (
                  <p className="text-red-600 text-xs mt-1">
                    Artist name is required
                  </p>
                )}
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Material
                </label>
                <input
                  {...register("material", { required: true, minLength: 3 })}
                  className="w-full border border-gray-300 p-2 rounded bg-white text-sm"
                  placeholder="e.g. Canvas"
                  defaultValue="Canvas"
                />
                {errors.material?.type === "required" && (
                  <p className="text-red-600 text-xs mt-1">
                    Material is required
                  </p>
                )}
                {errors.material?.type === "minLength" && (
                  <p className="text-red-600 text-xs mt-1">
                    Must contain at least 3 characters
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Calendar */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Calendar
                  </label>
                  <input
                    type="date"
                    {...register("calendar", { required: true })}
                    className="w-full border border-gray-300 p-2 rounded bg-white text-sm"
                    defaultValue="2024-09-12"
                  />
                  {errors.calendar?.type === "required" && (
                    <p className="text-red-600 text-xs mt-1">
                      Date is required
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Price
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", {
                        valueAsNumber: true,
                        required: true,
                      })}
                      className="w-full border border-gray-300 p-2 rounded bg-white text-sm pr-12"
                      placeholder="50,000"
                      defaultValue="50000"
                    />
                    <span className="absolute right-3 top-2 text-sm text-gray-600">
                      ETB
                    </span>
                  </div>
                  {errors.price?.type === "required" && (
                    <p className="text-red-600 text-xs mt-1">
                      Price is required
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: true,
                    minLength: 10,
                  })}
                  className="w-full border border-gray-300 p-2 rounded bg-white text-sm"
                  rows={3}
                  placeholder="Write something about the artwork..."
                  defaultValue="This powerful artwork celebrates the strength and resilience of women throughout history."
                />
                {errors.description?.type === "required" && (
                  <p className="text-neutral-300 text-xs mt-1">
                    Description is required
                  </p>
                )}
                {errors.description?.type === "minLength" && (
                  <p className="text-pink-400 font-bold text-xs mt-1">
                    Must contain at least 10 characters
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-500 cursor-pointer text-white font-medium py-2 px-4 rounded"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkSubmissionForm;
