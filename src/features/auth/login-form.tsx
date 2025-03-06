import { Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import {
  LoginInput,
  loginInputSchema,
  loginWithEmailAndPassword,
} from "../../lib/auth";
import { FormItem } from "react-hook-form-antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginInputSchema),
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await loginWithEmailAndPassword(data as LoginInput);
      setError(false);
      navigate("/dashboard");
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  return (
    <Form
      name="login_form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit(onSubmit)}
      style={{
        maxWidth: "300px",
        height: "fit-content",
        margin: "0 auto",
        padding: "2rem 1rem",
        background: "#fff",
        borderRadius: "8px",
      }}
    >
      <FormItem control={control} name="email">
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </FormItem>
      <FormItem control={control} name="password">
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          style={{
            marginBottom: 0,
          }}
        />
      </FormItem>
      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        block
      >
        Log in
      </Button>
      {error && (
        <div style={{ marginTop: "0.5rem" }}>
          <p style={{ color: "red" }}>Invalid email or password</p>
        </div>
      )}
    </Form>
  );
};
