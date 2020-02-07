# https://khalilstemmler.com/blogs/typescript/node-starter-project/
# https://github.com/stemmlerjs/simple-typescript-starter

cd your folder
npm init -y
npm install typescript --save-dev
npm install @types/node --save-dev
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true

# create src folder
mkdir src
touch src/index.ts

#compile
npx tsc

# cold reloading
npm install --save-dev ts-node nodemon

# save a package
npm install --save-dev rimraf