import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import type { RawData } from "./RawData.d.ts";
import type { AddTimelineBar, AlcoholChartBar, Stats, TopBrandsTimelineBar } from './StatsOutput.d.ts';
import { addTimeline } from './charts/addTimeline.ts'
import { alcoholChart } from './charts/alcoholChart.ts';
import { topBrandsTimeline } from './charts/topBrandsTimeline.ts'

export function normalizer(rawData: RawData[], language: AppLanguage) {
  const addTimelineData: AddTimelineBar[] = addTimeline(rawData);
  const alcoholChartData: AlcoholChartBar[] = alcoholChart(rawData);
  const topBrandsTimelineData: TopBrandsTimelineBar[] = topBrandsTimeline(rawData);

  const completeData: Stats = {
    addTimelineData,
    alcoholChartData,
    topBrandsTimelineData
  }

  return completeData;
}
