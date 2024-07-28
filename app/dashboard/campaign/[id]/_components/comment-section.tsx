'use client'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CampaignComment, User } from '@prisma/client'
import CardComment from '@/components/shared/card-comment';
import { useCallback, useRef, useState, useTransition } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { postComment } from '@/actions/comment';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import useAxiosErrorToast from '@/hooks/useAxiosErrorToast';
import axios, { AxiosError, CancelTokenSource } from 'axios';

type CommentType = CampaignComment & {
  user: Pick<User, 'id' | 'name' | 'image'>;
}

interface IProps {
  campaignId: number;
  data: CommentType[];
  user: User | null;
  limit: number;
}

function CommentSection({ campaignId, data, user, limit }: IProps) {
  const [comments, setComments] = useState(data)
  const [posting, startPost] = useTransition()
  const [message, setMessage] = useState('')
  const [cursor, setCursor] = useState(!!data.length ? data[data.length - 1].id : null)
  const [hasMore, setHasMore] = useState(data.length === limit)
  const [loading, setLoading] = useState(false)
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const { handleAxiosErrorToast } = useAxiosErrorToast()

  const fetch = useCallback(() => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    cancelTokenSource.current = source;

    setLoading(true);

    axios
      .get(`/api/user/campaign/${campaignId}/comments`, {
        params: { cursor, limit: limit },
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.length === limit) {
          setCursor(res.data[res.data.length - 1].id);
          if (!hasMore) setHasMore(true);
        } else {
          setHasMore(false);
        }
        setComments((prev) => [...prev, ...res.data]);
      })
      .catch((error: AxiosError) => {
        setComments([]);
        setHasMore(false);
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          const axiosError = error as AxiosError;

          if (axiosError.response) {
            handleAxiosErrorToast(axiosError.response.status);
          } else {
            toast.error('Internal Error');
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cursor]);

  const handleComment = () => {
    if (message.length >= 3) {
      startPost(() => {
        postComment(message, campaignId).then((res) => {
          if (res.success) {
            toast.success('Komentar berhasil di unggah.')
            setComments((prev) => [res.data, ...prev])
            setMessage('')
          } else {
            toast.error(res.error)
          }
        })
      })
    }
  }

  return (
    <div className="bg-background rounded-md shadow-sm p-4 space-y-2 mt-4">
      <h2 className="text-lg sm:text-xl font-bold">
        Komentar
      </h2>
      <div className="space-y-4">
        {user && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 sm:w-12 aspect-square rounded-full bg-muted overflow-hidden">
                <img
                  src={user.image!}
                  alt="user profile"
                />
              </div>
              <p className="w-full font-bold text-xs sm:text-base">{user.name}</p>
            </div>
            <form className="mt-4 space-y-2">
              <div>
                <Textarea
                  className="h-[120px] sm:h-[150px]"
                  placeholder="Tulis sebuah komentar..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></Textarea>
                <span className="text-xs leading-4 block mt-1">
                  Satu kampanye hanya maksimal 10 komentar untuk satu akun.
                </span>
              </div>
              <Button
                size="sm"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleComment();
                }}
                className="gap-2 text-xs sm:text-sm"
                disabled={posting || message.length < 3}
              >
                {posting && <VscLoading className="animate-spin" />}
                Posting
              </Button>
            </form>
            <Separator />
          </div>
        )}
        {comments.map((comment) => (
          <CardComment
            key={comment.id}
            content={comment.comment}
            createdAt={comment.createdAt}
            image={comment.user.image!}
            name={comment.user.name!}
          />
        ))}
        {comments.length > 0 && !hasMore && (
          <div className="p-4 text-center text-xs sm:text-sm text-gray-500">
            Tidak ada lagi komentar
          </div>
        )}
        {hasMore && (
          <div className="text-center">
            <Button
              size="sm"
              variant="outline"
              className="text-xs gap-2"
              disabled={loading}
              onClick={fetch}
            >
              {loading && <VscLoading className="animate-spin" />}
              Lebih banyak
            </Button>
          </div>
        )}
        {comments.length === 0 && (
          <p className="text-center mb-4 pt-6 pb-10">
            Komentar masih kosong.
          </p>
        )}
      </div>
    </div>
  )
}

export default CommentSection