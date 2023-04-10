// import defaultImg from '@/assets/img/defaultImage.png';
// import defaultWideImg from '@/assets/img/wideDefaultImg.png';

import { NoticeType } from 'antd/lib/message';

// export const changeDefaultImage = (ev: any, isDefaultImg: boolean) => {
//     ev.target.src = isDefaultImg ? defaultImg : defaultWideImg;
// };

export const showMessage = (type: NoticeType, message: string) => {
    const result: any = {
        type: type,
        content: message,
        style: {
            padding: 0,
            border: `1px solid rgba(0, 194, 255,1)`,
            position: 'absolute',
            top: 52,
            right: 20,
        },
    };
    return result;
};

export const setMessageRedirectUri = (type: NoticeType, message: string) => {
    return {
        type,
        message,
    };
};
