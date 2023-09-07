const { join } = require('path');

/**
 * @type {import("puppeteer").LaunchOptions}
 */
module.exports = {
  // Puppeteer 실행 옵션을 설정합니다.
  headless: true, // Headless 모드로 실행할지 여부
  args: ['--no-sandbox', '--disable-setuid-sandbox'], // Chromium 실행 옵션 (보안 설정)
  userDataDir: join(dirname(__dirname, 'src', 'app', 'api'), '.cache', 'puppeteer'), // 캐시 디렉터리 설정
};