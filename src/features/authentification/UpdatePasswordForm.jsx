import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useState } from "react";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const [isUpdating, setIsUpdating] = useState(false);

  function onSubmit({ password }) {
    setIsUpdating(true);

    setTimeout(() => {
      console.log("Password updated:", password);
      reset();
      setIsUpdating(false);
    }, 1500); // Simulate a delay for UX
  }

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          size="medium"
          onClick={reset}
          type="reset"
          variation="secondary"
        >
          Cancel
        </Button>
        <Button variation="primary" size="medium" disabled={isUpdating}>
          Update password
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
