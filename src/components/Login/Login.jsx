import { Form, Input, Button } from "antd";
import axios from "axios";

export default function Login({ notify }) {
  const [form] = Form.useForm();
  const apiURL = process.env.REACT_APP_DB_URL + "/auth/login";

  const loginUser = () => {
    form.validateFields().then((values) => {
      console.log("Form data:", values);
      const loginData = {
        email: values.email,
        password: values.password,
        requiredRole: "TEACHER",
      };
      axios
        .post(
          apiURL,
          loginData
        )
        .then((res) => {
          console.log("User logged in:", res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          window.location.reload();
        });
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[40%] h-[50%] bg-slate-100 rounded-2xl shadow-lg p-8">
        <div className="w-full flex items-center justify-center h-[25%] text-3xl font-semibold mb-4">
          Scaler Campus Teacher
        </div>
        <Form
          form={form}
          className="h-full w-full"
          layout="vertical"
          onFinish={loginUser}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              type="email"
              placeholder="Email"
              className="rounded-xl pl-3"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="rounded-xl pl-3"
            />
          </Form.Item>

          <Form.Item className="loginBtn w-full flex items-center justify-center mt-6">
            <Button
              type="primary"
              htmlType="submit"
              className="w-[80%] h-[50%] rounded-xl bg-slate-700 text-slate-100 font-semibold"
              //   onClick={loginUser}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
