export default {
  getOptions: function getOptions() {
    const options = {
      headless: true,
      ignoreHTTPSErrors: true,
      /* executablePath: 'google-chrome-unstable', */
      args: [
        // '--disable-setuid-sandbox',
        '--no-sandbox',
        '--disable-web-security',
        '--disable-dev-shm-usage',
        '--enable-features=NetworkService',
        //'--enable-logging', '--v=1'
      ]

    };
    return options;
  }
};