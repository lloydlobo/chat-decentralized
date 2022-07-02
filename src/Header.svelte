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
      <span>Hello <strong>{$username.toLocaleUpperCase()}</strong></span>
      <img
        src={`https://avatars.dicebear.com/api/initials/${$username}.svg`}
        alt="user avatar"
      />
    </div>
    <button class="button-signout" on:click={signOutUser}>Sign out</button>
  {:else}
    <!-- Show this when the user isn't logged in -->
    <h3>DeCentRaliZed Chat</h3>
  {/if}
</header>

<style>
  header {
    background-color: #10182a;
    height: 10vh;
    min-height: 50px;
    color: white;
    position: fixed;
    width: 100%;
    max-width: 728px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 99;
    padding: 10px;
    box-sizing: border-box;

    border: 1px solid rgb(203 213 225/0.1);
  }
  .user-bio {
    display: flex;
    align-items: center;
  }
  .button-signout {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
</style>
