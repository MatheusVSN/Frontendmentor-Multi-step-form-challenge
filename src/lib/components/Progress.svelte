<script lang="ts">
  export let currentProgress: Number

  const progressList = [
    {
      step: 1,
      text: "YOUR INFO",
    },
    {
      step: 2,
      text: "SELECT PLAN",
    },
    {
      step: 3,
      text: "ADD-ONS",
    },
    {
      step: 4,
      text: "SUMMARY",
    },
  ]
</script>

<div class="flex place-items-start justify-center gap-4 gap-y-8 md:flex-col">
  <!-- s -->
  {#each progressList as progress}
    <div class="flex items-center gap-4">
      <div
        class="grid h-10 w-10 place-content-center rounded-full border {currentProgress ===
        progress.step || Number(currentProgress) > 4 && progress.step === 4
          ? 'bg-primary-light-blue text-black'
          : 'text-white'}"
      >
        {progress.step}
      </div>

      <div class="grid uppercase text-white max-md:hidden">
        <p class="text-sm text-neutral-cool-gray">STEP {progress.step}</p>
        <p class="font-bold">{progress.text}</p>
      </div>
    </div>
  {/each}
</div>
