import React from 'react';

import scriptjs from 'scriptjs'

const twitterWidgetJs = 'https://platform.twitter.com/widgets.js';

declare global {
  interface Window {
    twttr: any;
  }
}

interface JSONObject {
  [k: string]: any;
}

export interface TwitterTweetEmbedProps {
  tweetId: string;
  options?: JSONObject;
  placeholder?: string | React.ReactNode;
  onLoad?: (element: any) => void;
}

const methodName = 'createTweet';

const TwitterTweetEmbed = (props: TwitterTweetEmbedProps): any => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isComponentMounted = true;
    const script = scriptjs;
    script(twitterWidgetJs, 'twitter-embed', () => {
      if (!window.twttr) {
        console.error('Failure to load window.twttr, aborting load');
        return;
      }
      if (isComponentMounted) {
        if (!window.twttr.widgets[methodName]) {
          console.error(
            `Method ${methodName} is not present anymore in twttr.widget api`
          );
          return;
        }

        window.twttr.widgets[methodName](
          props.tweetId,
          ref?.current,
          props.options
        ).then((element: any) => {
          setLoading(false);
          if (props.onLoad) {
            props.onLoad(element);
          }
        });
      }
    });

    return () => {
      isComponentMounted = false;
    };
  }, []);

  return (
    <React.Fragment>
      {loading && <React.Fragment>{props.placeholder}</React.Fragment>}
      <div ref={ref} />
    </React.Fragment>
  );
};

export default TwitterTweetEmbed;
