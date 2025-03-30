import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Checkbox from "../../ui/Checkbox";

function CreateEmployeeForm({
  employeeToEdit = {},
  onCloseModal,
  setEmployees,
}) {
  const isEditSession = Boolean(employeeToEdit?.id);
  const { id: editId, ...editValues } = employeeToEdit || {};

  const { register, handleSubmit, reset, setValue, getValues, formState } =
    useForm({
      defaultValues: isEditSession
        ? editValues
        : {
            approved: false,
            canSendReports: false,
            canEditReports: false,
            canDeleteReports: false,
          },
    });

  const { errors } = formState;

  function onSubmit(data) {
    const newEmployeeData = {
      id: isEditSession ? editId : Date.now(),
      ...data,
      qrCode: getValues("qrCode"),
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

      <FormRow label="Approval Status">
        <Checkbox id="approved" {...register("approved")}>
          Approved
        </Checkbox>
      </FormRow>

      <FormRow label="Permissions">
        <Checkbox id="canSendReports" {...register("canSendReports")}>
          Can Send Reports
        </Checkbox>
        <Checkbox id="canEditReports" {...register("canEditReports")}>
          Can Edit Reports
        </Checkbox>
        <Checkbox id="canDeleteReports" {...register("canDeleteReports")}>
          Can Delete Reports
        </Checkbox>
      </FormRow>

      <FormRow label="QR Code">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Input type="text" id="qrCode" disabled {...register("qrCode")} />
          <Button
            $variation="primary"
            $size="medium"
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
          $variation="secondary"
          $size="medium"
          type="reset"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button $variation="primary" $size="medium" type="submit">
          {isEditSession ? "Edit Employee" : "Create Employee"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEmployeeForm;
