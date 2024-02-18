import { useState } from 'react';
import './App.css';
import styles from "./App.module.css";
import SwitchInfo from './components/SwitchInfo';
import Switchs from './components/Switches';

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

  return (
    <div className={styles.main_div}>
      <p className={styles.title_p}>基本</p>
      <Switchs labels={formerLabelInfos} handler={setFormerLabelInfos} />
      <p className={styles.title_p}>発展</p>
      <Switchs labels={latterLabelInfos} handler={setLatterLabelInfos} />
    </div>
  )
}

export default App
