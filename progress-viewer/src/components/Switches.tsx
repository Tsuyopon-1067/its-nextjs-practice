import { Switch } from '@mui/material';
import React from 'react';
import SwitchInfo from './SwitchInfo';
import styles from "./Switches.module.css";

interface SwitchProps {
  labels: SwitchInfo[];
  handler: (arg: SwitchInfo[]) => (void);
}

function Switches({ labels, handler }: SwitchProps) {
  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStates = [...labels];
    // スイッチの値を更新
    newStates[index].value = event.target.checked;
    // 状態を更新
    handler(newStates);
  };

  return (
    <div>
      {labels.map((info, index) => (
        <div className={styles.grid} key={index}>
          <span className={styles.label}>{info.label}</span>
          <div className={styles.sw_div}>
            <Switch checked={labels[index].value} onChange={handleChange(index)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Switches;