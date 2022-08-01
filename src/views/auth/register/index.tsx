import './index.less';
import { getCodeImg, login } from '@/api/login';
import { LockOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Checkbox } from 'antd';
import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { encrypt } from '@/utils/jsencrypt';
import { setToken } from '@/utils/auth';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router';

const initialValues: any = {
  username: 'admin',
  password: 'admin123',
  rememberMe: false,
  code: '',
  uuid: ''
};

const ReigsterForm: FC = () => {
  const [captchaOnOff, setCaptchaOnOff] = useState<boolean>(true);
  const [codeUrl, setCodeUrl] = useState<string>('');
  const [, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  /**
   * 表单验证成功回调
   * @param form
   */
  const onFinished = async (form: any) => {
    setLoading(true);
    if (form.rememberMe) {
      Cookies.set('username', form.username, { expires: 30 });
      Cookies.set('password', encrypt(form.password), { expires: 30 });
      Cookies.set('rememberMe', form.rememberMe, { expires: 30 });
    } else {
      Cookies.remove('username');
      Cookies.remove('password');
      Cookies.remove('rememberMe');
    }
    // login(form.username, form.password, form.code, form.uuid).then((res: any) => {
    //   setToken(res.token);
    //   setTokenState(res.token);
    //   navigate('/index');
    // });
  };

  const getCode = () => {
    getCodeImg().then((res: any) => {
      setCaptchaOnOff(res.captchaOnOff === undefined ? true : res.captchaOnOff);
      if (captchaOnOff) {
        setCodeUrl('data:image/gif;base64,' + res.img);
        initialValues.uuid = res.uuid;
      }
    });
  };

  useEffect(() => {
    getCode();
  }, []);

  return (
    <div className="login-page">
      <Form onFinish={onFinished} className="login-page-form" initialValues={initialValues}>
        <h2>react login</h2>
        <Form.Item name="initialValues" rules={[{ required: true, message: '请输入用户名！' }]}>
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

export default ReigsterForm;
