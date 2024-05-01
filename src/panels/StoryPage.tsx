import { FC } from 'react';
import { css } from '@emotion/react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Header,
  Spacing,
  Separator,
  Link,
  Div,
  Footnote,
  Paragraph,
  Text,
  Spinner,
  Button
} from '@vkontakte/vkui';
import { useRouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';
import { useGetStoryInfoQuery } from 'src/services/storiesApi';
import { Icon24ExternalLinkOutline } from '@vkontakte/icons'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Comment from 'src/components/Comment/Comment';

dayjs.extend(customParseFormat)

const footnoteStyle = css`
  opacity: 40%;
`

export const StoryPage: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<'id'>();
  const { data, isLoading, isError, refetch } = useGetStoryInfoQuery(Number(params?.id))

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Hacker News
      </PanelHeader>
      {data && <Group>
        <Header mode="primary" aside={
          <Link href={data?.url} target="_blank" hasVisited>
            To story source <Icon24ExternalLinkOutline width={16} height={16} />
          </Link>
        }>{data?.title}</Header>
        <Separator />
        <Div>
          <Paragraph>
            {`Rating: ${data?.score} / 100`}
          </Paragraph>
          <Spacing />
          <Footnote css={footnoteStyle}>
            {data && data.time && dayjs.unix(data.time).format("MM.DD.YYYY")} {data?.by}
          </Footnote>
        </Div>
      </Group>}

      {data && <Group
        header={<Header
          mode="secondary"
          aside={
            <Button mode='tertiary' onClick={() => refetch()}>
              Update comments
            </Button>
          }
          indicator={data?.kids?.length}
        >
          Comments
        </Header>}
      >
        {data && data.kids ?
          data.kids.map(comment => (
            <Comment id={comment} key={comment} isRootComment={true} />
          ))
          :
          <Div>
            <Text>There are no comments</Text>
          </Div>
        }
      </Group>}
      {
        isLoading && <Spinner />
      }
      {
        isError && <Text>Something went wrong</Text>
      }
    </Panel>
  );
};
