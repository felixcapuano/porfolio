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
  };

  const typingEffect = async (text) => {
    const writeLetter = async (text, pos) => {
      await t.write(text[pos]);
      pos++;
      await sleep(Math.floor(Math.random() * 100) + 1);
      if (text.length > pos) await writeLetter(text, pos);
    };
    let position = 0;
    await writeLetter(text, position);
  };

  const typingSequence = async (text) => {
    await typingEffect(text);
    await t.write('\n\r$ ');
    await sleep(200);
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

  const waitingKeypress = () => {
    return new Promise((resolve) => t.onKey(resolve));
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

      await t.write('$ ');
      await typingSequence('Hello world!✋');
      await typingSequence('My name is ' + 'Felix'.bgCyan + '.');
      await typingSequence("I'm going to introduce myself.");
      await typingSequence(
        'I live in ' + 'Fr'.bgBlue + 'an'.bgWhite + 'ce'.bgRed + '.'
      );
      await typingSequence("I'm a " + 'IT enthusiast 💻 '.bgMagenta + '.');

      await typingSequence(
        'I work as a ' + 'cloud devops engineer ☁️ '.bgBlue + '.'
      );
      await typingSequence(
        'I love playing ' + 'basket-ball 🏀 '.bgYellow + ' every week.'
      );
      await typingSequence(
        'I like to play ' + 'video games 🕹️ '.bgRed + ' with my friend.'
      );
      await typingSequence(
        'Are you ready to visit ' + 'my world 🌎 '.bgGreen + '?'
      );
      await t.writeln('\b \b\b \bType enter to continue');
      await waitingKeypress();

      await echo('Lets go ! 🚀');
      // await sleep(2000);
      // await t.clear()

      return resolve();
    } catch (error) {
      return reject();
    }
  });
};

export { welcomeMessage };
