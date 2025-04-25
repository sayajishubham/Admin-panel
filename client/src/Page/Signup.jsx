import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router'
import axios from "axios"

function Signup() {

  let [Username, setUsername] = useState("");
  let [Email, setEmail] = useState("");
  let [Password, setPassword] = useState("");

  let Navigate = useNavigate();

  async function handlesignup(e) {
    e.preventDefault();
    try {
      let Signupdata = await axios.post("http://localhost:5000/api/user/signup",
        { Username, Email, Password },
        { withCredentials: true }
      );
      console.log(Signupdata.data.message);
      console.log(Signupdata.data);
      Navigate("/Signin");
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-6 w-[25%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Card className="bg-transparent text-[white] ">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription className="text-white">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlesignup}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2 mb-[15px]">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username..."
                  name="Username"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2 mb-[15px]">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Sign Up
              </Button>

              <Button variant="outline" className="w-full text-[black]">
                Sign up with Google
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link to="/Signin" className="underline underline-offset-4"> Sign in</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup;
