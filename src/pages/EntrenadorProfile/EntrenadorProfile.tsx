import React from 'react';
import EntrenadorInfo from '@components/EntrenadorInfo/EntrenadorInfo.tsx';
import EntrenadorPreferences from '@components/EntrenadorPreferences/EntrenadorPreferences.tsx';
import styles from '@pages/EntrenadorProfile/EntrenadorProfile.module.css';
import Header from '@components/Header/Header.tsx';

const EntrenadorProfilePage = (): React.JSX.Element => {
  return (
    <>
      <Header />
      <article className={`${styles.mainSection}`}>
        <EntrenadorInfo />
        <EntrenadorPreferences />
      </article>
    </>
  );
};

export default EntrenadorProfilePage;
