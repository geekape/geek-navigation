import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {Alert, Space, message, Tabs} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormCaptcha, ProFormCheckbox, ProFormText} from '@ant-design/pro-form';
import {Link, history, useModel} from 'umi';
import Footer from '@/components/Footer';
import styles from './index.less';
import {login} from "@/services/api";
import {setPersistenceData} from "@/utils/persistence";
import {CURRENT_USER, TOKEN} from "@/constants";


const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const {query} = history.location;
    const {redirect} = query as {
      redirect: string;
    };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const {initialState, setInitialState} = useModel('@@initialState');


  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);

    try {
      // 登录
      const res: any = await login({username: values.username as string, password: values.password as string});

      if (res?.data) {
        const defaultloginSuccessMessage = '登录成功！';
        message.success(defaultloginSuccessMessage);
        setInitialState({
          currentUser: {
            name: values.username,
            access: 'admin',
          }
        })
        goto();
        setPersistenceData(TOKEN, res.data)
        setPersistenceData(CURRENT_USER, { name: values.username })
        return;
      } // 如果失败去设置用户错误信息

      message.error(res?.msg)
    } catch (error) {
      const defaultloginFailureMessage = '登录失败，请重试！';
      message.error(defaultloginFailureMessage);
    }

    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo-icon.png"/>
              <span className={styles.title}>极客猿导航</span>
            </Link>
          </div>
          <div className={styles.desc}>{'极客猿导航 是一个专注独立开发的资源导航平台'}</div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values as API.LoginParams);
            }}
          >


            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>

          </ProForm>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
