<template>
    <div>
        <n-h2>Settings</n-h2>

        <n-tabs type="line" animated>
            <n-tab-pane name="mqtt" tab="MQTT">
                <SettingsMqtt class="mt-4"></SettingsMqtt>
            </n-tab-pane>

            <n-tab-pane name="report" tab="Report">
                <SettingsReport class="mt-4"></SettingsReport>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>