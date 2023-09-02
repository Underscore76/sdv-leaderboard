import { Category, Player, Run } from "./types";
import versionMap from "./data/version.json";
import { version } from "react";

export const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = Math.floor(time - hours * 3600 - minutes * 60);
  const milliseconds = time % 1;
  let result = "";
  if (hours > 0) {
    result += `${hours}h `;
  }
  if (minutes > 0) {
    result += `${minutes.toString().padStart(2, "0")}m `;
  }
  result += `${seconds.toString().padStart(2, "0")}s`;
  if (milliseconds > 0) {
    result += ` ${(milliseconds * 1000).toFixed(0).padStart(3, "0")}ms`;
  }
  return result;
};

export const getPlayers = (run: Run, playerList: Player[]): any => {
  const players = run.players.map((p: any) => {
    if (p.rel === "guest") {
      return {
        name: p.name,
        color: null,
      };
    }
    const player = playerList.find((player: Player) => player.id === p.id);
    if (player["name-style"]["style"] === "solid") {
      return {
        name: player.names.international,
        color: {
          from: player["name-style"]["color"].light,
          to: player["name-style"]["color"].light,
        },
      };
    }
    return {
      name: player.names.international,
      color: {
        from: player["name-style"]["color-from"].light,
        to: player["name-style"]["color-to"].light,
      },
    };
  });
  return players;
};

export const getDate = (date: number): string => {
  const d = new Date(date * 1000);
  return `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
};

export const getVersion = (run: Run): string => {
  return versionMap.id_map[run.values[versionMap.variable_id]];
};

export const structureNames = (players: any[]) => {
  return (
    <div className="whitespace-normal py-1">
      <span>
        <div className="inline-flex flex-row flex-wrap items-center justify-start">
          {players.map((player: any, idx: number) => (
            <div
              className="inline-flex min-w-0 items-center align-middle"
              key={idx}
            >
              {player.color !== null && (
                <span
                  className="name-gradient font-bold"
                  style={
                    {
                      "--name-gradient-from": player.color.from,
                      "--name-gradient-to": player.color.to,
                    } as React.CSSProperties
                  }
                >
                  {player.name}
                </span>
              )}
              {player.color === null && <span>{player.name}</span>}
              {idx < players.length - 1 && <span className="mx-1.5">·</span>}
            </div>
          ))}
        </div>
      </span>
    </div>
  );
};
{
  /* <a class="x-username-truncate x-username-gradient x-focus-inner" style="color:#EE4444;--username-gradient-from:#EE4444;--username-gradient-to:#FFB3F3" href="/users/scribbledink"><span>scribbledink</span></a> */
}
