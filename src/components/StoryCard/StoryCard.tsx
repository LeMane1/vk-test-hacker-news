import { ContentCard, Title } from '@vkontakte/vkui';
import * as React from 'react'
import { useGetStoryInfoQuery } from 'src/services/storiesApi';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import StoryCardLoader from 'src/components/StoryCard/StoryCardLoader';

dayjs.extend(customParseFormat)

interface IStoryViewProps {
  id: number
}

const StoryCard: React.FC<IStoryViewProps> = ({ id }) => {
  const { data, isLoading, isError } = useGetStoryInfoQuery(id)
  const routeNavigator = useRouteNavigator();
  return (
    <>
      {
        isLoading ?
          <StoryCardLoader /> :
          <ContentCard
            onClick={() => routeNavigator.push(`/story/${id}`)}
            subtitle={data && data.time && dayjs.unix(data.time).format("MM-DD-YYYY")}
            header={data?.title}
            text={`Rating: ${data?.score} / 100`}
            caption={data?.by}
            hasHover
            loading='lazy'
            className='story-card'
          />
      }
      {isError && <Title>Something went wrong</Title>}
    </>
  )
};

export default StoryCard;
