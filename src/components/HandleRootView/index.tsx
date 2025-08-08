// components
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';


interface PropsInterface {
      rootKey: number | string
      renderListRightEle: React.ReactNode
      children: React.ReactNode
      friction: number
      rightThreshold: number
      ReanimatedSwipeableConfig: any
}

export default function HandleRootView({ rootKey, children, ReanimatedSwipeableConfig }: PropsInterface): () => React.ReactNode {
      return <GestureHandlerRootView key={rootKey}>
            <ReanimatedSwipeable
                  {...ReanimatedSwipeableConfig}
            >
                  {children}
            </ReanimatedSwipeable>
      </GestureHandlerRootView>
}