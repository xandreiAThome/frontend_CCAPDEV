import { Ellipsis, Facebook, Images, Instagram, Linkedin } from "lucide-react";
import { Form, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import Logo from "~/components/assets/logo.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Route } from "./+types/accountSetupRoute";
import api from "~/lib/api";
import axios from "axios";
import { useState } from "react";
import type { ImageListType } from "react-images-uploading";
import UploadProfile from "~/components/imageComponents/uploadProfileComponent";

export async function action({ request }: Route.ActionArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  console.log("Token from URL:", token);

  const formData = await request.formData();

  const reqBody = {
    info: {
      name: {
        first: formData.get("first"),
        last: formData.get("last"),
      },
      username: formData.get("username"),
      batchid: formData.get("batchId"),
      program: formData.get("program"),
      bio: formData.get("bio"),
    },
  };

  console.log(reqBody);

  try {
    // Send to your API endpoint
    const response = await api.post(
      `${process.env.API_KEY}/user/setup`,
      reqBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", response.data);

    return redirect("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(" error:", error);
    } else {
      console.log("Unexpected error:", error);
    }
  }
}

// TODO: setup the input names and values
//       Make page responsive

export default function AccountSetup() {
  const [img, setImg] = useState<ImageListType>([]);

  return (
    <div className="flex h-full bg-custom-bg-white justify-around">
      <div className="max-w-96 flex-col items-baseline justify-between hidden md:flex p-6">
        <img src={Logo} alt="logo" className="h-16" />
        <div>
          <h1 className="text-2xl text-lasalle-dark-green font-bold">
            setup your account!
          </h1>
          <p className="text-2xl text-lasalle-green">
            let other archers know who they're dealing with.
          </p>
        </div>
        <div>
          <h1 className="text-2xl text-lasalle-dark-green font-bold">
            invest in yourself!
          </h1>
          <p className="text-2xl text-lasalle-green">
            have an archive of the things you did during your time in
            univeristy!
          </p>
        </div>
      </div>

      <main className="basis-[640px] flex justify-center py-6">
        <Form
          method="post"
          className="h-full w-full bg-custom-postcard-white flex flex-col"
        >
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
            <button type="button" className="flex gap-1 text-lasalle-green">
              <Images className="text-lasalle-green" />
              <p className="font-semibold text-lasalle-green">
                Add Cover Photo
              </p>
            </button>
          </div>
          <div className="pb-6">
            <div className="relative flex p-6">
              {/* <UploadProfile images={img} setImages={setImg}></UploadProfile> */}
              <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-gray-300 m-4 border-custom-bg-white border-4 absolute left-0 -top-20 flex justify-center items-center">
                <button type="button" className="flex flex-col items-center">
                  <Images className="text-lasalle-green"></Images>
                  <p className="text-lasalle-green font-bold">
                    + Display Photo{" "}
                  </p>
                </button>
              </div>

              <div className="pl-36 flex flex-col flex-1">
                <div className="flex justify-between">
                  <p className="text-custom-text-black">
                    Basic Account Information
                  </p>

                  <button type="button">
                    <Ellipsis
                      className="text-custom-text-black"
                      size={24}
                    ></Ellipsis>
                  </button>
                </div>

                <div className="flex flex-col gap-2 flex-1 max-w-80">
                  <Input
                    placeholder="@username"
                    className="bg-slate-100"
                    name="username"
                    required
                  />
                  <Input
                    name="bio"
                    placeholder="Bio"
                    className="bg-slate-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col px-12 pb-2">
              <p className="text-custom-text-black">
                About <span className="font-bold">YOU!</span> Ipakita mo kung
                sino ka.
              </p>
              <div className="max-w-80 flex gap-2 flex-col">
                <Input
                  className="bg-slate-100 "
                  placeholder="First Name *"
                  name="first"
                  required
                ></Input>
                <Input
                  className="bg-slate-100 "
                  placeholder="Last Name *"
                  name="last"
                  required
                ></Input>
              </div>
            </div>

            <div className="flex gap-2 px-12 items-center">
              <Select name="batchId" required>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Id Number</SelectLabel>
                    <SelectItem value="120">120</SelectItem>
                    <SelectItem value="121">121</SelectItem>
                    <SelectItem value="122">122</SelectItem>
                    <SelectItem value="123">123</SelectItem>
                    <SelectItem value="124">124</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                className="max-w-80 bg-slate-100"
                placeholder="Degree Program"
                name="program"
                required
              ></Input>
            </div>

            <div className="px-12 py-4">
              <p className="text-custom-text-black">
                <span className="font-bold">MORE</span>. Link other accounts to
                boost reach! (optional)
              </p>
              <div className="flex gap-2 flex-col">
                <div className="flex relative">
                  <Input
                    className="bg-slate-100 max-w-80 pl-9"
                    placeholder="https://facebook.com/..."
                    name="facebook"
                  ></Input>
                  <Facebook className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                </div>

                <div className="flex relative">
                  <Input
                    className="bg-slate-100 max-w-80 pl-9"
                    placeholder="@juandelacruz..."
                    name="instagram"
                  ></Input>
                  <Instagram className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                </div>

                <div className="flex relative">
                  <Input
                    className="bg-slate-100 max-w-80 pl-9"
                    placeholder="https://linkedin.com/in/..."
                    name="linkedln"
                  ></Input>
                  <Linkedin className="absolute top-0 bottom-0 m-auto left-1 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="px-12 flex flex-col items-baseline gap-2">
              <Button
                type="submit"
                className="bg-lasalle-green rounded-2xl text-base py-5 px-16"
              >
                Complete Registratrion
              </Button>
              <div className="flex items-center gap-2">
                <Checkbox
                  required
                  name="policy"
                  id="terms"
                  className="outline-lasalle-green"
                ></Checkbox>
                <label htmlFor="terms">
                  I agree to the Privacy Policy and the Terms of Use.
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  name="terms"
                  value="true"
                  required
                  className="outline-lasalle-green"
                ></Checkbox>
                <label htmlFor="terms">
                  I agree to receive email marketing from lasallian.me.
                </label>
              </div>
            </div>
          </div>
        </Form>
      </main>

      <div className="max-w-96 hidden lg:flex justify-center flex-col p-6">
        <h1 className="text-lasalle-dark-green font-bold text-2xl">
          your data is safe with us!
        </h1>
        <p className="text-lasalle-green text-2xl">
          We wont save what you dont want us to save.
        </p>
      </div>
    </div>
  );
}
