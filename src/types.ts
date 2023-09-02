

export type Player = {
  rel: string;
  id: string;
  names: {
    international: string;
    japanese: string;
  };
  supporterAnimation: boolean;
  pronouns: string;
  weblink: string;
  "name-style": {
    style: string;
    "color-from": {
      light: string;
      dark: string;
    };
    "color-to": {
      light: string;
      dark: string;
    };
  };
  role: string;
  signup: string;
  location: {
    country: {
      code: string;
      names: {
        international: string;
        japanese: string;
      };
    };
    region: {
      code: string;
      names: {
        international: string;
        japanese: string;
      };
    };
  };
  twitch: {
    uri: string;
  }|null;
  hitbox: any;
  youtube: {
    uri: string;
  }|null;
  twitter: any;
  speedrunslive: any;
  assets: any;
  links: any;
}

export type Run = {
  id: string;
  weblink: string;
  game: string;
  level?: string|null;
  category: string;
  comment: string;
  players: {[key: string]:string}[],
  date: string;
  submitted: string;
  times: {
    primary: string;
    primary_t: number;
    realtime: string;
    realtime_t: number;
    realtime_noloads: string|null;
    realtime_noloads_t: number;
    ingame: string|null;
    ingame_t: number;
  },
  system: {
    platform: string;
    emulated: boolean;
    region: string|null;
  },
  splits: any;
  values: {[key: string]:string};
}

export type Variable = {
  id: string;
  name: string;
  values: { [key: string]: string };
};

export type Category = {
  id: string;
  name: string;
  variables: { [key: string]: Variable };
  leaderboard_uri: string;
};

export type GlitchLevel = 
  "Glitches"|
  "NDE"|
  "Glitchless"|
  "Vanilla"

export type Roommate = 
  "Alex" | 
  "Elliot"|
  "Harvey"| 
  "Sam"|
  "Sebastian"|
  "Shane"|
  "Abigail"|
  "Emily"|
  "Haley"| 
  "Leah"|
  "Maru"| 
  "Penny"|
  "Player"|
  "Krobus"| 
  "Multiple Villagers"|
  "All"

export const RoomateOptions  =  [
  "All",
  "Multiple Villagers",
  "Player",
  "Abigail",
  "Alex",
  "Elliot",
  "Emily",
  "Haley",
  "Harvey",
  "Krobus",
  "Leah",
  "Maru",
  "Penny",
  "Sam",
  "Sebastian",
  "Shane",
] as string[]