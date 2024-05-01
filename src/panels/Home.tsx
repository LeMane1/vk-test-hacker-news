import { FC, useState, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  NavIdProps,
  CardGrid,
  Text
} from '@vkontakte/vkui';
import { useGetLatestStoriesIdQuery } from 'src/services/storiesApi';
import { lazy, Suspense } from 'react';
import StoryCardLoader from 'src/components/StoryCard/StoryCardLoader';

const StoryCard = lazy(() => import('src/components/StoryCard/StoryCard'));

export interface HomeProps extends NavIdProps {

}

export const Home: FC<HomeProps> = ({ id }) => {
  const { data, isLoading, isError, refetch } = useGetLatestStoriesIdQuery(null, {
    pollingInterval: 60000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true
  })
  const offset: number = 20
  const [showItemsCount, setShowItemsCount] = useState(offset)

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const items = document.querySelectorAll('.story-card')
    const lastItem = items[items.length - 1]
    const pos = lastItem?.getBoundingClientRect()

    if (pos?.y < windowHeight) {
      setShowItemsCount(prev => Math.min(prev + offset, 100))
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>Hacker News</PanelHeader>
      <Group
        header={
          <Header
            mode="secondary"
            aside={
              <Button mode='tertiary' onClick={() => refetch()}>
                Update stories list
              </Button>
            }
          >Latest stories</Header>
        }
        mode='card'
      >
        <CardGrid size='m' spaced>
          {data && data.length > 0 && data.slice(0, showItemsCount).map((storyId: number) => (
            <Suspense fallback={<StoryCardLoader />} key={storyId}>
              <StoryCard id={storyId} />
            </Suspense>
          ))
          }
        </CardGrid>
        {
          !data && !isLoading && <p>No available stories</p>
        }
        {
          isError && <Text>Something went wrong</Text>
        }
      </Group>
    </Panel>
  );
};
