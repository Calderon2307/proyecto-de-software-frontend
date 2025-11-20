import React from 'react';
import { RegionData } from '@models/region';
import { capitalizeText } from '@utils/formatText';
import style from '@components/RegionCard/RegionCard.module.css';

type RegionCardProps = {
  region: RegionData;
  onClick: () => void;
};

const RegionCard: React.FC<RegionCardProps> = ({ region, onClick }) => {
  const formattedName = capitalizeText(region.name);

  return (
    <button
      type="button"
      className={style.card}
      onClick={onClick}
      title={formattedName}
    >
      <figure className={style.imageWrapper}>
        <img
          src={region.img}
          alt={`${formattedName} region map`}
          className={style.image}
        />
      </figure>
      <span className={style.name}>{formattedName}</span>
    </button>
  );
};

export default RegionCard;
