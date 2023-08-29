<script lang="ts">
  import { enhance } from "$app/forms"
  import type { HTMLInputTypeAttribute } from "svelte/elements"

  type FormFields = {
    name: string
    text: string
    type: HTMLInputTypeAttribute
    placeholder: string
  }

  const formFields: FormFields[] = [
    {
      name: "name",
      text: "Name",
      type: "text",
      placeholder: "e.g. Stephen King",
    },
    {
      name: "email",
      text: "Email Addres",
      type: "email",
      placeholder: "e.g. stephenking@lorem.com",
    },
    {
      name: "phone",
      text: "Phone Number",
      type: "tel",
      placeholder: "e.g. +1 234 567 890",
    },
  ]

  export let zodIssues: Record<string, string>
</script>

<div class="grid gap-4">
  <div class="space-y-2">
    <h1>Personal Info</h1>
    <h2>Please provide your name, email adress, and phone number</h2>
  </div>

  <form
    id="1"
    class="w-full space-y-4"
    method="POST"
    action="?/personalInfo"
    use:enhance
  >
    <!-- form -->
    {#each formFields as formField}
      <div class="grid gap-1 text-primary-marine-blue">
        <div class="flex items-center">
          <label for="name">{formField.text}</label>
          {#if zodIssues && zodIssues[formField.name]}
            <span class="ml-auto font-semibold text-primary-strawberry-red">
              {zodIssues[formField.name]}
            </span>
          {/if}
        </div>
        <input
          class="h-12 rounded-md border p-2 px-4 outline-primary-marine-blue {zodIssues &&
            zodIssues[formField.name] &&
            'border-primary-strawberry-red'}"
          name={formField.name}
          type={formField.text}
          placeholder={formField.placeholder}
        />
      </div>
    {/each}
  </form>
</div>
