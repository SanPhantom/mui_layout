import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Lyric from '../../../components/Lyric/Lyric';
import { formatLyric } from '../../../components/Lyric/lyric.utils';
import { LyricProps } from '../../../components/Lyric/lyricType';
import baseAxios from '../../../config/axios.config';
import "./index.css"

interface ILyricPageProps {
}

const music_id = '1456286877';
const AudioEle = new Audio();

const LyricPage = () => {

  const [lyricData, setLyricData] = useState<LyricProps[]>([]);
  const [musicData, setMusicData] = useState<any>();

  const getData = () => {
    baseAxios.get('/song/detail', {
      params: {
        ids: music_id
      }
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        const { data } = res;
        setMusicData(data.songs[0])
      }
    })
  }

  const getLyric = () => {
    baseAxios.get("/lyric", {
      params: {
        id: music_id
      }
    }).then(res => {
      if (res.status === 200) {
        const { data } = res;
        setLyricData(formatLyric(data.lrc, data.klyric))
      }
    })
  }

  useEffect(() => {
    getLyric();
    getData();
    AudioEle.src = `https://music.163.com/song/media/outer/url?id=${music_id}.mp3`;
    
    document.body.appendChild(AudioEle);
  }, [])

  return (
    <div className="lyric-page">
      <div className="music-info">
        {musicData?.name}
        <Button onClick={() => AudioEle.play()}>播放</Button>
      </div>
      <div className="lyric-box">
      <Lyric 
        lyricList={lyricData} 
        audioPlayer={AudioEle} 
        renderItem={(item, index) => (
          <>
            <p>{item.lyric}</p>
            <p>{item.t_lyric}</p>
          </>
        )} />
      </div>
      
    </div>
  );
}

export default LyricPage