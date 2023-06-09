<template>
    <div>
        <div class="flex justify-between mb-4">
            <n-h2>{{ $route.params.id }}</n-h2>
            <n-button type="error" secondary>Delete device</n-button>
        </div>

        <n-tabs type="line" animated>
            <n-tab-pane name="metadata" tab="Metadata">
                <DeviceMetadata class="mt-4"></DeviceMetadata>
            </n-tab-pane>

            <n-tab-pane name="variables" tab="Variables">
                <DeviceVariables class="mt-4"></DeviceVariables>
            </n-tab-pane>

            <n-tab-pane name="realtime" tab="Realtime">
                <DeviceRealtime class="mt-4"></DeviceRealtime>
            </n-tab-pane>

            <n-tab-pane name="deployments" tab="Deployments">
                <DeviceDeployments class="mt-4"></DeviceDeployments>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>