// TODO

// storybook-test-runner doesn't recognise stories in the svelte-csf format (https://github.com/storybookjs/test-runner/issues/262).
// this causes our test suite to fail in CI because it can't see any tests. As a workaround, this file exports an empty test suite
// that's visible only to test-runner, so it doesn't choke.

export default {};
