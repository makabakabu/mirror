interface Area {
    location: {
        position: { // 相对于底图
            left: number; // 百分比
            top: number; // 百分比
        };
        size: { // 相对于底图
            width: number; // 百分比
            height: number; // 百分比
        };
    };
    children?: {
        [key: string]: Area,
    }
    content: [{
        type: "buriedPoint" | "ABTestCode" | "data" | "productLogic" | "UIAndUX" | "jumpLink";
        keyList: string[]; // 同一个类型下面所有的数据
    }];
}

export interface State {
    background?: {
        position: {
            left: number;
            top: number;
        };
        size: {
            width: number;
            height: number;
        };
        url: string; // url
    };
    区域: {
        [key: string]: Area,
    };
    埋点: {
        [key: string]: {
            tagList: string[];
            content: HTMLElement;
        };
    };
    AB测试号: {
        [key: string]: {
            tagList: string[];
            content: HTMLElement;
        };
    };
    数据: {
        [key: string]: {
            tagList: string[];
            content: {
                link: string;
                request: string; // react-ace
                response: string; // react-ace
            };
        };
    };
    逻辑: {
        [key: string]: {
            tagList: string[];
            content: HTMLElement;
        };
    };
    UI和UX: {
        [key: string]: {
            tagList: string[];
            content: HTMLElement;
        };
    };
    跳转链接: {
        [key: string]: {
            tagList: string[];
            content: string;
        };
    };
};

export type functionType = "埋点" | "AB测试号" | "数据" | "逻辑" | "UI和UX" | "跳转链接";
