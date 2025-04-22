import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Checkbox from "../../ui/Checkbox";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function CreateEmployeeForm({ employeeToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(employeeToEdit?.id);
  const { id: editId, ...editValues } = employeeToEdit;
  const queryClient = useQueryClient();

  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: () => axios.get("/api/users/roles").then((res) => res.data),
  });

  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: () => axios.get("/api/users/locations").then((res) => res.data),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      titleId: "",
      departmentId: "",
      status: "",
      can_send_reports: false,
      can_edit_reports: false,
      can_delete_reports: false,
      qr_code: "",
    },
  });

  useEffect(() => {
    if (isEditSession) {
      Object.entries(editValues).forEach(([key, value]) => {
        const formattedValue =
          ["titleId", "departmentId"].includes(key) && value !== null
            ? String(value)
            : value ?? "";
        setValue(key, formattedValue);
      });
    }
  }, [editValues, isEditSession, setValue]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = isEditSession
        ? await axios.put(`/api/users/${editId}`, data)
        : await axios.post("/api/users", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success(
        `Employee ${isEditSession ? "updated" : "created"} successfully`
      );
      queryClient.invalidateQueries(["employees"]);
      reset();
      onCloseModal?.();
    },
    onError: () => toast.error("Something went wrong"),
  });

  const onSubmit = (data) => {
    mutation.mutate({
      ...data,
      titleId: data.titleId ? Number(data.titleId) : null,
      departmentId: data.departmentId ? Number(data.departmentId) : null,
      qr_code: getValues("qr_code"),
    });
  };

  const generateQRCode = () => {
    const qrData = getValues("email") || "employee-qr";
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      qrData
    )}`;
    setValue("qr_code", qrCodeURL);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="First Name" error={errors?.firstName?.message}>
        <Input
          type="text"
          id="first_name"
          {...register("firstName", { required: "Required" })}
        />
      </FormRow>

      <FormRow label="Last Name" error={errors?.lastName?.message}>
        <Input
          type="text"
          id="last_name"
          {...register("lastName", { required: "Required" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", { required: "Required" })}
        />
      </FormRow>

      {!isEditSession && (
        <FormRow label="Password" error={errors?.password?.message}>
          <Input
            type="password"
            id="password"
            {...register("password", { required: "Required" })}
          />
        </FormRow>
      )}

      <FormRow label="Phone">
        <Input type="text" id="phone" {...register("phone")} />
      </FormRow>

      <FormRow label="Role">
        <select id="role_id" {...register("titleId")}>
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.role_name}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Location">
        <select id="location_id" {...register("departmentId")}>
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </FormRow>

      <FormRow label="Status">
        <Input type="text" id="status" {...register("status")} />
      </FormRow>

      <FormRow label="Permissions">
        <Checkbox id="can_send_reports" {...register("can_send_reports")}>
          Send Reports
        </Checkbox>
        <Checkbox id="can_edit_reports" {...register("can_edit_reports")}>
          Edit Reports
        </Checkbox>
        <Checkbox id="can_delete_reports" {...register("can_delete_reports")}>
          Delete Reports
        </Checkbox>
      </FormRow>

      <FormRow label="QR Code">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Input type="text" id="qr_code" disabled {...register("qr_code")} />
          <Button
            $variation="primary"
            $size="medium"
            type="button"
            onClick={generateQRCode}
          >
            Generate
          </Button>
        </div>
      </FormRow>

      <FormRow
        style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
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
          {isEditSession ? "Update" : "Create"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEmployeeForm;
