import { useFontSize, useShowModal } from '../../app/provider';
import styles from './index.module.css';

export const Header = () => {
  const { fontSize, setFontSize } = useFontSize();
  const { setShowModal } = useShowModal();

  return (
    <header className={styles.header}>

      <div className={styles.header__controls}>
        <button 
          className={styles.header__button}
          onClick={() => setShowModal(true)}
        >
          Добавить сотрудника
        </button>
        
        <label className={styles.header__label}>
          Шрифт:
          <select
            className={styles.header__select}
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
        </label>
      </div>
    </header>
  );
};