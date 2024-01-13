<template>
  <naive-config :hljs="hljs">
    <nuxt-loading-indicator color="#2563eb" :height="3" />
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </naive-config>
</template>

<script setup lang="ts">
import hljs from 'highlight.js/lib/core'

hljs.configure({ classPrefix: '' })

hljs.registerLanguage('realtime', () => ({
  contains: [
    {
      className: 'bg-blue-600 text-white p-1',
      begin: /info/
    },
    {
      className: 'bg-red-500 text-white p-1',
      begin: /error/
    },
    {
      className: 'bg-amber-500 text-white p-1',
      begin: /warn/
    },
    {
      className: 'bg-green-500 text-white p-1',
      begin: /success/
    }
  ]
}))

useSeoMeta({
  description: 'Remote management of ESP microcontrollers',
  ogTitle: 'ESP Admin',
  ogDescription: 'Remote management of ESP microcontrollers',
  ogImage: '/poster.png',
  ogUrl: 'https://esp-admin.tn',
  twitterTitle: 'ESP Admin',
  twitterDescription: 'Remote management of ESP microcontrollers',
  twitterImage: '/favicon.ico',
  twitterCard: 'summary'
})
</script>
