import AppApi from './app';
import AppStore from '../stores/app';

export default class CommentApi {
  constructor(private api: AppApi, private store: AppStore) {}

  async getAll() {
    const res = await this.api.client.get('/comments');
    this.store.comment.load(res.data);
  }

  async getByPostId(postId: number) {
    const res = await this.api.client.get(`/posts/${postId}/comments`);
    this.store.comment.load(res.data);
  }
}
