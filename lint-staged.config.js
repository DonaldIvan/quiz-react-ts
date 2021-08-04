module.exports = {
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  '**/(*test|*proc).(ts|tsx)': () => 'yarn test',

  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  '**/*.(md|json|css)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
};
