import * as React from 'react';
import { Spinner, Card } from '@vkontakte/vkui';

interface IStoryCardLoaderProps {
}

const StoryCardLoader: React.FC<IStoryCardLoaderProps> = (props) => {
  return (
    <>
      <Card>
        <div style={{ height: 96 }}>
          <Spinner />
        </div>
      </Card>
    </>
  )
};

export default StoryCardLoader;
