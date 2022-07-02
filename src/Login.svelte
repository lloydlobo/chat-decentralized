<script>
  import { user } from "./user";

  let username; // username won't be unique in this app due to it's scope
  let password;

  const userLogin = () => {
    user.auth(username, password, ({ err }) => err && alert(err));
  };

  // Sign up use create method on user, instead of auth
  const userSignup = () => {
    user.create(username, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        userLogin();
      }
    });
  };
</script>

<label for="username">Username</label>
<input
  name="username"
  bind:value={username}
  type="text"
  minlength="3"
  maxlength="16"
/>

<label for="password">Password</label>
<input name="password" bind:value={password} type="password" minlength="8" />

<button on:click={userLogin} class="button-login">Login</button>
<button on:click={userSignup} class="button-login button-sign-up"
  >Sign Up</button
>
