import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './PizzaBlock.module.scss';

const PizzaSkeleton = (props) => (
  <ContentLoader
    className={styles.pizzaBlock}
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="2" y="311" rx="10" ry="10" width="265" height="88" />
    <rect x="108" y="515" rx="0" ry="0" width="120" height="23" />
    <rect x="266" y="515" rx="0" ry="0" width="140" height="25" />
    <rect x="164" y="434" rx="0" ry="0" width="2" height="1" />
    <rect x="122" y="419" rx="25" ry="25" width="146" height="45" />
    <rect x="7" y="428" rx="10" ry="10" width="90" height="27" />
    <rect x="19" y="265" rx="10" ry="10" width="219" height="27" />
    <circle cx="127" cy="122" r="122" />
  </ContentLoader>
);

export default PizzaSkeleton;
