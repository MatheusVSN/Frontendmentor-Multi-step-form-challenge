<script lang="ts">
  type AddOnInfo = {
    text: string
    price: number
  }

  import { enhance } from "$app/forms"
  import { ADDONS_PRICE, PLAN_PRICE, YEARLY_MULTIPLY } from "$lib/data"
  import { planInformation } from "$lib/stores"

  let finalPlan = {} as {
    yearlyInterval: boolean
    plan: "arcade" | "advanced" | "pro"
    addOns: string[]
  }

  export let onReturn: () => void

  const getFullPrice = () => {
    let ammount = 0

    finalPlan.addOns.map((addOn) => {
      ammount += ADDONS_PRICE[addOn]
    })

    ammount += PLAN_PRICE[finalPlan.plan]
    ammount *= finalPlan.yearlyInterval ? YEARLY_MULTIPLY : 1
    return ammount
  }

  $: finalPrice = getFullPrice()
  $: planPrice =
    PLAN_PRICE[finalPlan.plan] *
    (finalPlan.yearlyInterval ? YEARLY_MULTIPLY : 1)
  $: paymentInterval = finalPlan.yearlyInterval ? "Yearly" : "Monthly"
  $: paymentIntervalAbbreviation = paymentInterval === "Yearly" ? "yr" : "mo"

  planInformation.subscribe((value) => {
    finalPlan = value
  })

  const addonsInfo: Record<string, AddOnInfo> = {
    online: {
      text: "Online Service",
      price: finalPlan.yearlyInterval
        ? ADDONS_PRICE.online * YEARLY_MULTIPLY
        : ADDONS_PRICE.online,
    },
    storage: {
      text: "Larger Storage",
      price: finalPlan.yearlyInterval
        ? ADDONS_PRICE.storage * YEARLY_MULTIPLY
        : ADDONS_PRICE.storage,
    },
    customizable: {
      text: "Customizable Profile",
      price: finalPlan.yearlyInterval
        ? ADDONS_PRICE.customizable * YEARLY_MULTIPLY
        : ADDONS_PRICE.customizable,
    },
  }
</script>

<div class="grid gap-4">
  <div class="space-y-2">
    <h1>Finishing Up</h1>
    <h2>Double check everything looks OK before confirming</h2>
  </div>

  <form
    id="4"
    class="flex w-full flex-col gap-6 rounded-md bg-neutral-magnolia p-4"
    method="POST"
    action="?/finish"
    use:enhance
  >
    <div class="flex items-center gap-2">
      <div>
        <h3
          class="text-lg font-semibold text-primary-marine-blue first-letter:uppercase"
        >
          {finalPlan.plan}
          ({paymentInterval})
        </h3>
        <button on:click={onReturn} class="text-neutral-cool-gray underline"
          >Change</button
        >
      </div>

      <p class="ml-auto font-bold text-primary-marine-blue">
        ${planPrice}/{paymentIntervalAbbreviation}
      </p>
    </div>
    {#if finalPlan.addOns.length > 0}
      <span class="h-[1px] border" />
      <ul class="grid gap-3">
        {#each finalPlan.addOns as addOn}
          <li class="flex items-center">
            <p class="text-neutral-cool-gray">{addonsInfo[addOn].text}</p>
            <p class="ml-auto font-semibold text-primary-marine-blue">
              +${addonsInfo[addOn].price}/{paymentIntervalAbbreviation}
            </p>
          </li>
        {/each}
      </ul>
    {/if}
    <span class="h-[1px] border" />
    <div class="flex items-center">
      <p class="text-neutral-cool-gray">
        Total (per {paymentInterval.toLowerCase()})
      </p>
      <p class="ml-auto text-lg font-bold text-primary-purplish-blue">
        +${finalPrice}/{paymentIntervalAbbreviation}
      </p>
    </div>
  </form>
</div>
