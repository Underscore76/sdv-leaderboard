import React, { ReactNode, useEffect, useState } from "react";
import { Player, Run, GlitchLevel, Roommate } from "../types";
import { formatTime, getPlayers, getVersion, structureNames } from "../utils";
import ChickenSpinner from "./spinner";
import glitchLevel from "../data/glitch_level.json";
import roommateMap from "../data/roommates.json";
import seededRoommateMap from "../data/seeded_roommates.json";
import multiplayerMap from "../data/coop.json";

const buildQueryParams = (
  glitches: GlitchLevel,
  roommate: Roommate,
  seeded: boolean,
) => {
  const queryParams = ["embed=players", "timing=realtime"];
  queryParams.push(`var-onvey5lm=${glitchLevel.name_map[glitches]}`);

  // seeded and unseeded have different variable ids
  if (seeded) {
    if (roommate !== "All") {
      queryParams.push(
        `var-${seededRoommateMap.variable_id}=${seededRoommateMap.name_map[roommate]}`,
      );
    }
  } else {
    if (roommate !== "All") {
      queryParams.push(
        `var-${roommateMap.variable_id}=${roommateMap.name_map[roommate]}`,
      );
    }
  }
  // player/multiple villages are our MP options
  if (roommate === "Multiple Villagers" || roommate === "Player") {
    queryParams.push(
      `var-${multiplayerMap.variable_id}=${multiplayerMap.name_map["Multiplayer"]}`,
    );
  } else {
    queryParams.push(
      `var-${multiplayerMap.variable_id}=${multiplayerMap.name_map["Singleplayer"]}`,
    );
  }
  return queryParams.join("&");
};

const buildUrl = (
  glitches: GlitchLevel,
  roommate: Roommate,
  seeded: boolean,
) => {
  let baseUrl =
    "https://www.speedrun.com/api/v1/leaderboards/9d3q7e1l/category/";
  if (seeded) {
    baseUrl += "9d8empld?";
  } else {
    baseUrl += "n2yqw78k?";
  }

  const queryParams = buildQueryParams(glitches, roommate, seeded);
  return baseUrl + queryParams;
};

const getMarriageCandidate = (run: Run, seeded: boolean): string => {
  if (seeded) {
    return seededRoommateMap.id_map[run.values["r8r7170n"]];
  } else {
    return roommateMap.id_map[run.values["kn00edn3"]];
  }
};

type MarriageTableProps = {
  glitches: GlitchLevel;
  roommate: Roommate;
  seeded: boolean;
};

export default function MarriageTable({
  glitches,
  roommate,
  seeded,
}: MarriageTableProps) {
  const [runList, setRunList] = useState<Run[]>([]);
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // possible debounce option https://stackoverflow.com/a/74609594
  useEffect(() => {
    const getData = () => {
      const url = buildUrl(glitches, roommate, seeded);
      setLoading(true);
      // fetch(url, { cache: "no-cache" })
      fetch(url)
        .then((res) => res.json())
        .then((res) => res.data)
        .then((result) => {
          setRunList(
            result.runs.filter((x) => x.place != 0).map((run: any) => run.run),
          );
          setPlayerList(result.players.data);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getData();
  }, [glitches, roommate, seeded]);

  return (
    <div className="w-full content-center overflow-x-scroll overflow-y-scroll">
      {loading && <ChickenSpinner />}
      <table className="leaderboard-table w-full transition-all">
        <thead className="overflow-hidden bg-slate-100 text-gray-900">
          <tr className="h-12">
            <th className="px-1.5 text-center">#</th>
            <th className="px-0.5 text-left">Players</th>
            {roommate === "All" && <th className="text-center">Roommate</th>}
            <th className="text-center">RTA</th>
            <th className="text-center">IGT</th>
            <th className="px-1.5 text-center">Date</th>
            <th className="px-1.5 text-center">Version</th>
          </tr>
        </thead>
        <tbody>
          {runList.map((run: Run, idx: number) => (
            <tr
              className="h-12 cursor-pointer whitespace-nowrap bg-slate-200 font-semibold text-gray-900 even:bg-slate-300 hover:bg-slate-400"
              key={run.id + "-" + idx}
              onClick={() => window.open(run.weblink, "_blank")}
            >
              <td className="left-0 px-0.5 pl-1.5">{idx + 1}</td>
              <td className="px-0.5 text-left">
                {structureNames(getPlayers(run, playerList))}
              </td>
              {roommate === "All" && (
                <td className="text-center">
                  {getMarriageCandidate(run, seeded)}
                </td>
              )}
              <td className="text-left">{formatTime(run.times.realtime_t)}</td>
              <td className="text-left">
                {run.times.ingame_t !== 0
                  ? formatTime(run.times.ingame_t)
                  : "-"}
              </td>
              <td className="text-center">{run.date}</td>
              <td className="text-center">{getVersion(run)}</td>
            </tr>
          ))}
          {runList.length === 0 && !loading && (
            <tr className="h-12 bg-slate-200 font-semibold text-gray-900 even:bg-slate-300">
              <td
                colSpan={roommate === "All" ? 7 : 6}
                className="w-full text-center"
              >
                No runs of this category, go snipe a WR!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
