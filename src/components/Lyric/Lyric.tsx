import { findLastIndex } from 'lodash-es';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getScreenFps } from './lyric.utils';
import { LyricProps } from './lyricType';
import sports from './sports';

interface ILyricProps {
  lyricList: LyricProps[]; // 歌词列表
  audioPlayer: HTMLAudioElement;
  duration?: number; // 滚动间隔时间
  renderItem: (item: LyricProps, index: number) => React.ReactNode; // 歌词渲染
}

const Lyric = (props: ILyricProps) => {

  const {
    lyricList,
    audioPlayer,
    duration = 120,
    renderItem,
  } = props;

  const [current, setCurrent] = useState<number>(0);

  const lockRef = useRef<boolean>(false);
  const scrollHeight = useRef<number>(0);
  const scrollRef = useRef<number>(0);
  const durationRef = useRef<number>(0);
  

  const lyricRef = useRef<HTMLDivElement | null>(null);
 
  const delayRef = useRef<number | null>(null);
  const animation = useRef<number | null>(null);

  let animationStart: number = 0;

  // 获取当前歌词行数
  const getLyricCurrentLine = useCallback(() => {
    const { currentTime: ct, duration: dt } = audioPlayer;
    return new Promise<number>((resolve, reject) => {
      if (ct <= dt && dt !== 0 && lyricList.length > 0) {
        // const nodeEle = findLast(lyricList, lyric => Number(lyric.time) < ct * 1000);
        const index: number = findLastIndex(lyricList, lyric => Number(lyric.time) < ct * 1000);
        resolve(index);
      }
      resolve(0);
    })
  }, [lyricList, audioPlayer])

  // 歌词滚动函数
  const lyricScrollAnimation = (timestamp?: number) => {
    lockRef.current = true;
    animationStart++;
    const top = sports.linear(animationStart, scrollRef.current, scrollHeight.current, durationRef.current)
    lyricRef.current && (lyricRef.current.scrollTop = top);
    if (animationStart <= durationRef.current) {
      animation.current = window.requestAnimationFrame(lyricScrollAnimation);
    } else {
      scrollRef.current = top;
      clearScrollAnimation();
    }
  }

  // 清除歌词滚动事件
  const clearScrollAnimation = () => {
    if (animation.current) {
      window.cancelAnimationFrame(animation.current);
      animation.current = null;
    }
    lockRef.current = false;
    scrollHeight.current = 0;
    animationStart = 0;
  }

  // 获取滚动的高度
  const getLyricScrollHeight = (index: number) => {
    if (lyricRef.current && lyricRef.current.children.length > 0) {
      if (lyricRef.current.children[index]) {
        const currentLyricNode: HTMLDivElement = lyricRef.current.children[index] as HTMLDivElement;
        const firstLyricNode: HTMLDivElement = lyricRef.current.children[0] as HTMLDivElement;
        const sumTop = currentLyricNode.offsetTop - firstLyricNode.offsetTop;
        scrollHeight.current = sumTop - scrollRef.current;
      }
    }
    if (!lockRef.current && !animation.current) {
      animation.current = window.requestAnimationFrame(lyricScrollAnimation);
    }
  }

  // 歌曲播放当前时间变更事件
  const currentTimeUpdate = () => {
    getLyricCurrentLine().then((index: number) => {
      setCurrent(index);
      if (index !== current) {
        getLyricScrollHeight(index);
      }
    })
  }

  // 页面离屏事件
  const pageHiddenEvent = () => {
    const hiddenProperty = 'hidden' in document ? 'hidden' :
    'webkitHidden' in document ? 'webkitHidden' :
      'mozHidden' in document ? 'mozHidden' :
        null;
    const visibilityChangeEvent = hiddenProperty?.replace(/hidden/i, 'visibilitychange') as keyof DocumentEventMap;
    const handleVisibilityChange = () => {
      if (!document['hidden' || 'webkitHidden' || 'mozHidden']) {
        getLyricCurrentLine().then((index) => {
          getLyricScrollHeight(index);
        })
      }
    }
    document.addEventListener(visibilityChangeEvent, handleVisibilityChange)
  }

  const delayBackCurrent = useCallback(() => {
    if (delayRef.current) {
      window.clearTimeout(delayRef.current);
      delayRef.current = null;
    }
    delayRef.current = window.setTimeout(() => {
      scrollRef.current = lyricRef.current?.scrollTop || 0;
      getLyricCurrentLine().then((index) => {
        clearScrollAnimation();
        getLyricScrollHeight(index);
      })
    }, 3000)
  }, [])

  const handleTouchMove = () => {
    lockRef.current = true;
  }


  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.addEventListener('timeupdate', currentTimeUpdate);
      pageHiddenEvent();
    }
    if (lyricRef.current) {
      lyricRef.current.addEventListener('mousewheel', () => {
        lockRef.current = true;
        delayBackCurrent();
      })
      // 手动滚动存在问题
      lyricRef.current.addEventListener('touchstart', (e) => {
        lockRef.current = true;
        lyricRef.current && lyricRef.current.addEventListener('touchmove', handleTouchMove);
      })
      lyricRef.current.addEventListener('touchend', () => {
        delayBackCurrent();
        lyricRef.current && lyricRef.current.removeEventListener('touchmove', handleTouchMove);
      })
    }
    return () => {
      clearScrollAnimation();
      scrollRef.current = 0;
      setCurrent(0);
    }

  }, [lyricList, audioPlayer])

  useEffect(() => {
    // 获取屏幕刷新率
    if (getScreenFps) {
      getScreenFps().then((fps) => {
        durationRef.current = Math.ceil(fps * duration / 120);
      })
    }
  }, [])


  return (
    <div className="lyric-root" ref={lyricRef}>
      {
        Array.isArray(lyricList) && lyricList.map((item, index) => (
          <div className={`lyric-item ${current === index && 'active'}`} key={item.time}>
            {renderItem(item, index)}
          </div>
        ))
      }
    </div>
  );
}

export default Lyric