import styles from './index.module.scss';
import { useSearch } from '@/Hooks/useSearch';

const SearchBox = () => {
  const { register, handleSubmit, onSubmit, campaigns, formData } = useSearch();

  const types = [
    {
      id: 1,
      name: '屋内',
    },
    {
      id: 2,
      name: '屋外',
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputBox}>
          <label>
            郵便番号・店舗名・地域名から探す
            <input type='text' id='search' {...register('search_name')} />
          </label>
        </div>
        <div className={styles.inputBox}>
          <p>トランクルームのタイプ</p>
          {types.map((type) => (
            <div key={type.id}>
              <label>
                <input
                  type='radio'
                  className={styles.visuallyHidden}
                  value={type.name}
                  {...register('type')}
                />
                <span></span>
                {type.name}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.inputBox}>
          <p>キャンペーン</p>
          {campaigns.map((cam) => (
            <div key={cam.id}>
              <label>
                <input
                  type='checkbox'
                  className={styles.visuallyHidden}
                  value={cam.id}
                  {...register('campaign')}
                />
                {cam.title}
              </label>
            </div>
          ))}
        </div>
        <button className={styles.searchBtn}>検索</button>
      </form>
    </>
  );
};

export default SearchBox;
