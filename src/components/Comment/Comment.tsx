import { Button, Div, Footnote, Text, Spacing, Spinner } from '@vkontakte/vkui';
import { useState } from 'react';
import { css } from '@emotion/react';
import { useGetCommentInfoQuery } from 'src/services/commentsApi';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import parse from 'html-react-parser'

dayjs.extend(customParseFormat)

const deletedCommentStyle = css`
  opacity: 40%;
`

const textStyle = (isDead: boolean | undefined) => css`
  opacity: ${isDead ? '30%' : '80%'};
  p{
    margin-top: 4px !important;
    margin-bottom: 4px !important;
  }
`

const timeStyle = css`
  opacity: 50%;
  margin-right: 8px;
`

const actionStyle = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const childCommentStyle = css`
  margin-left: 24px;
`

interface ICommentProps {
  id: number;
  isRootComment?: boolean;
}

const Comment: React.FC<ICommentProps> = ({ id, isRootComment = false }) => {
  const { data, isLoading, isError } = useGetCommentInfoQuery(id)
  const [showChildComments, setShowChildComments] = useState(false)

  const htmlDecode = (input: string | undefined, isDead: boolean | undefined) => {
    if (input) {
      return parse(input)
    } else {
      if (isDead) return 'Hidden'
    }
  }

  return (
    <>
      {data?.deleted ?
        <Div>
          <Text css={deletedCommentStyle}>Comment was deleted</Text>
        </Div>
        :
        <Div>
          <Text weight='1'>{data?.by}</Text>
          <Spacing size={4} />
          <Text css={textStyle(data?.dead)}>{htmlDecode(data?.text, data?.dead)}</Text>
          <Spacing size={4} />
          <div css={actionStyle}>
            <Footnote css={timeStyle}>
              {data && data.time && dayjs.unix(data.time).format("MM.DD.YYYY")}
            </Footnote>
            {data?.kids?.length && isRootComment &&
              <Button mode='link' onClick={() => setShowChildComments(!showChildComments)}>
                {showChildComments ? 'Hide comments' : 'Show more'}
              </Button>
            }
          </div>
          {data && data.kids && <div css={childCommentStyle}>
            {showChildComments && data.kids.map(comment => (
              <Comment id={comment} key={comment} />
            ))}
          </div>}
        </Div>}
      {
        isLoading && <Spinner />
      }
      {
        isError && <Text>Something wen wrong</Text>
      }
    </>
  )
};

export default Comment;
