import { useFontSize } from '../../app/provider';
import styles from './index.module.css';

type HeaderProps = {
  onOpenModal: () => void;
};

export const Header = ({ onOpenModal }: HeaderProps) => {
  const { fontSize, setFontSize } = useFontSize();

  return (
    <header className={styles.header}>
      <div className={styles.header__controls}>
        <button
          className={styles.header__button}
          onClick={onOpenModal}
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