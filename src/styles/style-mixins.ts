type JustifyContent =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'initial'
    | 'inherit';

type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'initial' | 'inherit' | 'stretch' | 'baseline';

type FlexDir = 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'initial' | 'inherit';

export const flex = (justify?: JustifyContent, align?: AlignItems, direction?: FlexDir) => `
    display: flex;
    ${justify ? `justify-content: ${justify};` : ''}
    ${align ? `align-items: ${align};` : ''}
    ${direction ? `flex-direction: ${direction};` : ''}
    
`;
export const calcHeight = () => `
    height: calc(100vh - 50px) !important;
    height: -moz-calc(100vh - 50px) !important;
    height: -webkit-calc(100vh - 50px) !important;
`;
export const font = (fontSize: number, color?: string, fontWeight?: number, lineHeight?: number) => `
    color: ${color ? color : '#000000'};
    font-weight: ${fontWeight ? fontWeight : 400};
    font-size: ${fontSize}px !important;
    line-height: ${lineHeight ? lineHeight : 20}px;
    font-family: Roboto,sans-serif;
`;

export type TypeStatus = '' | 'error' | 'warning';
