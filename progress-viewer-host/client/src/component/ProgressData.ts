class ReceivedData {
  data: ProgressData[];
  date: Date;

  constructor(data: ProgressData[], date: Date) {
    this.data = data;
    this.date = date;
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
