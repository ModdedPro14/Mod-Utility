import "./management/WatchDogTermination.js";
import "./config/main.js";
const Plugins = ["anticheat", "Ranks", "floating item name", "commands", "bow", "damage indicators", "welcome", "teams", "pearl timer", 'ban']



for (const plugin of Plugins) {

  const start = Date.now();

  import(`./plugins/${plugin}/main.js`)

    .then(() => {

      console.warn(

        `Successfully loadded ${plugin} system in ${Date.now() - start}MS`

      );

    })

    .catch((error) => {

      console.warn(`Error on Loading Plugin ${plugin}: ` + error + error.stack);

    });

}
