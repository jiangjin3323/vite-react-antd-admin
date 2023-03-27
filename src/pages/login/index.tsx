import React, { useState } from "react";
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../utils/request/api';
const Login: React.FC = () => {
  const Window: any = window;
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  let [account, setAccount]: [account: string, setAccount: any] = useState('');
  let [password, setPassword]: [password: string, setPassword: any] = useState('');

  const btnFunc = async () => {
    if (!Window.ethereum) return messageApi.warning("请安装MetaMask钱包后继续访问。");
    const addressRes: string[] = await Window.ethereum.enable();
    if (!addressRes) return;
    setPassword(addressRes[0]);
    loginFunc({ account, password: addressRes[0] });
  }

  const loginFunc = async (data: { account: string, password: string }) => {
    if (!data.password) return messageApi.warning("请输入MetaMask钱包地址");
    const [err, res]: any = await loginApi(data);
    if (err !== null) return messageApi.error(err.msg);
    sessionStorage.setItem('TOKEN', res.data.sign)
    dispatch({ type: 'SET_TOKEN', payload: res.data.sign });
    navigate('/');
  }

  return (
    <>
      {contextHolder}
      <div className="flex flex-col items-center justify-center w-screen px-2 py-8 md:h-screen bg-dashboard-neutral-200 dark:bg-gray-800 dark:text-white md:py-0 md:px-0">
        <div className="shadow-[0_2px_10px_0_rgb(25_93_194_/_7%)] bg-white border border-[#e9eaf3] rounded-[30px] w-auto inline-block flex flex-col items-center md:justify-center gap-4 md:!w-[600px] p-[20px_36px]">
          <div className="mb-1 text-2xl font-bold text-center">欢迎回来</div>
          <div className="mb-1 text-sm text-center text-dashboard-neutral-600">Next 官网管理后台 </div>
          <div className="relative w-full">
            <div className="flex flex-col gap-2.5 w-full">
              <input
                value={account}
                onChange={e => {
                  setAccount(e.target.value);
                }}
                className="p-4 text-sm transition-all duration-300 ease-in-out bg-white border border-gray-300 outline-none placeholder:text-dashboard-neutral-500 ring-0 shadow-[0_2px_12px_0_rgb(11_22_44_/_5%)] rounded-[52px] hover:border-dashboard-neutral-500 hover:border hover:shadow-[0_2px_12px_0_rgb(11_22_44_/_10%)] focus:border-dashboard-primary focus:text-dashboard-neutral-800 " type="text" placeholder="请输入您的账号" />
            </div>
            <button onClick={btnFunc} className="mt-5 rounded-full shadow-[0_2px_10px_0_rgb(25_93_194_/_7%)] border text-white border-[#e9eaf3] hover:scale-110 px-6 py-4 text-md bg-[#1476ff] hover:bg-[#004cff] flex justify-center items-center transition-all duration-300 ease-in-out flex justify-center w-full gap-2">
              登陆
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default Login;
