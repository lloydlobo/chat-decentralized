<script>
  import { onMount } from "svelte";
  import GUN from "gun";
  import { user, username } from "./user";
  // After declaring u & p, use 2-way data binding from the Login Component
  import Login from "./Login.svelte";
  import ChatMessage from "./ChatMessage.svelte";
  import SEA from "gun/sea";

  const db = GUN();
  // <!-- two states -->
  let newMessage; // string for input message
  let messages = []; // array of msgs which contains user's message, timestamps.

  // Query messages with a lifecycle hook
  onMount(() => {
    var match = {
      // lexical queries are kind of like a limited RegEx or Glob.
      ".": {
        // property selector
        ">": new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      "-": 1, // filter in reverse
    };
    // Run when the component is initialized //  map loops ovel all chat msgs & once() to only read a msg once //  since msg is immutable we can use on( ) method instead of once() // for different chat rooms assign different names to each node // Single giant group chat node
    db.get("chat")
      .map(match)
      .once(async (data, id) => {
        if (data) {
          // End-To-End encryption Key
          const key = "#foo"; // hardcoded , use something else for security

          var message = {
            // Data Transform
            who: await db.user(data).get("alias"), // to avoid user lying about who they are
            what: (await SEA.decrypt(data.what, key)) + "", // force decrypt as text
            when: GUN.state.is(data, "what"), // gets internal timestamp of the property 'what'
          };
          if (message.what) {
            messages = [...messages.slice(-100), message].sort(
              (a, b) => a.when - b.when
            ); // render loop message with {#each} block
          }
        }
      });
  });

  const sendMessage = async () => {
    const secret = await SEA.encrypt(newMessage, "#foo"); // #foo is the hardcoded key used earlier to decrypt the message
    const message = user.get("all").set({ what: secret }); // associate msg to current user using encrypted msg as the value!
    const index = new Date().toISOString(); // to store it properly

    // Reference chat collection, create new node based on index value &  store msg value
    db.get("chat").get(index).put(message);
    newMessage = "";
  };
</script>

<div class="container">
  {#if $username}
    <main>
      <!-- unique keyed loop which Svelte sorts in order -->
      {#each messages as message (message.when)}
        <!-- form to read and submit char -->
        <ChatMessage {message} sender={$username} />
      {/each}
    </main>

    <form on:submit|preventDefault={sendMessage} action="">Hi</form>
  {:else}
    <main />
  {/if}
</div>
