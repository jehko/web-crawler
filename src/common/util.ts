import moment, { duration, DurationInputArg1 } from "moment";

const util = {
  date: {
    formatToFullStr(_date: Date) {
      const yyyy = _date.getFullYear().toString();
      const mm = this.pad(_date.getMonth() + 1, 2);
      const dd = this.pad(_date.getDate(), 2);
      const hh = this.pad(_date.getHours(), 2);
      const mi = this.pad(_date.getMinutes(), 2);
      const ss = this.pad(_date.getSeconds(), 2);

      return yyyy + mm + dd + hh + mi + ss;
    },
    pad(number: number, length: number) {
      let str = "" + number;
      while (str.length < length) {
        str = "0" + str;
      }
      return str;
    },
    subtract(diffText: string) {
      let agoText = diffText.replace(/[0-9]/g, "");
      let agoNum = diffText.replace(/[^0-9]/g, "");

      let duration: moment.Duration | undefined;
      if (agoText.indexOf('초전') > -1) {
        duration = moment.duration(parseInt(agoNum), 'seconds');
      } else if (agoText.indexOf('분전') > -1) {
        duration = moment.duration(parseInt(agoNum), 'minutes');
      } else if (agoText.indexOf('시간전') > -1) {
        duration = moment.duration(parseInt(agoNum), 'hours');
      } else if (agoText.indexOf('일전') > -1) {
        duration = moment.duration(parseInt(agoNum), 'days');
      } else if (agoText.indexOf('주전') > -1) {
        duration = moment.duration(parseInt(agoNum), 'weeks');
      } else if (agoText.indexOf('개월전') > -1) {
        duration = moment.duration(parseInt(agoNum), 'months');
      }
      
      return moment().subtract(duration).format('YYYYMMDDHHmmss');
      
    }
  },
  
  interval: {
    sleep: async (min: number, max: number) => {
      let sleepTime = Math.floor(Math.random() * (max - min) + min);
      console.log("waiting for ", sleepTime / 1000, "seconds");
      return new Promise((resolve) => setTimeout(resolve, sleepTime));
    }
  }
};


export default util;