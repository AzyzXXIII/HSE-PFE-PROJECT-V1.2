import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Select from "../../ui/Select";
import { useEditEmployee } from "../../hooks/Users/useEditEmployee";

function CreateEmployeeForm({ employeeToEdit = {}, onCloseModal }) {
  const isEditSession = Boolean(employeeToEdit?.id);
  const queryClient = useQueryClient();
  const editId = employeeToEdit?.id;

  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: () => axios.get("/api/users/roles").then((res) => res.data),
  });

  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: () => axios.get("/api/users/locations").then((res) => res.data),
  });

  const { data: accessGroups = [] } = useQuery({
    queryKey: ["access-groups"],
    queryFn: () =>
      axios.get("/api/users/access-groups").then((res) => res.data),
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
      firstName: employeeToEdit.firstName || "",
      lastName: employeeToEdit.lastName || "",
      email: employeeToEdit.email || "",
      password: "",
      phone: employeeToEdit.phone || "",
      titleId: employeeToEdit.role ? String(employeeToEdit.role) : "",
      departmentId: employeeToEdit.location
        ? String(employeeToEdit.location)
        : "",
      status: employeeToEdit.status || "",
      qr_code: employeeToEdit.qr_code || "",
      access_group_id: employeeToEdit.access_group_id
        ? String(employeeToEdit.access_group_id)
        : "",
    },
  });

  useEffect(() => {
    if (isEditSession) {
      reset({
        firstName: employeeToEdit.firstName || "",
        lastName: employeeToEdit.lastName || "",
        email: employeeToEdit.email || "",
        password: "",
        phone: employeeToEdit.phone || "",
        titleId: employeeToEdit.role ? String(employeeToEdit.role) : "",
        departmentId: employeeToEdit.location
          ? String(employeeToEdit.location)
          : "",
        status: employeeToEdit.status || "",
        qr_code: employeeToEdit.qr_code || "",
        access_group_id: employeeToEdit.access_group_id
          ? String(employeeToEdit.access_group_id)
          : "",
      });
    }
  }, [isEditSession, employeeToEdit, reset]);

  const mutationCreate = useMutation({
    mutationFn: (data) =>
      axios.post("/api/users", data).then((res) => res.data),
    onSuccess: () => {
      toast.success("Employee created successfully");
      queryClient.invalidateQueries(["employees"]);
      reset();
      onCloseModal?.();
    },
    onError: () => toast.error("Error creating employee"),
  });

  const editMutation = useEditEmployee();

  const onSubmit = (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: isEditSession ? "" : data.password,
      phone: data.phone,
      titleId: data.titleId
        ? Number(data.titleId)
        : employeeToEdit.role || null,
      departmentId: data.departmentId
        ? Number(data.departmentId)
        : employeeToEdit.location || null,
      status: data.status,
      qr_code: getValues("qr_code"),
      access_group_id: data.access_group_id
        ? Number(data.access_group_id)
        : employeeToEdit.access_group_id || null,
    };

    if (isEditSession) {
      editMutation.mutate(
        { id: editId, data: payload },
        {
          onSuccess: () => {
            toast.success("Employee updated successfully");
            queryClient.invalidateQueries(["employees"]);
            reset();
            onCloseModal?.();
          },
          onError: () => toast.error("Error updating employee"),
        }
      );
    } else {
      mutationCreate.mutate(payload);
    }
  };

  const generateQRCode = () => {
    const email = getValues("email") || "employee-qr";
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      email
    )}`;
    setValue("qr_code", qrURL);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="First Name" error={errors?.firstName?.message}>
        <Input
          type="text"
          {...register("firstName", { required: "Required" })}
        />
      </FormRow>

      <FormRow label="Last Name" error={errors?.lastName?.message}>
        <Input
          type="text"
          {...register("lastName", { required: "Required" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input type="email" {...register("email", { required: "Required" })} />
      </FormRow>

      {!isEditSession && (
        <FormRow label="Password" error={errors?.password?.message}>
          <Input
            type="password"
            {...register("password", { required: "Required" })}
          />
        </FormRow>
      )}

      <FormRow label="Phone">
        <Input type="text" {...register("phone")} />
      </FormRow>

      <FormRow label="Choose a Role">
        <Select
          options={[
            { value: "", label: "Select Role" }, // Fixed default option
            ...roles.map((r) => ({
              value: String(r.id),
              label: r.role_name,
            })),
          ]}
          {...register("titleId")} // Uses register instead of manual value/onChange
        />
      </FormRow>

      <FormRow label="Location">
        <Select
          options={[
            { value: "", label: "Select Location" },
            ...locations.map((l) => ({
              value: String(l.id),
              label: l.name,
            })),
          ]}
          {...register("departmentId")} // Uses register
        />
      </FormRow>

      <FormRow label="Status">
        <Input type="text" {...register("status")} />
      </FormRow>

      <FormRow label="Access Group">
        <Select
          options={[
            { value: "", label: "Select Access Group" },
            ...accessGroups.map((g) => ({
              value: String(g.id),
              label: g.name,
            })),
          ]}
          {...register("access_group_id")} // Uses register
        />
      </FormRow>

      <FormRow label="QR Code">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Input type="text" disabled {...register("qr_code")} />
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
          type="reset"
          onClick={onCloseModal}
          $variation="secondary"
          $size="medium"
        >
          Cancel
        </Button>
        <Button type="submit" $size="medium" $variation="primary">
          {isEditSession ? "Update" : "Create"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEmployeeForm;
