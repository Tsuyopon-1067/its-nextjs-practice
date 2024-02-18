import { useEffect, useState } from 'react';
import './App.css';
import styles from "./App.module.css";
import ProgressData from './ProgressData';
import SwitchInfo from './components/SwitchInfo';
import Switchs from './components/Switches';
import TopBar from './components/TopBar';

function App() {
  const [formerLabelInfos, setFormerLabelInfos] = useState<SwitchInfo[]>(
    [
      new SwitchInfo("雛形作成"),
      new SwitchInfo("起動"),
      new SwitchInfo("ページ編集"),
      new SwitchInfo("変数の表示"),
      new SwitchInfo("ボタンの追加"),
      new SwitchInfo("UseState の導入"),
      new SwitchInfo("外部サーバへのアクセス"),
      new SwitchInfo("他の都道府県の表示")
    ]
  );
  const [latterLabelInfos, setLatterLabelInfos] = useState<SwitchInfo[]>(
    [
      new SwitchInfo("都道府県データのクラス化"),
      new SwitchInfo("コンポーネントの導入"),
      new SwitchInfo("NowLoading を作ってみる"),
    ]
  );
  const [id, setId] = useState<string>("");
  const [addr, setAddr] = useState<string>("");

  useEffect(() => {
    const tmp = new ProgressData(id, formerLabelInfos, latterLabelInfos);
    const strTmp = tmp.toJson();
    postData(strTmp);
  }, [id, addr, formerLabelInfos, latterLabelInfos]);

  const postData = (data: string) => {
    const url = `http://${addr}/json`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className={styles.main_div}>
      <div className={styles.header}>
        <TopBar onchangeId={setId} onchangeAddr={setAddr} />
      </div>
      <div className={styles.sw_div}>
        <p className={styles.title_p}>基本</p>
        <Switchs labels={formerLabelInfos} handler={setFormerLabelInfos} />
        <br />
        <p className={styles.title_p}>発展</p>
        <Switchs labels={latterLabelInfos} handler={setLatterLabelInfos} />
      </div>
    </div>
  )
}

export default App
