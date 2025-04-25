import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate, useParams } from 'react-router';

function Updatevillains() {

  let [villains, setvillains] = useState("");  
  let { id } = useParams();
  let Navigate = useNavigate();                 

  function handleupdate(e) {
    e.preventDefault();
    let [villainsname, villanhealt] = villains.split(",");
    console.log("Split Data -> Name:", villainsname, "| Health:", villanhealt);

    let villainsData = [{
      name: villainsname.trim(),
      health: parseInt(villanhealt)
    }];

    console.log("Final Data to Send ->", villainsData);
    axios.patch(`http://localhost:5000/api/data/update/villain/${id}`,
      { villains: villainsData },
      { withCredentials: true }
    )
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        Navigate("/Dashboard")
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div>
      <div className="flex flex-col gap-6 w-[25%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Card className="bg-transparent text-[white] ">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Update Villains</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleupdate}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="villains">Villains</Label>
                  </div>
                  <Input
                    id="villains"
                    type="text"
                    placeholder="Villain Name & Health (ex: Mandarin,50)"
                    name="villains"
                    value={villains}
                    onChange={(e) => setvillains(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Update
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Updatevillains;
