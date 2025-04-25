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
import axios from 'axios'

function Signin() {


  let [Email, setEmail] = useState("");
  let [Password, setPassword] = useState("");

  let Navigate = useNavigate();


  async function handlesignin(e) {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:5000/api/user/signin", {
        Email, Password
      }, { withCredentials: true })
      console.log(response.data);
      console.log(response.data.message);
      Navigate("/Dashboard");
      setEmail("");
      setPassword("");
      let sessionstorage = sessionStorage.setItem("LoginData", JSON.stringify(response.data.user));
      let data = document.cookie;

    } catch (error) {
      console.log(error);
    }

  }







  return (
    <div className="flex flex-col gap-6 w-[25%]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Card className="bg-transparent text-[white] ">
        <CardHeader>
          <CardTitle className="text-2xl">Sing In</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlesignin}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="Email"
                  value={Email}
                  onChange={(e) => { setEmail(e.target.value) }}
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
                <Input id="password" type="password" name="Password" value={Password} onChange={(e) => { setPassword(e.target.value) }} required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full text-[black]">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?
              <Link to="/Signup" className="underline underline-offset-4">
                Sign up</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signin
