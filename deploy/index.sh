nuxt build
find .nuxt/ -name "*.map"  | xargs rm -f
rm -rf ../.nuxt/dist/server
node ./deploy
