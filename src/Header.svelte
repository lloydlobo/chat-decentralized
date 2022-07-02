<script>
  import { username, user } from "./user"; // username & user store

  const signOutUser = () => {
    user.leave();
    username.set(""); // set the current store to empty string
  };
</script>

<header>
  <h1>💬</h1>
  <!-- only show the button when user is signed in -->
  <!-- Use $ to subscribe to the store in front of username as it's a reactive store -->
  {#if $username}
    <div class="user-bio">
      <span>Hello <strong>{$username}</strong></span>
      <img
        src={`https://avatars.dicebar.com/api/initials/${$username}.svg`}
        alt="user avatar"
      />
    </div>
    <button class="button-signout" on:click={signOutUser}>Sign out</button>
  {:else}
    <!-- Show this when the user isn't logged in -->
    <h3>DeCentRaliZed Chat</h3>
  {/if}
</header>
