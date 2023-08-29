<script lang="ts">
  import IconThankYou from "$lib/assets/images/icon-thank-you.svg?raw"
  import { planInformation } from "$lib/stores"

  $: planInformation.subscribe((value) => {
    console.log(value)
  })
</script>

<div class="grid justify-items-center gap-10 py-16">
  <span>{@html IconThankYou}</span>

  <div class="space-y-2 text-center">
    <h1>Thank you!</h1>
    <h2>
      Thanks for confirming your subscription! We hope you have fun using our
      platform. If you ever need support, please feel free to email us at
      support@loremgaming.com
    </h2>
  </div>
</div>
