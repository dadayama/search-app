import React from 'react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

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
  store: Store;
};

const StoreSingle: NextPage<Props> = ({ store }) => {
  return <div>{store.name}</div>;
};

export default StoreSingle;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('http://localhost:3000/api/getStoreIds');
  const storeIds = response.data;

  const paths = storeIds.map((storeId: string) => ({
    params: { id: storeId },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const response = await axios.get('http://localhost:3000/api/getAllStores');

  const stores: Store[] = response.data;

  //配列内で指定された条件を満たす最初の要素を見つけて返す
  const store = stores.find((store) => store.id === params.id);

  return {
    props: {
      store: store,
    },
  };
};
