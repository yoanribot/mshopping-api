import * as express from 'express';
import postController from '../controllers/post';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.removePost);
router.put('/:id/votes/inc', postController.incVote);
router.put('/:id/votes/dec', postController.decVote);
router.post('/:id/reviews', postController.addReview);
router.delete('/:postId/reviews/:reviewId', postController.removeReview);

export default router;