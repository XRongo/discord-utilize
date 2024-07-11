import chalk from "chalk";

export function info(message: string): void {
    console.info(
        `[${chalk.cyanBright("Discord Utilize")}] [${chalk.blue("INFO")}] ${chalk.blue(message)}`,
    );
}

export function warn(...message: unknown[]): void {
    const warnMessage = message
        .map((msg) => {
            if (msg instanceof Error) {
                return `${chalk.yellow(msg.message)}\n${chalk.gray(msg.stack)}`;
            }
            return chalk.yellow(msg);
        })
        .join(" ");

    console.log(
        `[${chalk.cyanBright("Discord Utilize")}] [${chalk.yellow("WARN")}] ${warnMessage}`,
    );
}

export function error(...message: unknown[]): void {
    const errorMessage = message
        .map((msg) => {
            if (msg instanceof Error) {
                return `${chalk.red(msg.message)}\n${chalk.gray(msg.stack)}`;
            }
            return chalk.red(msg);
        })
        .join(" ");

    console.error(
        `[${chalk.cyanBright("Discord Utilize")}] [${chalk.red("ERROR")}] ${errorMessage}`,
    );
}

export function success(message: string): void {
    console.log(
        `[${chalk.cyanBright("Discord Utilize")}] [${chalk.yellow("SUCCESS")}] ${chalk.green(message)}`,
    );
}
