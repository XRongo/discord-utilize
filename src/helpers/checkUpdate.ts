import https from "https";
import { version as currentVersion } from "../../package.json";
import * as console from "./log";

export default function checkForUpdates() {
    const packageName = "discord-utils";

    https
        .get(`https://registry.npmjs.org/${packageName}/latest`, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                const latestVersion = JSON.parse(data).version;
                if (!latestVersion) return;
                if (currentVersion !== latestVersion) {
                    console.info(
                        `A new version of ${packageName} is available! (${latestVersion})`,
                    );
                }
            });
        })
        .on("error", (err) => {
            console.error("Error checking for updates:", err.message);
        });
}
