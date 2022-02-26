import colors from 'colors';
import Terminal from './Terminal';
colors.enable();

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const welcomeMessage = (t) => {
  let lineCount = 0;

  const echo = async (text) => {
    await t.writeln(`$ ${text}`);
    lineCount += 1;
  };

  const waitForResponseAnimation = async (times = 2, interval = 150) => {
    await sleep(interval);
    await t.write('.');
    await sleep(interval);
    await t.write('.');
    await sleep(interval);
    await t.write('.');
    await sleep(interval);
    await t.write('\b \b\b \b\b \b');

    times && times-- && (await waitForResponseAnimation(times, interval));
  };

  return new Promise(async (resolve, reject) => {
    try {
      await echo(
        '-------------------------------------------------------\n\r' +
          '|  __      __ ___  _      ___   ___   __  __  ___        |\n\r' +
          '|  \\ \\    / /| __|| |    / __| / _ \\ |  \\/  || __|       |\n\r' +
          '|   \\ \\/\\/ / | _| | |__ | (__ | (_) || |\\/| || _|        |\n\r' +
          '|    \\_/\\_/  |___||____| \\___| \\___/ |_|  |_||___|       |\n\r' +
          '|          ___  _  _        __  __ __   __               |\n\r' +
          '|         |_ _|| \\| |      |  \\/  |\\ \\ / /               |\n\r' +
          '|          | | | .  |      | |\\/| | \\   /                |\n\r' +
          '|         |___||_|\\_|      |_|  |_|  |_|                 |\n\r' +
          '|  ___   ___   ___  _____  ___   ___   _     ___   ___   |\n\r' +
          '| | _ \\ / _ \\ | _ \\|_   _|| __| / _ \\ | |   |_ _| / _ \\  |\n\r' +
          '| |  _/| (_) ||   /  | |  | _| | (_) || |__  | | | (_) | |\n\r' +
          '| |_|   \\___/ |_|_\\  |_|  |_|   \\___/ |____||___| \\___/  |\n\r' +
          '|                                                        |\n\r' +
          ' --------------------------------------------------------\n\r'
      );

      await echo('Hello world!✋  My name is Felix.');
      await waitForResponseAnimation(2);

      await echo('I\'m a IT enthusiast and I doing cloud services in a big consulting firms');
      await waitForResponseAnimation(2);

      await echo('I\'m playing basket-ball 🏀 since my 7 year old.');
      await waitForResponseAnimation(2);

      await echo("I'm going to present you my home");
      await waitForResponseAnimation(2);

      await echo('But first let introduce myself');
      await waitForResponseAnimation(2);

      await echo('I come from ' + 'Fr'.blue + 'an'.white + 'ce'.red);
      await waitForResponseAnimation(2);
      await echo(
        'I promess you to show you my place before lets dive into it 🚀'
      );
      await waitForResponseAnimation(2);

      return resolve();
    } catch (error) {
      return reject();
    }
  });
};

export { welcomeMessage };
