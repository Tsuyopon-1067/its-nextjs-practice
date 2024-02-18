class ReceivedData {
  data: ProgressData[];
  time: string;

  constructor(data: ProgressData[], time: string) {
    this.data = data;
    this.time = time;
  }
}

class ProgressData {
  id: string;
  formerInfo: boolean[];
  latterInfo: boolean[];

  constructor(id: string, formerInfo: boolean[], latterInfo: boolean[]) {
    this.id = id;
    this.formerInfo = formerInfo;
    this.latterInfo = latterInfo;
  }
}

export { ProgressData, ReceivedData };

