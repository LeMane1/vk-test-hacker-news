import { FC, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Div,
  NavIdProps,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useLazyGetLatestStoriesQuery } from 'src/services/storiesApi';

export interface HomeProps extends NavIdProps {

}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [getLatestStories, { data }] = useLazyGetLatestStoriesQuery()

  useEffect(() => {
    getLatestStories({})
  }, [])

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  return (
    <Panel id={id}>
      <PanelHeader>Новости</PanelHeader>
      <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
        {/* <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell> */}
      </Group>

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('story_page')}>
            Покажите Персика, пожалуйста!
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
