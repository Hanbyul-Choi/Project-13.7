import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteChallengeIdeaComment, updateChallengeIdeaComment } from '@/app/api/idea-comments';
import { useDialog } from '@/components/common';

export default function useReviewUpdateDelete(editComment: string, setEditCommentId: React.Dispatch<React.SetStateAction<string>>, setEditComment: React.Dispatch<React.SetStateAction<string>>) {
  const queryClient = useQueryClient();
  const { Confirm } = useDialog();

  const editMutation = useMutation(updateChallengeIdeaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ideaComments']);
    },
  });

  const handleUpdateChallengeIdeaCommentData = (id: string) => {
    const newUpdateComment = { id, editComment };
    editMutation.mutate(newUpdateComment);
    setEditCommentId('');
  };

  const deleteMutation = useMutation(deleteChallengeIdeaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ideaComments']);
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
