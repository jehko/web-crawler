import { chromium, Page } from "playwright-core";
import util from "../common/util";

const goToPostAndGetInfo = async (page: Page, link: string) => {
  await page.goto(link);
  const category = await page.$eval(
    ".contents .left_cont .titles .word",
    (p) => p.textContent
  );
  const title = await page.$eval(
    ".contents .left_cont .titles",
    (p) => p.lastChild.textContent
  );
  const content = await page.$eval("#contentDetail", (p) => p.textContent);
  const datetime = await page.$eval(
    ".contents .left_cont .view_head .items .text3 .val",
    (p) => p.textContent
  );

  const author = await page.$eval(
    ".contents .left_cont .view_head .items .text .nick",
    (p) => p.textContent
  );

  const item = {
    category,
    title,
    content,
    datetime: util.date.formatToFullStr(new Date(datetime)),
    author,
    link,
    //comment,
  };

  return item;
};

const crawlKbotown = async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const url = "https://mlbpark.donga.com/mp/b.php?b=kbotown";

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await util.interval.sleep(1000, 2000);

  const postList = await page.$$(".tbl_type01 tbody tr td.t_left .tit a.txt");

  let links = [];
  for (let i = 0; i < postList.length; i++) {
    const link = await postList[i].getAttribute("href");
    if (link) links.push(link);
  }

  for (let link of links) {
    if (!link) continue;
    const item = await goToPostAndGetInfo(page, link);
    console.log(item);
    await util.interval.sleep(1000, 2000);
  }
};

export default crawlKbotown;
