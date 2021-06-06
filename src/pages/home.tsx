import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useAppContext } from '../app-context';
import Post from '../components/post';

const HomePage = observer(() => {
  const { api, store } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);

  const load = async () => {
    try {
      setLoading(true);
      await api.post.getAll();
      await api.user.getAll();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load().then();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {store.post.all.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
});

export default HomePage;
