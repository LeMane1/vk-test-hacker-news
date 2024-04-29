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
} from '@vkontakte/vkui';
import { useRouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';
import { useGetStoryInfoQuery } from 'src/services/storiesApi';
import { Icon24ExternalLinkOutline } from '@vkontakte/icons'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const footnoteStyle = css`
  opacity: 40%;
`

export const StoryPage: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<'id'>();
  const { data, isLoading, isError } = useGetStoryInfoQuery(Number(params?.id))

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Hacker News
      </PanelHeader>
      <Group>
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
            {data && data.time && dayjs.unix(data.time).format("MM-DD-YYYY")} {data?.by}
          </Footnote>
        </Div>
      </Group>

      <Group
        header={<Header
          mode="secondary"
          indicator="667"
        >
          Comments
        </Header>}
      >
      </Group>


    </Panel>
  );
};
