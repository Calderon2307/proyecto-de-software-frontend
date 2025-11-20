import { useNavigate } from "react-router-dom";
import styles from "./Index.module.css";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>POKEDEX</h1>

        <p className={styles.subtitle}>
          Your Pokemon adventure starts here!
        </p>

        <button
          onClick={() => navigate("/auth")}
          className={styles.button}
        >
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default Index;
