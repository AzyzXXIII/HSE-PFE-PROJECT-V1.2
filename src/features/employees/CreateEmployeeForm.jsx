import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";

function CreateEmployeeForm({
  employeeToEdit = {},
  onCloseModal,
  setEmployees,
}) {
  const isEditSession = Boolean(employeeToEdit?.id);
  const { id: editId, ...editValues } = employeeToEdit;

  const { register, handleSubmit, reset, setValue, formState, getValues } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });

  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const qrCode =
      typeof data.qrCode === "string" ? data.qrCode : data.qrCode[0];

    const newEmployeeData = {
      id: isEditSession ? editId : Date.now(), // Mock ID for new employees
      ...data,
      image,
      qrCode,
    };

    setEmployees((prev) =>
      isEditSession
        ? prev.map((emp) => (emp.id === editId ? newEmployeeData : emp))
        : [...prev, newEmployeeData]
    );

    reset();
    onCloseModal?.();
  }

  function generateQRCode() {
    const qrData = getValues("username") || "default-qr-data";
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      qrData
    )}`;
    setValue("qrCode", qrCodeURL);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Username" error={errors?.username?.message}>
        <Input
          type="text"
          id="username"
          {...register("username", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", { required: "Invalid email address" })}
        />
      </FormRow>

      <FormRow label="Phone" error={errors?.phone?.message}>
        <Input
          type="tel"
          id="phone"
          {...register("phone", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Address" error={errors?.address?.message}>
        <Input
          type="text"
          id="address"
          {...register("address", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Job Title">
        <Input type="text" id="titleId" {...register("titleId")} />
      </FormRow>

      <FormRow label="Department">
        <Input type="text" id="departmentId" {...register("departmentId")} />
      </FormRow>

      <FormRow label="QR Code">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Input type="text" id="qrCode" disabled {...register("qrCode")} />
          <Button
            variation="primary"
            size="medium"
            type="button"
            onClick={generateQRCode}
          >
            Generate QR Code
          </Button>
        </div>
      </FormRow>

      <FormRow
        style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
      >
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          variation="primary"
          size="medium"
          type="submit"
          onClick={() => {
            console.log("clicked");
          }}
        >
          {isEditSession ? "Edit Employee" : "Create Employee"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEmployeeForm;
