import Input from "../../../../components/Input";
import Label from "../../../../components/Label";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from "react-toastify";
import { AuthService } from "../../../../services/authService";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .required("Confirm Password is required")
    .oneOf([yup.ref('password')], "Passwords must match"),
});

export type RegisterForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
}

function Register({
  handleSignInClick
}: {
  handleSignInClick: () => void
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...values } = data;
      const res = await AuthService.register(values)
      if (res.data.accessToken) {
        toast.success(res.data.msg)
        handleSignInClick();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
      <Label required>Full Name</Label>
      <Input
        type='text'
        {...register('fullName')}
        errorMessage={errors.fullName?.message}
      />

      <Label required>Email</Label>
      <Input
        type='email'
        {...register('email')}
        errorMessage={errors.email?.message}
      />

      <Label required>Password</Label>
      <Input
        type='password'
        {...register('password')}
        errorMessage={errors.password?.message}
      />

      <Label required>Confirm Password</Label>
      <Input
        type='password'
        {...register('confirmPassword')}
        errorMessage={errors.confirmPassword?.message}
      />

      <button type='submit'>Sign Up</button>
    </form>
  );
}

export default Register;
