import './index.less';
import { getCodeImg, login } from '@/api/login';
import { LockOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Checkbox } from 'antd';
import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { encrypt } from '@/utils/jsencrypt';
import { userModel } from '@/store/modules/user';
import { useModel } from 'foca';
import { useNavigate } from 'react-router';

const LoginForm: FC = () => {
  const [captchaOnOff, setCaptchaOnOff] = useState<boolean>(true);
  const [codeUrl, setCodeUrl] = useState<string>('');
  const [, setLoading] = useState<boolean>(false);
  const userState = useModel(userModel);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  console.log(userModel, 'userModel');
  /**
   * 表单验证成功回调
   * @param form
   */
  const onFinished = async (values: any) => {
    console.log(form, values, 999);
    setLoading(values);
    if (values.rememberMe) {
      Cookies.set('username', values.username, { expires: 30 });
      Cookies.set('password', encrypt(values.password), { expires: 30 });
      Cookies.set('rememberMe', values.rememberMe, { expires: 30 });
    } else {
      Cookies.remove('username');
      Cookies.remove('password');
      Cookies.remove('rememberMe');
    }
    console.log(values, 111);
    // 调用action的登录方法
    userModel
      .getLogin(values)
      .then(() => {
        navigate('/index');
      })
      .catch(() => {
        setLoading(false);
        // 重新获取验证码
        if (captchaOnOff) {
          getCode();
        }
      });
  };

  const getCode = () => {
    getCodeImg().then((res: any) => {
      setCaptchaOnOff(res.captchaOnOff === undefined ? true : res.captchaOnOff);
      if (captchaOnOff) {
        setCodeUrl('data:image/gif;base64,' + res.img);
        console.log(res.uuid, 111);
        form.setFieldsValue({ uuid: res.uuid });
      }
    });
  };

  useEffect(() => {
    getCode();
  }, []);

  return (
    <div className="login-page">
      <Form
        onFinish={onFinished}
        form={form}
        className="login-page-form"
        initialValues={{
          username: 'admin',
          password: 'admin123',
          rememberMe: false,
          code: '',
          uuid: ''
        }}
      >
        <h2>react login</h2>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
          <Input placeholder="用户名" prefix={<UserOutlined />} size="large" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input.Password placeholder="密码" prefix={<LockOutlined />} size="large" />
        </Form.Item>
        <Form.Item name="code" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input
            placeholder="验证码"
            prefix={<SafetyOutlined />}
            size="large"
            maxLength={4}
            suffix={<img src={codeUrl} className="login-page-form_capatcha" alt="验证码" />}
          />
        </Form.Item>
        <Form.Item hidden={true} name="uuid" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input placeholder="uuid" prefix={<LockOutlined />} size="large" />
        </Form.Item>
        <Form.Item name="rememberMe" valuePropName="checked">
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" className="login-page-form_button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
