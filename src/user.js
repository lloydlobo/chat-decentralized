import GUN from "gun";
import "gun/sea"; // Security, Encryption, & Authorization
// @ts-ignore
import "gun/axe"; // Advanced Exchange Equation
import { writable } from "svelte/store";

// Database stuff
export const db = GUN();

// Chat 'Gun' package user
export const user = db.user().recall({ sessionStorage: true }); // sessionStorage allows user to stay logged in btw browser sessions

// Get username by passing reference to alias
// user.get('alias'); // since we'll frequently use this value in the app, let's use Svelte's store with `writable` for Global App State

// Username of current user
export const username = writable(""); // store -> re-render the UI whenever the state is changed, share across multiple components

// @ts-ignore
user.get("alias").on((value) => username.set(value)); // whenever the value of user updates we set it in the store

// Listen to On/Off state when user signs in or out
// listen to auth event on database to handle it
// @ts-ignore
db.on("auth", async (event) => {
  // @ts-ignore
  const alias = await user.get("alias"); // This is the string of username
  // @ts-ignore
  username.set(alias);

  console.log(`${alias} has signed in`);
});
