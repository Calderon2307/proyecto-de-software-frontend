import React from 'react';
import {
  EntrenadorProfileInfo,
  EntrenadorProfilePicture,
} from '@models/entreador';
import { MdOutlineSettings } from 'react-icons/md';
import { trainerPics } from '@data/profilePictures.ts';
import { getRandomIndex } from '@utils/randomNumber.ts';
import styles from '@components/EntrenadorInfo/EntrenadorInfo.module.css';

type EntrenadorInfoProps = {
  nombre: EntrenadorProfileInfo['nombre'];
};

const EntrenadorInfo = ({ nombre }: EntrenadorInfoProps): React.JSX.Element => {
  const randomProfileImg: EntrenadorProfilePicture =
    trainerPics[getRandomIndex()]!;

  return (
    <article className={`${styles.summarySection}`}>
      <section className={`${styles.infoSection}`}>
        <h2 className={`${styles.title}`}>Perfil de entrenador</h2>
        <figure
          className={`${styles.profileImgContainer}`}
          style={{ backgroundColor: randomProfileImg.background }}
        >
          <img
            src={randomProfileImg.img}
            alt={`Profile pic`}
            className={`${styles.profileImg}`}
          />
        </figure>
        <h3 className={`${styles.userName}`}>{nombre}</h3>
      </section>
      <section className={`${styles.settingsSection}`}>
        <a href="#" className={`${styles.link}`} title={`Editar perfil`}>
          <span className={`${styles.textWrapper}`}>Editar perfil</span>
          <MdOutlineSettings className={`${styles.icon}`} />
        </a>
      </section>
    </article>
  );
};

export default EntrenadorInfo;
