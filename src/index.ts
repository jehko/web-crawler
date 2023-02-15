import puppeteer, { Page } from "puppeteer";


const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

let sleep_for = async (page: Page, min: number, max: number) => {
  let sleep_duration = randomIntFromInterval(min, max);
  console.log("waiting for ", sleep_duration / 1000, "seconds");
  await page.waitForTimeout(sleep_duration);
};

const scrapeKbotown = async () => {

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = "https://mlbpark.donga.com/mp/b.php?b=kbotown";
  await page.setViewport({
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
  });

  await page.goto(url, { waitUntil: "networkidle2" });
  await sleep_for(page, 1000, 2000);

  const selector = '//table[@class="tbl_type01"]/tbody/tr/td[@class="t_left"]/div[@class="tit"]/a[@class="txt"]';
  const titles = await page.$x(selector);

  for(let i = 0; i < titles.length; i++) {
    let title = await page.evaluate(el => el.innerText, titles[i]);
    console.log(title);
  }

};

const scrapeChimhaha = async () => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = "https://chimhaha.net/new";
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });

    await page.goto(url, { waitUntil: "networkidle2" });
    await sleep_for(page, 1000, 2000);

    const xpath = '//*[@id="boardList"]/a[@class="item"]/div[@class="info"]/div[@class="titleContainer"]/span[@class="title"]/span[@class="text"]';
    const titles = await page.$x(xpath);

    for(let i = 0; i < titles.length; i++) {
      let title = await page.evaluate(el => el.innerText, titles[i]);
      console.log(title);
    }

};

let main = async () => {
  await scrapeKbotown();
};

main();
