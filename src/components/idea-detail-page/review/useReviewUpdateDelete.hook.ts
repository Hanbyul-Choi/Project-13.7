import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteChallengeIdeaComment, updateChallengeIdeaComment } from '@/app/api/idea-comments';
import { IDEA_COMMENTS } from '@/app/shared/queries.keys';
import { useDialog } from '@/components/common';

export default function useReviewUpdateDelete(
  editComment: string,
  setEditCommentId: React.Dispatch<React.SetStateAction<string>>,
  setEditComment: React.Dispatch<React.SetStateAction<string>>,
) {
  const queryClient = useQueryClient();
  const { Confirm, Alert } = useDialog();

  const editMutation = useMutation(updateChallengeIdeaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([IDEA_COMMENTS]);
    },
  });

  const handleUpdateChallengeIdeaCommentData = (id: string) => {
    if (editComment === '') return;
    if (editComment.length > 300) {
      Alert('글자 수 300자를 넘었습니다.');
      return;
    }
    const newUpdateComment = { id, editComment };
    editMutation.mutate(newUpdateComment);
    setEditCommentId('');
  };

  const deleteMutation = useMutation(deleteChallengeIdeaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([IDEA_COMMENTS]);
    },
  });

  const handleDeleteChallengeIdeaCommentData = async (id: string) => {
    const confirmed = await Confirm('해당 댓글을 삭제하시겠습니까?');
    if (confirmed) deleteMutation.mutate(id);
  };

  const handleCommentDropDown = (id: string, comment: string) => {
    setEditCommentId(id);
    setEditComment(comment);
  };

  return { handleUpdateChallengeIdeaCommentData, handleDeleteChallengeIdeaCommentData, handleCommentDropDown };
}
