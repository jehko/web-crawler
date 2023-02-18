import { scheduleJob } from "node-schedule";
import crawlChimhaha from "./crawler/crawlChimhaha";
import crawlKbotown from "./crawler/crawlMLBPark";


const main = () => {
  scheduleJob('*/10 * * * *', () => {
    crawlKbotown();
  });

  scheduleJob('*/15 * * * *', () => {
    crawlChimhaha();
  });
};

main();
