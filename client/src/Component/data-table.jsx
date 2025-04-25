import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom"

function Datatable() {

  const [data, setdata] = useState([]);
  let useroradmindata = JSON.parse(sessionStorage.getItem("LoginData"));

  async function fetchapi() {
    try {
      let response = await axios.get("http://localhost:5000/api/data/hero", {
        withCredentials: true
      });
      setdata(response.data.Hero);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (useroradmindata) {
      fetchapi();
    }
  }, [useroradmindata]);

  function handledelet(id) {
    axios.delete(`http://localhost:5000/api/data/delete/hero/${id}`, {
      withCredentials: true
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    useroradmindata ? (
      <div className="w-[96%] m-auto mt-10 p-4 shadow-xl rounded-2xl border border-gray-800 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Hero Details</h2>
        <Link to={"/Addherovillains"}><h2 className="text-[19px] mb-[8px] cursor-pointer"><span className="text-[red]">+</span>&nbsp;&nbsp;Add</h2></Link>
        <Table>
          <TableCaption className="text-gray-400">Complete Overview of Hero Data</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Powers</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>Villain Name</TableHead>
              <TableHead>Villain Health</TableHead>
              {useroradmindata?.role === "Admin" && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((hero, index) => (
              <TableRow key={index}>
                <TableCell>{hero.id}</TableCell>
                <TableCell>{hero.name}</TableCell>
                <TableCell>{hero.powers.join(", ")}</TableCell>
                <TableCell>{hero.health}</TableCell>
                <TableCell>{hero.villains?.[0]?.name || "No Villains"}</TableCell>
                <TableCell>{hero.villains?.[0]?.health || "-"}</TableCell>
                {useroradmindata?.role === "Admin" && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="text-white border-gray-600">
                          Action
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40 bg-gray-900 text-white border-gray-700">
                        <DropdownMenuGroup>
                          <DropdownMenuItem className="text-[17px]">
                            <Link to={`/Updatevillains/${hero.id}`}><button className="w-full text-left text-[17px]">Edit</button></Link>

                            <DropdownMenuShortcut className="text-[17px]">⌘E</DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild onClick={() => handledelet(hero.id)}>
                            <button
                              className="w-full text-left text-[17px]"
                              onClick={() => handledelet(hero.id)}
                            >
                              Delete
                              <DropdownMenuShortcut className="text-[17px]">⌘D</DropdownMenuShortcut>
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[17px]">
                            Favorite
                            <DropdownMenuShortcut className="text-[17px]">★</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ) : (
      <div className="w-full h-[60vh] flex flex-col justify-center items-center text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Access Denied 🚫</h2>
        <p className="text-lg">You need to <span className="text-primary font-semibold">Login</span> to view hero data.</p>
      </div>
    )
  );
}

export default Datatable;
