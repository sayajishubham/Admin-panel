import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useNavigate } from 'react-router'

function Addherovillain() {

  let [name, setname] = useState("");
  let [powers, setpowes] = useState([]);
  let [health, sethealth] = useState("");
  let [villains, setvillains] = useState("");

  let Navigate = useNavigate();




  function handleadd(e) {
    e.preventDefault();
    let powersArray = powers.split(",").map(item => item.trim());
    console.log("Converted Powers (Array):", powersArray);

    let healthNumber = parseInt(health);
    console.log("Converted Health (Number):", healthNumber);
    let [villainName, villainHealth] = villains.split(",");
    console.log("Split Villains:", villainName, villainHealth);


    let villainsData = [{
      name: villainName.trim(),
      health: parseInt(villainHealth)
    }];
    console.log("Converted Villains (Array of Object):", villainsData);

    let finalData = {
      name: name,
      powers: powersArray,
      health: healthNumber,
      villains: villainsData
    };
    console.log("Final Data:", finalData);


    axios.post("http://localhost:5000/api/data/add/hero", finalData, {
      withCredentials: true
    })
      .then((res) => {
        console.log("Server Response:", res);
        Navigate("/Dashboard");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }





  return (
    <div>
      <div className="flex flex-col gap-6 w-[25%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Card className="bg-transparent text-[white] ">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Add Heros</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleadd}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2 ">
                  <Label htmlFor="username">Name</Label>
                  <Input
                    id="Name"
                    type="text"
                    placeholder="Heros Name..."
                    name="name"
                    value={name}
                    onChange={(e) => { setname(e.target.value) }}
                    required
                  />
                </div>
                <div className="grid gap-2 ">
                  <Label htmlFor="email">Powers</Label>
                  <Input
                    id="Powers"
                    type="text"
                    placeholder="Powers.."
                    name="powers"
                    value={powers}
                    onChange={(e) => { setpowes(e.target.value) }}

                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Healths</Label>
                  </div>
                  <Input
                    id="Healths"
                    type="text"
                    placeholder="Healths.."
                    name="health"
                    value={health}
                    onChange={(e) => { sethealth(e.target.value) }}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Villains</Label>
                  </div>
                  <Input
                    id="villains"
                    type="text"
                    placeholder="villains Name & villains Health"
                    name="villains"
                    value={villains}
                    onChange={(e) => { setvillains(e.target.value) }}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Addherovillain;
