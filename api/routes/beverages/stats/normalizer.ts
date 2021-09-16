import { AppLanguage } from "/api/utils/enums/AppLanguage.enum.ts";
import type { RawData } from "./RawData.d.ts";
import type { AddTimelineBar } from './StatsOutput.d.ts';
import { addTimeline } from './charts/addTimeline.ts'

export function normalizer(rawData: RawData[], language: AppLanguage) {
  const addTimelineData: AddTimelineBar[] = addTimeline(rawData);

  return {
    addTimelineData
  };
}
