import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'apps/web/vitest.config.ts',
  'packages/components/vitest.config.ts',
])
