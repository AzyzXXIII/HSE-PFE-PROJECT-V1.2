import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Checkbox from "../../ui/Checkbox";

function SignupForm({ onCreateUser }) {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setValue,
  } = useForm({ mode: "onTouched" });

  const [qrCode, setQrCode] = useState("");

  function onSubmit(data) {
    const userData = {
      ...data,
      qrCode,
      approved: false,
      permissions: data.permissions || {},
    };

    onCreateUser?.(userData);
    resetForm();
  }

  function generateQRCode() {
    const email = getValues("email");
    if (!email) return alert("Please enter an email first.");

    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      email
    )}`;
    setQrCode(qrCodeURL);
    setValue("qrCode", qrCodeURL);
  }

  function resetForm() {
    reset();
    setQrCode("");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full Name" error={errors.fullName?.message}>
        <Input
          type="text"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email Address" error={errors.email?.message}>
        <Input
          type="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 8, message: "Minimum 8 characters required" },
          })}
        />
      </FormRow>

      <FormRow label="Confirm Password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
        />
      </FormRow>

      <FormRow label="Role" error={errors.role?.message}>
        <Select
          {...register("role", { required: "Please select a role" })}
          options={[
            { value: "", label: "Select Role" },
            { value: "admin", label: "Admin" },
            { value: "supervisor", label: "Supervisor" },
            { value: "inspector", label: "Inspector" },
          ]}
        />
      </FormRow>

      <FormRow label="Assign Permissions">
        <Checkbox id="canApprove" {...register("permissions.canApprove")}>
          Approve Reports
        </Checkbox>
        <Checkbox id="canEdit" {...register("permissions.canEdit")}>
          Edit Reports
        </Checkbox>
        <Checkbox id="canDelete" {...register("permissions.canDelete")}>
          Delete Reports
        </Checkbox>
        <Checkbox
          id="canViewDashboard"
          {...register("permissions.canViewDashboard")}
        >
          View Dashboard
        </Checkbox>
      </FormRow>

      <FormRow label="QR Code">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Input type="text" disabled value={qrCode} {...register("qrCode")} />
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

      <FormRow>
        <Button
          $variation="secondary"
          $size="medium"
          type="reset"
          onClick={resetForm}
        >
          Cancel
        </Button>
        <Button $variation="primary" $size="medium" type="submit">
          Create New User
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
