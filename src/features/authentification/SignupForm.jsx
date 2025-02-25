import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password, role }) {
    console.log({ fullName, email, password, role });
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      {/* New Role Selection Field */}
      <FormRow label="Select User Role" error={errors?.role?.message}>
        <Select
          {...register("role", { required: "This field is required" })}
          options={[
            { value: "", label: "Select Role" },
            { value: "admin", label: "Admin" },
            { value: "inspector", label: "Inspector" },
          ]}
        />
      </FormRow>

      <FormRow>
        <Button
          $size="medium"
          $variation="secondary"
          type="reset"
          onClick={reset}
        >
          Cancel
        </Button>
        <Button $size="medium" $variation="primary">
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
