import React, { useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log("Form submitted with values: ", {
      username,
      password,
      rememberMe,
    });
  };

  return (
    <div>
        <div className="shadow-[0_2px_10px_0_rgb(25_93_194_/_7%)]
bg-white border border-[#e9eaf3] rounded-[30px] w-auto inline-block flex flex-col items-center md:justify-center gap-4 md:!w-[600px] p-[20px_36px]">
  <div className="mb-1 text-2xl font-bold text-center">欢迎回来</div>
</div>
    </div>
  );
};

export default Login;
