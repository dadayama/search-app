import SearchBox from '@/components/SearchBox';
import CustomMap from '@/components/Maps';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import axios from 'axios';

interface Campaign {
  id: string;
  title: string;
}

interface Store {
  id: string;
  name: string;
  address: string;
  postcode: string;
  type: string[];
  campaign: Campaign[];
  latitude: number;
  longitude: number;
}

interface Location {
  longitude: number;
  latitude: number;
}

const Search = () => {
  const router = useRouter();
  const { query } = router;
  console.log(query);

  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  console.log(locations);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getAllStores');
        const stores: Store[] = response.data;
        console.log(stores);

        // フィルター処理
        const filteredStores = stores.filter((store) => {
          const matchName = query.search_name
            ? store.name.includes(query.search_name as string) ||
              store.address.includes(query.search_name as string) ||
              store.postcode.toString().includes(query.search_name as string)
            : true;

          const matchType = query.type
            ? store.type.includes(query.type as string)
            : true;
          const matchCampaign = query.campaign
            ? store.campaign.some((cam) =>
                (query.campaign as string[]).includes(cam.id)
              )
            : true;
          return matchName && matchType && matchCampaign;
        });
        console.log(filteredStores);

        setFilteredStores(filteredStores);

        const locations = filteredStores.map((store) => ({
          latitude: store.latitude,
          longitude: store.longitude,
        }));
        setLocations(locations);
      } catch (err) {
        console.error('error:', err);
      }
    };
    fetchData();
  }, [query]);

  return (
    <>
      <SearchBox />
      <CustomMap locations={locations} />
      {filteredStores.length > 0 ? (
        filteredStores.map((store) => (
          <div key={store.id} className={styles.storeContainer}>
            <div className={styles.storeBox}>
              <p>{store.name}</p>
              <p>{store.address}</p>
            </div>
          </div>
        ))
      ) : (
        <div>該当の店舗はありません</div>
      )}
    </>
  );
};

export default Search;
