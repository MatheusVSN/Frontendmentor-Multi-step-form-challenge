<script lang="ts">
  import Progress from "$lib/components/Progress.svelte"
  import AddOns from "$lib/components/forms/AddOns.svelte"
  import Completed from "$lib/components/forms/Completed.svelte"
  import Finishing from "$lib/components/forms/Finishing.svelte"
  import PersonalInfo from "$lib/components/forms/PersonalInfo.svelte"
  import Plan from "$lib/components/forms/Plan.svelte"
  import updatePlanInfo from "$lib/functions/updatePlanInfo"

  const BgSidebarMobile = new URL(
    "$lib/assets/images/bg-sidebar-mobile.svg",
    import.meta.url,
  ).href
  const BgSidebarDesktop = new URL(
    "$lib/assets/images/bg-sidebar-desktop.svg",
    import.meta.url,
  ).href

  let currentProgress: number = 1
  const completedProress: number = 5

  let sideBarBackground = BgSidebarDesktop
  let screenWidth: number
  $: if (screenWidth > 768) {
    sideBarBackground = BgSidebarDesktop
  } else {
    sideBarBackground = BgSidebarMobile
  }

  export let form: Record<string, any>

  const upgradeProcess = () => {
    if (currentProgress >= completedProress) return
    currentProgress += 1
  }

  const downgradeProgress = () => {
    if (currentProgress <= 0) return
    currentProgress -= 1
  }

  const returnToPlan = () => {
    currentProgress = 2
  }
</script>

<svelte:window bind:innerWidth={screenWidth} />

<main class="font-ubuntu h-screen md:grid md:place-content-center md:p-12">
  <div class="flex h-full max-md:flex-col md:rounded-md md:bg-white md:p-4">
    <!-- Topbar -->
    <div
      class="relative min-h-[150px] bg-cover p-8 md:h-auto md:rounded-md"
      style="background-image: url('{sideBarBackground}');"
    >
      <Progress {currentProgress} />
    </div>
    <div
      class="grid flex-1 justify-center px-4 md:place-content-center md:px-16"
    >
      <!-- Form -->
      <div class="flex flex-1 flex-col max-md:relative max-md:bottom-12">
        <div class="rounded-md py-8 max-md:bg-white max-md:p-6 max-[350px]:p-4">
          {#if currentProgress === 1}
            <PersonalInfo zodIssues={form?.issues} />
          {:else if currentProgress === 2}
            <Plan zodIssues={form?.issues} />
          {:else if currentProgress === 3}
            <AddOns />
          {:else if currentProgress === 4}
            <Finishing onReturn={returnToPlan} />
          {:else if currentProgress === 5}
            <Completed />
          {/if}
        </div>
      </div>
      <div class="mt-auto flex items-center max-md:mb-8 md:pt-20">
        {#if currentProgress > 1 && currentProgress < completedProress}
          <div class="">
            <!-- Go back -->
            <button
              class="rounded-md px-6 py-2.5 text-neutral-cool-gray transition-colors hover:text-primary-marine-blue"
              type="button"
              on:click={downgradeProgress}>Go back</button
            >
          </div>
        {/if}
        {#if currentProgress !== completedProress}
          <div class="ml-auto place-self-end">
            <!-- Submit -->

            <button
              class="rounded-md bg-primary-marine-blue px-6 py-2.5 text-white transition-colors hover:bg-primary-purplish-blue"
              type="submit"
              form={currentProgress.toString()}
              >{currentProgress === 4 ? "Confirm" : "Next Step"}</button
            >
          </div>
        {/if}
      </div>
    </div>
  </div>
</main>

{#if form?.success}
  {void upgradeProcess() ?? ""}
  {void updatePlanInfo(form.data) ?? ""}
{/if}
