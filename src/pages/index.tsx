import styles from './index.less';
import { Button } from 'antd';
import { useModel } from 'umi';

export default function IndexPage() {
  const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button type="primary" onClick={() => setInitialState(50)}>
        Button
      </Button>
      <br></br>
      {initialState}
    </div>
  );
}
