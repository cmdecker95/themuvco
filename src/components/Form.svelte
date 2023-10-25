<script lang="ts">
  let first = "";
  let last = "";
  let email = "";
  let phone = "";
  let difficulty = "";
  let injury = "";

  let clicked = false;
  let submitted = false;
  let success = false;

  const onSubmit = async (e: Event) => {
    e.preventDefault();

    clicked = true;

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first,
        last,
        email,
        phone,
        difficulty,
        injury,
      }),
    });

    submitted = true;

    if (response.status === 201) {
      success = true;
    }
  };
</script>

<div class="px-6 md:px-12 py-4 md:max-w-4xl md:mx-auto">
  <header class="py-12">
    <h1 class="text-3xl font-bold mb-4">Join the MUV Collective</h1>
    <p class="text-lg leading-snug">
      Please submit this intake form for our physical therapists to review.
    </p>
  </header>
  <form on:submit={onSubmit} class="flex flex-col pb-12">
    <label for="first" class="font-semibold capitalize">first</label>
    <input
      id="first"
      type="text"
      class="form-input rounded px-3 py-2 mb-6"
      bind:value={first}
      required
    />

    <label for="last" class="font-semibold capitalize">last</label>
    <input
      id="last"
      type="text"
      class="form-input rounded px-3 py-2 mb-6"
      bind:value={last}
      required
    />

    <label for="email" class="font-semibold capitalize">email</label>
    <input
      id="email"
      type="email"
      class="form-input rounded px-3 py-2 mb-6"
      bind:value={email}
      required
    />

    <label for="phone" class="font-semibold capitalize">phone</label>
    <input
      id="phone"
      type="text"
      class="form-input rounded px-3 py-2 mb-6"
      bind:value={phone}
    />

    <label for="difficulty" class="font-semibold"
      >What activity are you having difficulty with?</label
    >
    <textarea
      id="difficulty"
      class="form-textarea rounded px-3 py-2 mb-6"
      bind:value={difficulty}
      required
    />

    <label for="injury" class="font-semibold"
      >What injury is limiting you in that activity?</label
    >
    <textarea
      id="injury"
      class="form-textarea rounded px-3 py-2 mb-6"
      bind:value={injury}
      required
    />

    {#if submitted && success}
      <button
        class="border-2 border-green-600 bg-green-600 text-white rounded-full px-6 py-3 mt-4 text-center text-xl block"
      >
        Success
      </button>
    {:else if clicked}
      <button
        class="border-2 border-black bg-white text-black rounded-full px-6 py-3 mt-4 text-center text-xl block"
      >
        ...
      </button>
    {:else if submitted}
      <button
        class="border-2 border-red-600 bg-red-600 text-white rounded-full px-6 py-3 mt-4 text-center text-xl block"
      >
        Error
      </button>
    {:else}
      <button
        class="border-2 border-black bg-black text-white rounded-full px-6 py-3 mt-4 text-center text-xl block"
      >
        Submit
      </button>
    {/if}
  </form>
</div>
