import { chromium, firefox, Page } from "playwright-core";
import util from "../common/util";

const URL_ORIGIN = "https://chimhaha.net";

const goToPostAndGetInfo = async (page: Page, link: string) => {
  await page.goto(link);
  const category = await page.$eval(
    "#article .item .info .category",
    (p) => p.textContent
  );
  const title = await page.$eval(
    '#article input[name="title"]',
    (el) => el.value
  );
  const content = await page.$eval(
    "#article .item .content.ck-content",
    (p) => p.textContent
  );
  const datetime = await page.$eval(
    "#article .item .info .etc .datetime",
    (p) => p.textContent
  );

  const author = await page.$eval(
    "#article .item .info .etc .nickName",
    (p) => p.textContent
  );

  const item = {
    category: category.replace(/\n/g, ""),
    title,
    content,
    datetime: util.date.subtract(datetime),
    author: author.replace(/\n/g, ""),
    link,
    //comment,
  };

  return item;
};

const crawlChimhaha = async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const url = URL_ORIGIN + "/new";

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await util.interval.sleep(1000, 2000);

  const postList = await page.$$("#boardList:not(.notice) .item");

  let links = [];
  for (let i = 0; i < postList.length; i++) {
    const link = await postList[i].getAttribute("href");
    if (link) links.push(URL_ORIGIN + link);
  }

  for (let link of links) {
    if (!link) continue;
    const item = await goToPostAndGetInfo(page, link);
    console.log(item);
    await util.interval.sleep(1000, 2000);
  }
};

export default crawlChimhaha;
