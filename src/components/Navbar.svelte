<script lang="ts">
  let hidden: boolean = true;
  let display: "hidden" | "flex";

  $: display = hidden ? "hidden" : "flex";

  const toggleMenu = () => (hidden = !hidden);
</script>

<nav
  class="fixed inset-0 z-10 bottom-auto flex items-center justify-between bg-white border-b-2 border-black px-6 py-4"
>
  <a href="/" id="logo" class="translate-y-1"
    ><span class="text-4xl">MUV.</span></a
  >
  <button on:click={toggleMenu}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      width="30"
      height="30"
      viewBox="0 0 24 24"
    >
      {#if hidden}
        <path
          d="M20 4H4c-.551 0-1 .449-1 1v2c0 .551.449 1 1 1h16c.551 0 1-.449 1-1V5c0-.551-.449-1-1-1zM20 10H4c-.551 0-1 .449-1 1v2c0 .551.449 1 1 1h16c.551 0 1-.449 1-1v-2c0-.551-.449-1-1-1zM20 16H4c-.551 0-1 .449-1 1v2c0 .551.449 1 1 1h16c.551 0 1-.449 1-1v-2c0-.551-.449-1-1-1z"
        />
      {:else}
        <path
          d="m14.828 12 5.303-5.303a1.5 1.5 0 0 0 0-2.121l-.707-.707a1.5 1.5 0 0 0-2.121 0L12 9.172 6.697 3.868a1.5 1.5 0 0 0-2.121 0l-.708.707a1.5 1.5 0 0 0 0 2.121L9.172 12l-5.303 5.303a1.5 1.5 0 0 0 0 2.121l.707.707a1.5 1.5 0 0 0 2.121 0L12 14.828l5.303 5.303a1.5 1.5 0 0 0 2.121 0l.707-.707a1.5 1.5 0 0 0 0-2.121L14.828 12z"
        />
      {/if}
    </svg>
  </button>
</nav>

<aside
  class={`
  ${display} flex-col fixed inset-0 top-[74px] z-10
  bg-white text-neutral-800 text-xl font-semibold`}
>
  <div class="flex flex-col flex-grow gap-5 items-center justify-between">
    <div class="flex flex-col flex-grow w-full">
      <a href="/about" class="border-b-2 border-black text-2xl px-6 py-4"
        >About</a
      >
      <a href="/blog" class="border-b-2 border-black text-2xl px-6 py-4">Blog</a
      >
      <a
        href="https://themuvco.square.site/s/shop"
        class="border-b-2 border-black text-2xl px-6 py-4">Shop</a
      >
    </div>
    <div class="flex justify-between gap-5 px-6 py-4 w-full">
      <a
        href="/signin"
        class="border-2 border-black rounded-full px-3 py-2 w-full text-center flex-grow"
        >Sign in</a
      >
      <a
        href="/signup"
        class="border-2 border-black bg-black text-white rounded-full px-3 py-2 w-full text-center flex-grow"
        >Sign up</a
      >
    </div>
  </div>
</aside>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Teko:wght@700&display=swap");

  #logo {
    font-family: Teko, sans-serif;
  }
</style>
