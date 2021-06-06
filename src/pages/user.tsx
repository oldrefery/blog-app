import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useAppContext } from '../app-context';
import { useParams } from 'react-router';
import Post from '../components/post';

const UserPage = observer(() => {
  const { api, store } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);

  const load = async () => {
    try {
      setLoading(true);
      await api.user.getById(userId);
      await api.post.getByUserId(userId);
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

  const user = store.user.byId.get(userId);

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <h3>
        {user.name} • {user.username}
      </h3>
      <p>{user.email}</p>
      <h2>Posts</h2>
      {user.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
});

export default UserPage;
