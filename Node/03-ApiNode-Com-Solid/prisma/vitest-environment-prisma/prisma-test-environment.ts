import type { Environment } from 'vitest';

// @ts-ignore
export default <Environment>{
  name: 'prisma',
  transformMode: 'web',
  setup() {
    console.log('Executou ');

    return {
      teardown() {},
    };
  },
};
