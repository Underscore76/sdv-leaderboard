import React from "react";
import { Run, Player, Category, GlitchLevel, Roommate } from "./types";
import MarriageTable from "./components/marriage_table";
import MarriageController from "./components/marriage_controller";

export default function App() {
  const [glitches, setGlitches] = React.useState<GlitchLevel>("Glitchless");
  const [roommate, setRoommate] = React.useState<Roommate>("All");
  const [seeded, setSeeded] = React.useState<boolean>(false);
  return (
    <div className="mx-auto w-full items-center rounded-b-md sm:max-w-3xl md:flex md:flex-col md:py-8">
      <MarriageController
        glitches={glitches}
        setGlitches={setGlitches}
        roommate={roommate}
        setRoommate={setRoommate}
        seeded={seeded}
        setSeeded={setSeeded}
      />
      <MarriageTable glitches={glitches} roommate={roommate} seeded={seeded} />
    </div>
  );
}
