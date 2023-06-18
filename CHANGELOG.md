# Changelog


## v0.0.5

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.4...v0.0.5)


### 🚀 Enhancements

  - Add Footer ([077c633](https://github.com/becem-gharbi/esp-admin/commit/077c633))

### 🩹 Fixes

  - Fix layouts conflict ([0b7f811](https://github.com/becem-gharbi/esp-admin/commit/0b7f811))
  - Add missing SEO tags ([61ee112](https://github.com/becem-gharbi/esp-admin/commit/61ee112))
  - Disallow project remove having linked devices ([78eb6ab](https://github.com/becem-gharbi/esp-admin/commit/78eb6ab))
  - Specify extension in firmware upload ([5d71a82](https://github.com/becem-gharbi/esp-admin/commit/5d71a82))
  - Add missing client side regex validations ([ddd801f](https://github.com/becem-gharbi/esp-admin/commit/ddd801f))
  - Check if names starts or ends with spaces ([6f62496](https://github.com/becem-gharbi/esp-admin/commit/6f62496))
  - Fix tailwind fontSize get ([2210180](https://github.com/becem-gharbi/esp-admin/commit/2210180))

### 💅 Refactors

  - Disable default layout on landing page ([296d89a](https://github.com/becem-gharbi/esp-admin/commit/296d89a))
  - Use naive n-time for date display ([109a489](https://github.com/becem-gharbi/esp-admin/commit/109a489))
  - Display Footer on landing page ([a71c70c](https://github.com/becem-gharbi/esp-admin/commit/a71c70c))
  - Change font family to Inter ([ddd7051](https://github.com/becem-gharbi/esp-admin/commit/ddd7051))
  - Update naive colors ([2bc6d35](https://github.com/becem-gharbi/esp-admin/commit/2bc6d35))
  - Replace view btn with card click ([cda33a5](https://github.com/becem-gharbi/esp-admin/commit/cda33a5))
  - Use responsive instead of fixed heights ([7dfed55](https://github.com/becem-gharbi/esp-admin/commit/7dfed55))
  - Remove card on auth forms ([16f4da4](https://github.com/becem-gharbi/esp-admin/commit/16f4da4))
  - Implement  minor UI changes ([ef36bc8](https://github.com/becem-gharbi/esp-admin/commit/ef36bc8))
  - Apply minor UI refactoring ([3c8b8a9](https://github.com/becem-gharbi/esp-admin/commit/3c8b8a9))
  - Aplly minor UI refactoring ([e551df2](https://github.com/becem-gharbi/esp-admin/commit/e551df2))
  - Apply minor UI refactoring ([8b47b32](https://github.com/becem-gharbi/esp-admin/commit/8b47b32))
  - Add logos light & dark ([35ac3fb](https://github.com/becem-gharbi/esp-admin/commit/35ac3fb))
  - Add empty projects & devices & releases UI ([24f1955](https://github.com/becem-gharbi/esp-admin/commit/24f1955))
  - Set modal size to default ([7c105b3](https://github.com/becem-gharbi/esp-admin/commit/7c105b3))
  - Change footer height to 48px ([0179aca](https://github.com/becem-gharbi/esp-admin/commit/0179aca))

### 🏡 Chore

  - **design:** Add backend design rev-4 ([9bf2ff7](https://github.com/becem-gharbi/esp-admin/commit/9bf2ff7))
  - Configure Renovate ([9f07506](https://github.com/becem-gharbi/esp-admin/commit/9f07506))
  - Move logos to assets directory ([eb29b0b](https://github.com/becem-gharbi/esp-admin/commit/eb29b0b))

### ❤️  Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))
- Becem ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.4

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.2...v0.0.4)


### 🚀 Enhancements

  - Implement project metadata & variables & commands ([3a1ffeb](https://github.com/becem-gharbi/esp-admin/commit/3a1ffeb))
  - Implement device metadata & variables & commands ([860f389](https://github.com/becem-gharbi/esp-admin/commit/860f389))
  - Implement Release state management ([b330fbc](https://github.com/becem-gharbi/esp-admin/commit/b330fbc))
  - Implement firmware upload ([aed98cb](https://github.com/becem-gharbi/esp-admin/commit/aed98cb))
  - Implement firmware delete ([c96d41c](https://github.com/becem-gharbi/esp-admin/commit/c96d41c))
  - Implement mqtt & report state management ([eb78886](https://github.com/becem-gharbi/esp-admin/commit/eb78886))
  - Implement mqtt settings update ([e36e3a8](https://github.com/becem-gharbi/esp-admin/commit/e36e3a8))
  - Implement report settings update ([4cb2fbe](https://github.com/becem-gharbi/esp-admin/commit/4cb2fbe))

### 🔥 Performance

  - Select only needed fields on findMany ([2d563fb](https://github.com/becem-gharbi/esp-admin/commit/2d563fb))

### 🩹 Fixes

  - **models:** Change variables type to Json in Device ([1168306](https://github.com/becem-gharbi/esp-admin/commit/1168306))
  - Unlink devices on project delete ([80502b2](https://github.com/becem-gharbi/esp-admin/commit/80502b2))
  - Fix input search by name ([087a941](https://github.com/becem-gharbi/esp-admin/commit/087a941))
  - **models:** Update MQTT schema ([ded5722](https://github.com/becem-gharbi/esp-admin/commit/ded5722))
  - **models:** Rename bagsnagKey to bugsnagKey in Report ([2221b5f](https://github.com/becem-gharbi/esp-admin/commit/2221b5f))

### 💅 Refactors

  - Move device unlink to device page ([0b22737](https://github.com/becem-gharbi/esp-admin/commit/0b22737))
  - Display error message on delete project having release(s) ([5711333](https://github.com/becem-gharbi/esp-admin/commit/5711333))
  - Update s3 permissions ([e7672fd](https://github.com/becem-gharbi/esp-admin/commit/e7672fd))
  - Set form feedback padding to 8px ([8e2e53e](https://github.com/becem-gharbi/esp-admin/commit/8e2e53e))

### 🌊 Types

  - Expose prisma types globally ([b7350b2](https://github.com/becem-gharbi/esp-admin/commit/b7350b2))

### 🏡 Chore

  - Add example.env ([eb36048](https://github.com/becem-gharbi/esp-admin/commit/eb36048))
  - Enable ssr ([30c95a5](https://github.com/becem-gharbi/esp-admin/commit/30c95a5))
  - Disable GTAG in development ([d6ab785](https://github.com/becem-gharbi/esp-admin/commit/d6ab785))
  - Enable SSR ([10594c1](https://github.com/becem-gharbi/esp-admin/commit/10594c1))
  - Enable ssr only in production ([b93760d](https://github.com/becem-gharbi/esp-admin/commit/b93760d))
  - **release:** V0.0.3 ([ee60667](https://github.com/becem-gharbi/esp-admin/commit/ee60667))

### ❤️  Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.3

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.2...v0.0.3)


### 🚀 Enhancements

  - Implement project metadata & variables & commands ([3a1ffeb](https://github.com/becem-gharbi/esp-admin/commit/3a1ffeb))
  - Implement device metadata & variables & commands ([860f389](https://github.com/becem-gharbi/esp-admin/commit/860f389))
  - Implement Release state management ([b330fbc](https://github.com/becem-gharbi/esp-admin/commit/b330fbc))
  - Implement firmware upload ([aed98cb](https://github.com/becem-gharbi/esp-admin/commit/aed98cb))
  - Implement firmware delete ([c96d41c](https://github.com/becem-gharbi/esp-admin/commit/c96d41c))
  - Implement mqtt & report state management ([eb78886](https://github.com/becem-gharbi/esp-admin/commit/eb78886))
  - Implement mqtt settings update ([e36e3a8](https://github.com/becem-gharbi/esp-admin/commit/e36e3a8))
  - Implement report settings update ([4cb2fbe](https://github.com/becem-gharbi/esp-admin/commit/4cb2fbe))

### 🔥 Performance

  - Select only needed fields on findMany ([2d563fb](https://github.com/becem-gharbi/esp-admin/commit/2d563fb))

### 🩹 Fixes

  - **models:** Change variables type to Json in Device ([1168306](https://github.com/becem-gharbi/esp-admin/commit/1168306))
  - Unlink devices on project delete ([80502b2](https://github.com/becem-gharbi/esp-admin/commit/80502b2))
  - Fix input search by name ([087a941](https://github.com/becem-gharbi/esp-admin/commit/087a941))
  - **models:** Update MQTT schema ([ded5722](https://github.com/becem-gharbi/esp-admin/commit/ded5722))
  - **models:** Rename bagsnagKey to bugsnagKey in Report ([2221b5f](https://github.com/becem-gharbi/esp-admin/commit/2221b5f))

### 💅 Refactors

  - Move device unlink to device page ([0b22737](https://github.com/becem-gharbi/esp-admin/commit/0b22737))
  - Display error message on delete project having release(s) ([5711333](https://github.com/becem-gharbi/esp-admin/commit/5711333))
  - Update s3 permissions ([e7672fd](https://github.com/becem-gharbi/esp-admin/commit/e7672fd))
  - Set form feedback padding to 8px ([8e2e53e](https://github.com/becem-gharbi/esp-admin/commit/8e2e53e))

### 🌊 Types

  - Expose prisma types globally ([b7350b2](https://github.com/becem-gharbi/esp-admin/commit/b7350b2))

### 🏡 Chore

  - Add example.env ([eb36048](https://github.com/becem-gharbi/esp-admin/commit/eb36048))
  - Enable ssr ([30c95a5](https://github.com/becem-gharbi/esp-admin/commit/30c95a5))
  - Disable GTAG in development ([d6ab785](https://github.com/becem-gharbi/esp-admin/commit/d6ab785))
  - Enable SSR ([10594c1](https://github.com/becem-gharbi/esp-admin/commit/10594c1))
  - Enable ssr only in production ([b93760d](https://github.com/becem-gharbi/esp-admin/commit/b93760d))

### ❤️  Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.2

[compare changes](https://github.com/becem-gharbi/esp-admin/compare/v0.0.1...v0.0.2)


### 🚀 Enhancements

  - **models:** Update prisma schema ([e2b92b6](https://github.com/becem-gharbi/esp-admin/commit/e2b92b6))
  - Implement project get & create & delete ([d8473f0](https://github.com/becem-gharbi/esp-admin/commit/d8473f0))
  - Implement device get & create & delete ([d85fb96](https://github.com/becem-gharbi/esp-admin/commit/d85fb96))
  - Implement device link & unlink ([d79243c](https://github.com/becem-gharbi/esp-admin/commit/d79243c))
  - Implement devices & projects search ([ac92a77](https://github.com/becem-gharbi/esp-admin/commit/ac92a77))
  - Implement device  state management ([00ffe64](https://github.com/becem-gharbi/esp-admin/commit/00ffe64))
  - Implement project state management ([dc120c9](https://github.com/becem-gharbi/esp-admin/commit/dc120c9))
  - Implement device link & unlink state management ([f128165](https://github.com/becem-gharbi/esp-admin/commit/f128165))

### 🩹 Fixes

  - Handle device & project not found ([1d25c07](https://github.com/becem-gharbi/esp-admin/commit/1d25c07))
  - Hide dropdown navigation responsivly ([8c7df23](https://github.com/becem-gharbi/esp-admin/commit/8c7df23))

### 💅 Refactors

  - Apply changes for consistency ([dd2cdc6](https://github.com/becem-gharbi/esp-admin/commit/dd2cdc6))
  - Format builtin components to snakeCase ([698ebac](https://github.com/becem-gharbi/esp-admin/commit/698ebac))
  - Move default layout to app.vue ([af89b73](https://github.com/becem-gharbi/esp-admin/commit/af89b73))
  - Add home to main navbar ([332c590](https://github.com/becem-gharbi/esp-admin/commit/332c590))

### 🏡 Chore

  - **design:** Add backend design rev-3 ([39f5e35](https://github.com/becem-gharbi/esp-admin/commit/39f5e35))
  - Set version to 0.0.1 ([aaec598](https://github.com/becem-gharbi/esp-admin/commit/aaec598))

### ❤️  Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

## v0.0.1


### 🚀 Enhancements

  - Add Google Analytics ([dcec67c](https://github.com/becem-gharbi/esp-admin/commit/dcec67c))
  - Create basic ui ([506e5aa](https://github.com/becem-gharbi/esp-admin/commit/506e5aa))
  - Add basic modals ([1be72cc](https://github.com/becem-gharbi/esp-admin/commit/1be72cc))

### 🩹 Fixes

  - **config:** Disable xssValidator on `api/s3/object/create` endpoint ([aa5a05d](https://github.com/becem-gharbi/esp-admin/commit/aa5a05d))

### 💅 Refactors

  - Remove Fcm and prepare project ([6132068](https://github.com/becem-gharbi/esp-admin/commit/6132068))
  - **layout:** Add homepage and github redirects ([1a1c9c4](https://github.com/becem-gharbi/esp-admin/commit/1a1c9c4))
  - Add page transitions ([d9d14d5](https://github.com/becem-gharbi/esp-admin/commit/d9d14d5))
  - Auth layout ([b28ad0b](https://github.com/becem-gharbi/esp-admin/commit/b28ad0b))
  - Add device status ([e095e56](https://github.com/becem-gharbi/esp-admin/commit/e095e56))
  - Settings spacing ([3de93f7](https://github.com/becem-gharbi/esp-admin/commit/3de93f7))
  - Add create release modal ([f64bf8f](https://github.com/becem-gharbi/esp-admin/commit/f64bf8f))
  - Add cancel btn in modals ([f8e7cec](https://github.com/becem-gharbi/esp-admin/commit/f8e7cec))
  - **ui:** Session card ([12ad779](https://github.com/becem-gharbi/esp-admin/commit/12ad779))
  - **models:** Remove birthday in User ([1c4ae6e](https://github.com/becem-gharbi/esp-admin/commit/1c4ae6e))

### 📖 Documentation

  - **readme:** Add features and global architecture ([c9a41dc](https://github.com/becem-gharbi/esp-admin/commit/c9a41dc))
  - Update architecture ([b308c60](https://github.com/becem-gharbi/esp-admin/commit/b308c60))
  - **readme:** Update components section ([d45c211](https://github.com/becem-gharbi/esp-admin/commit/d45c211))
  - **readme:** Fix typos ([0b7ff09](https://github.com/becem-gharbi/esp-admin/commit/0b7ff09))
  - **readme:** Update README ([077730e](https://github.com/becem-gharbi/esp-admin/commit/077730e))
  - **readme:** Update README.md ([30d926a](https://github.com/becem-gharbi/esp-admin/commit/30d926a))
  - **readme:** Update README.md ([2c38abe](https://github.com/becem-gharbi/esp-admin/commit/2c38abe))

### 🏡 Chore

  - **design:** Add ui design rev-0 ([c5c4339](https://github.com/becem-gharbi/esp-admin/commit/c5c4339))
  - **design:** Add ui design rev-1 ([9710727](https://github.com/becem-gharbi/esp-admin/commit/9710727))
  - **design:** Add ui design rev-2 ([f7dcf8e](https://github.com/becem-gharbi/esp-admin/commit/f7dcf8e))
  - **design:** Add ui design rev-3 ([238078e](https://github.com/becem-gharbi/esp-admin/commit/238078e))
  - **design:** Add backend design rev-0 ([0c6faa1](https://github.com/becem-gharbi/esp-admin/commit/0c6faa1))
  - **design:** Backend design add rev-1 ([2ba3819](https://github.com/becem-gharbi/esp-admin/commit/2ba3819))
  - **design:** Add backend design rev-2 ([8618825](https://github.com/becem-gharbi/esp-admin/commit/8618825))
  - **design:** Add ui design rev-4 ([a58f750](https://github.com/becem-gharbi/esp-admin/commit/a58f750))

### ❤️  Contributors

- Becem Gharbi ([@becem-gharbi](http://github.com/becem-gharbi))

