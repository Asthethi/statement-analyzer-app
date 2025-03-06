export class ChartData {
  name: string;
  y: number;

  constructor(name: string, y: number) {
    this.name = name;
    this.y = y;
  }
}

export class ChartConfig {
  title: string;
  type: string;
  data: ChartData[];

  constructor(title: string, type: string, data: ChartData[]) {
    this.title = title;
    this.type = type;
    this.data = data;
  }
}
