import SwitchInfo from "./components/SwitchInfo";

class ProgressData {
  id: string;
  formerInfo: SwitchInfo[];
  latterInfo: SwitchInfo[];

  constructor(id: string, formerInfo: SwitchInfo[], latterInfo: SwitchInfo[]) {
    this.id = id;
    this.formerInfo = formerInfo;
    this.latterInfo = latterInfo;
  }

  toJson(): string {
    const fomerFlags = this.formerInfo.map((info) => info.value);
    const latterFlags = this.latterInfo.map((info) => info.value);
    const tmp = {
      id: this.id,
      formerInfo: fomerFlags,
      latterInfo: latterFlags
    };
    return JSON.stringify(tmp);
  }
}

export default ProgressData;