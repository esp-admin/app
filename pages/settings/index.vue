<template>
  <div>
    <div class="flex gap-2 items-center mb-4">
      <naive-icon name="ph:gear" />
      <n-text class="col-span-full text-lg" strong>
        Settings
      </n-text>
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane name="mqtt" tab="MQTT">
        <SettingsMqtt class="mt-4" />
      </n-tab-pane>

      <n-tab-pane name="report" tab="Report">
        <SettingsReport class="mt-4" />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
