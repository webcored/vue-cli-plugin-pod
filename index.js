module.exports = (api) => {
  api.registerCommand(
    'greet',
    {
      description: 'Writes a greeting to the console',
      usage: 'vue-cli-service greet'
    },
    () => {
      console.log(`👋  Hello`)
    }
  )
}
