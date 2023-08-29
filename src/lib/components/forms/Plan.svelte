<script lang="ts">
  import { enhance } from "$app/forms"

  import IconArcade from "$lib/assets/images/icon-arcade.svg?raw"
  import IconAdvanced from "$lib/assets/images/icon-advanced.svg?raw"
  import IconPro from "$lib/assets/images/icon-pro.svg?raw"
  import { planInformation } from "$lib/stores"
  import { PLAN_PRICE, YEARLY_MULTIPLY } from "$lib/data"

  export let zodIssues: Record<string, string>
  let yearlyChecked = false

  const plansOptionsList = [
    {
      icon: IconArcade,
      name: "arcade",
      title: "Arcade",
      checked: true,
    },
    {
      icon: IconAdvanced,
      name: "advanced",
      title: "Advanced",
    },
    {
      icon: IconPro,
      name: "pro",
      title: "Pro",
    },
  ]

  planInformation.subscribe((value) => {
    yearlyChecked = value.yearlyInterval
  })

  $: paymentIntervalAbbreviation = yearlyChecked ? "yr" : "mo"
</script>

<div class="grid gap-8">
  <div class="space-y-2">
    <h1>Select your plan</h1>
    <h2>You have the option of monthly or year billing.</h2>
  </div>

  <form
    id="2"
    class="w-full space-y-4"
    method="POST"
    action="?/plan"
    use:enhance
  >
    <div class="grid gap-2 md:grid-cols-3">
      {#each plansOptionsList as { icon, name, title, checked }}
        <div>
          <input
            type="radio"
            class="peer hidden"
            id={name}
            name="plan"
            value={name}
            {checked}
          />
          <label
            for={name}
            class="block rounded-md border border-neutral-light-gray transition-colors hover:border-primary-marine-blue peer-checked:border-primary-marine-blue peer-checked:bg-neutral-alabaster"
          >
            <div
              class="flex items-center gap-4 p-4 hover:cursor-pointer md:flex-col md:place-items-start md:gap-16"
            >
              <span>{@html icon}</span>
              <div>
                <p class="text-xl font-semibold">{title}</p>
                <p class="text-neutral-cool-gray">
                  ${yearlyChecked
                    ? PLAN_PRICE[name] * YEARLY_MULTIPLY
                    : PLAN_PRICE[name]}/{paymentIntervalAbbreviation}
                </p>
                {#if yearlyChecked}
                  <p class="text-primary-marine-blue">2 months free</p>
                {/if}
              </div>
            </div>
          </label>
        </div>
      {/each}
    </div>
    {#if zodIssues}
      <p
        class="place-content-center text-center text-sm font-semibold text-red-500"
      >
        {zodIssues.message}
      </p>
    {/if}
    <div
      class="flex place-content-center items-center gap-4 rounded-md bg-neutral-magnolia p-4 text-neutral-cool-gray"
    >
      <span
        class={yearlyChecked ? "" : "font-semibold text-primary-marine-blue"}
        >Monthly</span
      >
      <label class="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          name="yearly"
          class="peer sr-only"
          bind:checked={yearlyChecked}
        />
        <div
          class="peer h-6 w-11 rounded-full bg-primary-marine-blue after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"
        ></div>
      </label>
      <span
        class={yearlyChecked ? "font-semibold text-primary-marine-blue" : ""}
        >Yearly</span
      >
    </div>
  </form>
</div>
