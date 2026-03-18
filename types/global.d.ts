/// <reference types="react" />
/// <reference types="react-dom" />

import type { HTMLAttributes } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'spline-viewer': HTMLAttributes<HTMLElement> & {
                url: string;
                'loading-anim-type'?: string;
                hint?: string;
            };
        }
    }
}