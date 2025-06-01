const { chromium } = require('playwright');

async function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function autoLogin() {
  const browser = await chromium.launch({ headless: true }); 
  const context = await browser.newContext();
  const page = await context.newPage();

  const USER = process.env.USERNAME;
  const PASS = process.env.PASSWORD;

  try {
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.goto('https://a.apresenta.me/?cliente=5080');
    console.log('Página carregada.');

    await delay(5000);

    console.log('Preenchendo login...');
    await page.fill('input[name="username"]', USER);
    await page.fill('input[name="password"]', PASS);

    console.log('Clicando em login...');
    await page.click('button[data-action="submit"]');

    await delay(5000);

    console.log('Clicando na primeira notificação...');
    await page.waitForSelector('a[title="Abrir mais detalhes desta notificação"]', { timeout: 10000 });
    await page.click('a[title="Abrir mais detalhes desta notificação"]');

    await delay(5000);

    console.log('Confirmando o lead...');
    await page.waitForSelector('button.swal2-confirm.btn.btn-success.swal2-styled', { timeout: 10000 });
    await page.click('button.swal2-confirm.btn.btn-success.swal2-styled');

    await delay(5000);

    console.log('Script finalizado com sucesso.');

  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    await browser.close();
    console.log('Navegador fechado.');
  }
}

autoLogin();
