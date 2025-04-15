"use client";

import {getUserById} from "@/data/user/get-user-by-id";
import {defaultUser, userIdSignal, userSignal} from "@/store";
import {useSignals} from "@preact/signals-react/runtime";
import {useEffect} from "react";

export function UserProvider() {
  useSignals();

  async function getUser() {
    const user = await getUserById(userIdSignal.value);
    console.log("Fetching user data...");

    if (!userSignal.value) {
      console.log("User signal is empty, resetting user.");
      userSignal.value = defaultUser;
      return;
    }

    if (!user || user === null) {
      console.log("User data is null or undefined, not updating, resetting user.");
      userSignal.value = defaultUser;
      return;
    }

    if (userSignal.value.id === user.id) {
      console.log("User data is equal to the current signal value, not updating.");
      return;
    }

    console.log("User data is different, updating the signal value.");
    userSignal.value = user;
  }

  useEffect(() => {
    getUser();
  }, []);

  return null;
}
