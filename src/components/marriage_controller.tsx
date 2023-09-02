import React from "react";
import { GlitchLevel, Roommate, RoomateOptions } from "../types";
import Dropdown from "./dropdown";
import ButtonGroup from "./buttongroup";

type MarriageControllerProps = {
  glitches: GlitchLevel;
  setGlitches: (glitches: GlitchLevel) => void;
  roommate: Roommate;
  setRoommate: (roommate: Roommate) => void;
  seeded: boolean;
  setSeeded: (seeded: boolean) => void;
};

export default function MarriageController(props: MarriageControllerProps) {
  const { glitches, setGlitches, roommate, setRoommate, seeded, setSeeded } =
    props;
  const onToggleGlitches = () => {
    switch (glitches) {
      case "Vanilla":
        setGlitches("Glitchless");
        break;
      case "Glitchless":
        setGlitches("NDE");
        break;
      case "NDE":
        setGlitches("Glitches");
        break;
      case "Glitches":
        setGlitches("Vanilla");
        break;
    }
  };
  return (
    <div className="flex w-full flex-row content-center bg-gray-300  px-2 py-2">
      <div className="pr-2">
        <Dropdown
          label="Roommate"
          value={roommate}
          setValue={setRoommate}
          options={RoomateOptions}
        />
      </div>
      <ButtonGroup
        label="Glitches"
        value={glitches}
        setValue={setGlitches}
        options={["Vanilla", "Glitchless", "NDE", "Glitches"]}
      />
    </div>
  );
}
