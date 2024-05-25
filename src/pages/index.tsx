import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import SearchBox from '@/components/SearchBox';

export default function Home() {
  return (
    <>
      <SearchBox />
    </>
  );
}
