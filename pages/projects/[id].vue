<template>
    <div>
        <div class="flex justify-between mb-4">
            <n-h2>{{ $route.params.id }}</n-h2>
            <n-button type="error" secondary>Delete project</n-button>
        </div>

        <n-tabs type="line" animated>
            <n-tab-pane name="metadata" tab="Metadata">
                <ProjectMetadata class="mt-4"></ProjectMetadata>
            </n-tab-pane>

            <n-tab-pane name="variables" tab="Variables">
                <ProjectVariables class="mt-4"></ProjectVariables>
            </n-tab-pane>

            <n-tab-pane name="commands" tab="Commands">
                <ProjectCommands class="mt-4"></ProjectCommands>
            </n-tab-pane>

            <n-tab-pane name="devices" tab="Devices">
                <ProjectDevices class="mt-4"></ProjectDevices>
            </n-tab-pane>

            <n-tab-pane name="releases" tab="Releases">
                <ProjectReleases class="mt-4"></ProjectReleases>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>