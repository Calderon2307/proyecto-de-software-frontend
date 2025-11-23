import { Regions } from '@data/regions.ts';
import { RegionData } from '@models/region';

export const getRegionDataByName = (regionName: string | null): RegionData | null => {
  if (!regionName) return null;

  return (
    Regions.find(
      (region: RegionData) =>
        region.name.toLowerCase() === regionName.toLowerCase(),
    ) || null
  );
};
