import { Plugins } from "@capacitor/core";
import { Schedule, Session } from "../models/Schedule";
import { Speaker } from "../models/Speaker";
import { Location } from "../models/Location";
import { BaseUrl } from "../AppConfig";

const { Storage } = Plugins;

// const dataUrl = "/assets/data/data.json";
// const locationsUrl = "/assets/data/locations.json";

const HAS_SEEN_TUTORIAL = "hasSeenTutorial";
const AUTH_DATA = "authData";

// export const getConfData = async () => {
//   // const response = await Promise.all([fetch(dataUrl), fetch(locationsUrl)]);
//   // const responseData = await response[0].json();
//   // const schedule = responseData.schedule[0] as Schedule;
//   // const sessions = parseSessions(schedule);
//   // const speakers = responseData.speakers as Speaker[];
//   // const locations = (await response[1].json()) as Location[];
//   const allTracks = sessions
//     .reduce((all, session) => all.concat(session.tracks), [] as string[])
//     .filter((trackName, index, array) => array.indexOf(trackName) === index)
//     .sort();

//   const data = {
//     // schedule,
//     // sessions,
//     // locations,
//     // speakers,
//     allTracks,
//     filteredTracks: [...allTracks],
//   };
//   return data;
// };

export const getAuthToken = () => {
  fetch(BaseUrl+"auth/token")
    .then((response) => response.json())
    .then((data) => {
      return data.token;
    })
    .catch((error) => {
      return false;
    });
};
export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: AUTH_DATA }),
  ]);
  
  const hasSeenTutorial = (await response[0].value) === "true";
  const authDataTemp = (await response[1].value) || "";
  const authData = authDataTemp ? JSON.parse(authDataTemp) : null;

  // const authData = authDataTemp;
  const data = {
    hasSeenTutorial,
    authData,
  };
  return data;
};

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({
    key: HAS_SEEN_TUTORIAL,
    value: JSON.stringify(hasSeenTutorial),
  });
};

export const setAuthDataData = async (authData?: string) => {
  if (!authData) {
    await Storage.remove({ key: AUTH_DATA });
  } else {
    await Storage.set({ key: AUTH_DATA, value: JSON.stringify(authData) });
  }
};

function parseSessions(schedule: Schedule) {
  const sessions: Session[] = [];
  schedule.groups.forEach((g) => {
    g.sessions.forEach((s) => sessions.push(s));
  });
  return sessions;
}
