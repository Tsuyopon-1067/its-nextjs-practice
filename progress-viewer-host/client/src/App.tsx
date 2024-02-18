import { useState } from 'react';
import './App.css';
import styles from "./App.module.css";
import ProgressTable from './component/ProgressTable';
import TopBar from './component/TopBar';

function App() {
  const [addr, setAddr] = useState<string>("");
  return (
    <div className={styles.main_div}>
      <div className={styles.header}>
        <TopBar onchangeAddr={setAddr} />
      </div>
      <div className={styles.table_div}>
        <ProgressTable addr={addr} />
      </div>
    </div>
  )
}

export default App
