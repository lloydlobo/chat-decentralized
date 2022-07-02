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

<div class="login-wrapper">
  <div class="inputs-wrapper">
    <div class="username-wrapper">
      <label for="username">Username</label>
      <input
        name="username"
        bind:value={username}
        type="text"
        minlength="3"
        maxlength="16"
      />
    </div>
    <div class="password-wrapper">
      <label for="password">Password</label>
      <input
        name="password"
        bind:value={password}
        type="password"
        minlength="8"
      />
    </div>
    <!-- integrity="sha256" -->
  </div>

  <div class="buttons-wrapper">
    <button on:click={userLogin} class="button-login">Login</button>
    <button on:click={userSignup} class="button-login button-sign-up"
      >Sign Up</button
    >
  </div>
</div>

<style>
  .button-sign-up {
    background: #0ea5e9;
  }

  .login-wrapper {
    display: grid;
    gap: 1rem;
    padding-block: 0.5rem;
    min-height: 33vh;
  }

  .buttons-wrapper {
    display: grid;
    gap: 1rem;
    margin-block-start: auto;
  }

  input {
    padding-inline: 1ch;
  }
</style>
