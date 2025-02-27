import { Input } from "~/components/ui/input";
import { data, Form, redirect, useFetcher, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/loginRoute";
import axios from "axios";
import api from "~/lib/api";
import { setAuth } from "~/lib/localStorage";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const pass = formData.get("password");
  const confirmPass = formData.get("confirm-password");

  try {
    const response = await api.post(`${process.env.API_KEY}/user/login`, {
      credentials: {
        email: email,
        password: pass,
      },
    });

    console.log("Login successful:", response.data);
    const { token, userId } = response.data.session_token;
    if (typeof window !== "undefined") {
      setAuth(token, userId);
    }
    return redirect("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    // Handle error appropriately
    return { error: "Login failed. Please try again." };
  }
}

export default function LoginRoute() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  let errors = fetcher.data?.errors;
  return (
    <fetcher.Form
      method="post"
      className="bg-custom-postcard-white w-full md:w-3/5 p-8 shadow-lg rounded-md"
    >
      <div className="flex flex-col items-center">
        <Input
          className="bg-slate-50 mb-6"
          type="email"
          name="email"
          placeholder="Email Address"
        ></Input>
        <Input
          className="bg-slate-50"
          type="password"
          name="password"
          placeholder="Password"
        ></Input>

        <div className="mt-4">
          <Button
            variant="link"
            className="font-semibold text-lasalle-green text-base"
            type="button"
          >
            Forgot Password?
          </Button>
          <Button
            variant="link"
            className="font-semibold text-lasalle-green text-base"
            type="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Don't have an account?
          </Button>
        </div>
      </div>
      <hr className="-mx-8" />
      <Button
        className="text-white w-full rounded-3xl mt-6 bg-lasalle-green text-lg h-12"
        type="submit"
      >
        Login
      </Button>
    </fetcher.Form>
  );
}
