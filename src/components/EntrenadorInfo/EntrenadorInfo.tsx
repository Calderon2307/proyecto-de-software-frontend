import { MdOutlineSettings } from 'react-icons/md';
import styles from '@components/EntrenadorInfo/EntrenadorInfo.module.css';
import profilePic from '@assets/tests/red_perfil.png';

const EntrenadorInfo = (): React.JSX.Element => {
  return (
    <article className={`${styles.summarySection}`}>
      <section className={`${styles.infoSection}`}>
        <h2 className={`${styles.title}`}>Perfil de entrenador</h2>
        <figure className={`${styles.profileImgContainer}`}>
          <img
            src={profilePic}
            alt={`Profile pic`}
            className={`${styles.profileImg}`}
          />
        </figure>
        <h3 className={`${styles.userName}`}>John Red Doe</h3>
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
