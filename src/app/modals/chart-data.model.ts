export class ChartData {
  name: string;
  y: number;
  drilldown? : string

  constructor(name: string, y: number, drilldown?: string) {
    this.name = name;
    this.y = y;
    this.drilldown = drilldown;
  }
}

export class ChartConfig {
  title: string;
  type: string;
  data: ChartData[];
   drilldownData?: { [key: string]: ChartData[] }; // Nested drilldown data

   constructor(title: string, type: string, data: ChartData[], drilldownData?: { [key: string]: ChartData[] }) {
    this.title = title;
    this.type = type;
    this.data = data;
    this.drilldownData = drilldownData;
  }
}
