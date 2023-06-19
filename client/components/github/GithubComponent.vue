<template>
  <div class="container m-auto flex mt-36">
    <div class="flex-1 text-center">

      <p class="text-xl mb-5 tracking-wider">Project updates</p>
      <div class="stats shadow-md shadow-[#FFFFFF]">

        <div class="stat">
          <div class="stat-title font-sans text-primary tracking-wider font-bold">Total changes</div>
          <div class="stat-value text-sm mt-3 hover:text-secondary duration-300">{{ totalChanges }}</div>
        </div>

        <div class="stat">
          <div class="stat-title font-sans text-primary tracking-wider font-bold">Latest change</div>
          <div class="stat-value text-sm mt-3 hover:text-secondary duration-300">{{ latestChangeDate }}</div>
        </div>

        <div class="stat">
          <div class="stat-title font-sans text-primary tracking-wider font-bold">Change author</div>
          <div class="stat-value text-sm mt-3 hover:text-secondary duration-300">{{ changeAuthor }}</div>
        </div>

        <div class="stat">
          <div class="stat-title font-sans text-primary tracking-wider font-bold">Change link</div>
          <div class="stat-value text-sm mt-3 hover:text-secondary duration-300">
            <a :href="changeLink" target="_blank">URL</a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const config = useRuntimeConfig();

const totalChanges = ref(null);
const latestChangeDate = ref(null);
const changeAuthor = ref(null);
const changeLink = ref(null);

// api request to project github profile
const request = await fetch(`https://api.github.com/repos/${config.public.GITHUB_USERNAME}/${config.public.GITHUB_REPOSITORY}/commits`, {
  headers: {
    'Authorization': `token ${config.public.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  }
});

// get the response
const response = await request.json();
// set total change value
totalChanges.value = response.length;
// set latest change value
latestChangeDate.value = response[0].commit.author.date.substring(0, 10);
// set latest commit author
changeAuthor.value = response[0].commit.author.name;
// set change history
changeLink.value = response[0].html_url;

</script>