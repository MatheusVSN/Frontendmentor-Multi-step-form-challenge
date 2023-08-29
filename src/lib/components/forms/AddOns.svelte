<script lang="ts">
  import { enhance } from "$app/forms"
  import { planInformation } from "$lib/stores"
  let yearlyPlanSelected = false

  let addOnsList = [
    {
      name: "online",
      title: "Online services",
      description: "Acces to multiplayer games",
      prices: {
        monthly: "+$1/mo",
        yearly: "+$10/yr",
      },
    },
    {
      name: "storage",
      title: "Larger storage",
      description: "Extra 1TB of cloud save",
      prices: {
        monthly: "+$2/mo",
        yearly: "+$20/yr",
      },
    },
    {
      name: "customizable",
      title: "Customizable profile",
      description: "Custom theme on your profile",
      prices: {
        monthly: "+$2/mo",
        yearly: "+$20/yr",
      },
    },
  ]

  planInformation.subscribe((value) => {
    yearlyPlanSelected = value.yearlyInterval
  })
</script>

<div class="grid gap-4">
  <div class="space-y-2">
    <h1>Pick add-ons</h1>
    <h2>Add-ons help enhance your gaming experience.</h2>
  </div>

  <form
    id="3"
    class="w-full space-y-4"
    method="POST"
    action="?/addons"
    use:enhance
  >
    <div class="grid gap-2">
      {#each addOnsList as { name, title, description, prices }}
        <div>
          <label for={name} class="relative grid gap-5">
            <input id={name} type="checkbox" {name} class="peer sr-only" />
            <div
              class="w-full cursor-pointer rounded-md border bg-white p-5 shadow-sm ring-primary-marine-blue duration-200 peer-checked:bg-neutral-magnolia peer-checked:ring-2"
            >
              <div class="flex items-center pl-12">
                <div>
                  <h3 class="font-medium leading-none text-gray-800">
                    {title}
                  </h3>
                  <p class="mt-1 text-sm text-gray-600">
                    {description}
                  </p>
                </div>

                <p class="ml-auto text-primary-purplish-blue">
                  {yearlyPlanSelected ? prices.yearly : prices.monthly}
                </p>
              </div>
            </div>
            <span
              class="absolute left-5 top-5 grid h-6 w-6 place-content-center rounded-md border peer-checked:bg-primary-purplish-blue"
            >
              <svg class="h-3 w-3 text-white" viewBox="0 0 12 10"
                ><polyline
                  fill="none"
                  stroke-width="2px"
                  stroke="currentColor"
                  stroke-dasharray="16px"
                  points="1.5 6 4.5 9 10.5 1"
                ></polyline></svg
              >
            </span>
          </label>
        </div>
      {/each}
    </div>
  </form>
</div>
