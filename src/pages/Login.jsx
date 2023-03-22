import {
  useNavigate,
  useLocation,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../api";

export async function action({ request }) {
  // native JS FormData Object
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);
  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    return data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

export default function Login() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const data = useActionData();

  const from = location.state?.from || "/host";
  console.log(data);

  if (data?.token) {
    navigate(from, { replace: true });
  }

  return (
    <div className="login-container">
      {location.state?.message && (
        <h3 className="login-first">{location.state.message}</h3>
      )}
      {data?.error && <h3 className="login-error">{data.error}</h3>}
      <h1>Sign in to your account</h1>
      <Form action="/login" method="post" className="login-form">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation?.state === "submitting"}>
          {navigation?.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
