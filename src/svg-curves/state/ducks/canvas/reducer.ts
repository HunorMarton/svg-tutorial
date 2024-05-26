import { type Canvas } from '../../../utils/types';
import { type Action } from '../../reducers';

import { RESIZE } from '../../../constants/actions';

export type State = Readonly<Canvas>;

export default function coordReducer(
    state: State,
    action: Action,
    minWidth: number,
    minHeight: number
) {
    switch (action.type) {
        case RESIZE: {
            const availableSize = {
                width: action.payload.width,
                height: action.payload.height - 200
            };

            // Shrink everything if needed
            let zoom: number;
            if (availableSize.width < minWidth || availableSize.height < minHeight) {
                zoom =
                    availableSize.width < availableSize.height
                        ? minWidth / availableSize.width
                        : minHeight / availableSize.height;
            } else {
                zoom = 1;
            }

            return {
                zoom,
                svgWidth: availableSize.width,
                svgHeight: availableSize.height,
                viewBoxWidth: availableSize.width * zoom,
                viewBoxHeight: availableSize.height * zoom,
            };
        }
        default:
            return state;
    }
}
