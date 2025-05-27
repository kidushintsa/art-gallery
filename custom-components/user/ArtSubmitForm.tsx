"use client";

import { FieldValues, useForm } from "react-hook-form";

import React from "react";

const ArtSubmitForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4 p-4 border rounded-lg shadow"
    >
      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          {...register("category", { required: true, minLength: 3 })}
          className="w-full border p-2 rounded"
          placeholder="e.g. Abstract"
        />
        {errors.category?.type == "required" && (
          <p className="text-red-500 text-sm">Category is required</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium mb-1">Subject</label>
        <input
          {...register("subject", { required: true, minLength: 3 })}
          className="w-full border p-2 rounded"
          placeholder="e.g. Nature"
        />
        {errors.category?.type == "required" && (
          <p className="text-red-500 text-sm">subject is required</p>
        )}
        {errors.category?.type == "minLength" && (
          <p className="text-red-500 text-sm">
            must conatain atleat 3 character
          </p>
        )}
      </div>

      {/* Style */}
      <div>
        <label className="block text-sm font-medium mb-1">Style</label>
        <input
          {...register("style", { required: true, minLength: 3 })}
          className="w-full border p-2 rounded"
          placeholder="e.g. Modern"
        />
        {errors.style?.type == "required" && (
          <p className="text-red-500 text-sm">style is required</p>
        )}
        {errors.style?.type == "minLength" && (
          <p className="text-red-500 text-sm">
            must conatain atleat 3 character
          </p>
        )}
      </div>

      {/* Painted By */}
      <div>
        <label className="block text-sm font-medium mb-1">Painted By</label>
        <input
          {...register("paintedBy", { required: true, minLength: 1 })}
          className="w-full border p-2 rounded"
          placeholder="Artist Name"
        />
        {errors.paintedBy?.type == "required" && (
          <p className="text-red-500 text-sm">name is required</p>
        )}
      </div>

      {/* Material */}
      <div>
        <label className="block text-sm font-medium mb-1">Material</label>
        <input
          {...register("material", { required: true, minLength: 3 })}
          className="w-full border p-2 rounded"
          placeholder="e.g. Canvas"
        />
        {errors.material?.type == "required" && (
          <p className="text-red-500 text-sm">material is required</p>
        )}
        {errors.material?.type == "minLength" && (
          <p className="text-red-500 text-sm">
            must conatain atleat 3 character
          </p>
        )}
      </div>

      {/* Calendar */}
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          {...register("calendar", { required: true })}
          className="w-full border p-2 rounded"
        />
        {errors.calendar?.type == "required" && (
          <p className="text-red-500 text-sm">Date is required</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium mb-1">Price (ETB)</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true, required: true })}
          className="w-full border p-2 rounded"
          placeholder="e.g. 100"
        />
        {errors.price?.type == "required" && (
          <p className="text-red-500 text-sm">price is required</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register("description", { required: true, minLength: 10 })}
          className="w-full border p-2 rounded"
          rows={3}
          placeholder="Write something about the artwork..."
        />
        {errors.price?.type == "required" && (
          <p className="text-red-500 text-sm">price is required</p>
        )}
        {errors.price?.type == "minLength" && (
          <p className="text-red-500 text-sm">
            must contain atleast 10 character
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ArtSubmitForm;
