import { system } from "@minecraft/server";
import "./config/main.js"
const Plugins = ["anticheat", "Ranks", "floating item name", "commands", "bow", "damage indicators", "welcome", "teams", "pearl timer", 'ban']



for (const plugin of Plugins) {

  const start = Date.now();

  import(`./plugins/${plugin}/main.js`)

    .then(() => {

      console.warn(

        `Loaded Plugin: ${plugin} Successfully, in ${Date.now() - start} ms`

      );

    })

    .catch((error) => {

      console.warn(`Error on Loading Plugin ${plugin}: ` + error + error.stack);

    });

}
system.events.beforeWatchdogTerminate.subscribe(data => {
    data.cancel = true
});