import { Input, Button, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { LoginInput, loginInputSchema, useLogin } from '../../lib/auth';
import { FormItem } from 'react-hook-form-antd';
import { zodResolver } from '@hookform/resolvers/zod';

interface LoginFormInputs {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const { control, handleSubmit } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginInputSchema)
    });
    const { mutate: login } = useLogin();

    const onSubmit = async (data: LoginFormInputs) => {
        login(data as LoginInput);
    };

    return (
        <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={handleSubmit(onSubmit)}
            style={{ maxWidth: '300px', height: 'fit-content', margin: '0 auto', padding: '2rem 1rem', background: '#fff', borderRadius: '8px' }}
        >
            <FormItem control={control} name="email">
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </FormItem>
            <FormItem control={control} name="password">
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
                Log in
            </Button>
        </Form>
    );
};
