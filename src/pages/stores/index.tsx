import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import axios from 'axios';

type Campaign = {
  id: string;
  title: string;
};

type Store = {
  id: string;
  name: string;
  address: string;
  postcode: string;
  type: string[];
  campaign: Campaign[];
  latitude: number;
  longitude: number;
};

type Props = {
  stores: Store[];
};

const Stores: NextPage<Props> = ({ stores }) => {
  return (
    <div>
      {stores.map((store) => (
        <div key={store.id}>{store.name}</div>
      ))}
    </div>
  );
};

export default Stores;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/getAllStores`);
    const stores = response.data;
    console.log(stores);
    return {
      props: {
        stores: stores,
      },
    };
  } catch (err) {
    console.error('error:', err);
    return {
      props: {
        stores: [],
      },
    };
  }
};
