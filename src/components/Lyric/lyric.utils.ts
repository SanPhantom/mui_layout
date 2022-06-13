import { defaultsDeep, values } from "lodash-es";
import { LyricProps } from "./lyricType";

// 获取屏幕刷新率
export const getScreenFps = (() => {
  const nextFrame = window.requestAnimationFrame;
  if (!nextFrame) {
    console.log("requestAnimationFrame is not supported!");
    return;
  }
  return (targetCount = 100) => {
    if (targetCount < 1) throw new Error("targetCount cannot be less than 1");
    const beginData = Date.now();
    let count = 0;
    return new Promise<number>(resolve => {
      (function log() {
        nextFrame(() => {
          if (++count >= targetCount) {
            const diffDate = Date.now() - beginData;
            const fps = (count / diffDate) * 1000;
            return resolve(fps);
          }
          log();
        })
      })()
    })
  }
})();

export interface LyricObjProps {
  lyric: string;
  [x: string]: any
}

export const formatLyric = (lyricObj: LyricObjProps, tLyricObj: LyricObjProps) => {
  const { lyric } = lyricObj;
  const { lyric: tLyric } = tLyricObj;

  const lyricData = getLyricData(deleteLast(lyric.split(/\n/)));
  const tLyricData = getLyricData(deleteLast(tLyric.split(/\n/)), 't_lyric');

  return values(defaultsDeep(lyricData, tLyricData));
}

const deleteLast = (arr: string[], num: number = 1) => {
  const new_arr = arr.concat();
  for (let i = 0; i < num; i++) {
    new_arr.pop();
  }
  return new_arr;
}

const judgeLyric = (str: string) => {
  if (str.startsWith("[ti:")) {
    return false;
  } if (str.startsWith("[ar:")) {
    return false;
  } if (str.startsWith("[al:")) {
    return false;
  } if (str.startsWith("[by:")) {
    return false;
  }
  return true;
}

const time2Timestamp = (time: string) => {
  const pattern = time.indexOf('.') !== -1 ? /(.+):(.+)\.(.+)/ : /(.+):(.+)/;
  const timer = time.match(pattern) || []
  return ((Number(timer[1] || 0) * 60 + Number(timer[2] || 0)) * 1000 + Number(timer[3] || 0)).toString();
}

const getLyricData = (arr: string[], lKey: string = 'lyric') => {
  let lyricData: { [x: string]: LyricProps } = {};
  for (const i in arr) {
    if (judgeLyric(arr[i])) {
      let pattern = /\[(.{5,9})\](\[(.+)\])?(.+)?/;
      let data = arr[i].match(pattern);
      if (data) {
        const time = time2Timestamp(data[1]);
        lyricData[time] = {
          time: Number(time),
          [lKey]: data[4] ? data[4] : ''
        }
        if (data[2] && /[\d{2}:\d{2}(\.\d{2,3})?]/.test(data[2])) {
          const time = time2Timestamp(data[3]);
          lyricData[time] = {
            time: Number(time),
            [lKey]: data[4] ? data[4] : ''
          }
        }
      } else {
        lyricData[i] = {
          time: Number(999999 + i),
          [lKey]: arr[i],
        }
      }
    }
  }
  return lyricData;
}