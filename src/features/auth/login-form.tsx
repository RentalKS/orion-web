import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import 'antd/dist/reset.css';

interface LoginFormInputs {
    username: string;
    password: string;
    remember: boolean;
}

export const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const onSubmit = (data: LoginFormInputs) => {
        console.log(data);
    };

    return (
        <Form
            name="login_form"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handleSubmit(onSubmit)}
            style={{ maxWidth: '300px', margin: '0 auto', padding: '2rem 1rem', background: '#fff', borderRadius: '8px' }}
        >
            <Form.Item
                validateStatus={errors.username ? 'error' : ''}
                help={errors.username ? errors.username.message : ''}
            >
                <Input
                    {...register('username')}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>

            <Form.Item
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password ? errors.password.message : ''}
            >
                <Input.Password
                    {...register('password')}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Checkbox {...register('remember')}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};
