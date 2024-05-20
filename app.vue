<template>
  <naive-config>
    <nuxt-loading-indicator
      color="#2563eb"
      :height="3"
    />
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </naive-config>
</template>

<script setup lang="ts">
useSeoMeta({
  description: 'Remote management of ESP microcontrollers',
  ogTitle: 'ESP Admin',
  ogDescription: 'Remote management of ESP microcontrollers',
  ogImage: '/poster.png',
  ogUrl: 'https://esp-admin.tn',
  twitterTitle: 'ESP Admin',
  twitterDescription: 'Remote management of ESP microcontrollers',
  twitterImage: '/favicon.ico',
  twitterCard: 'summary',
})
</script>
