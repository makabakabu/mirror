export interface State {
    filter: {
        area: string[];
        functionType: Array<functionType>;
        tag: string[];
        containText: string[];
    };
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
    area: {
        [key: string]: {
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
            children: [{
                type: "buriedPoint" | "ABTestCode" | "data" | "productLogic" | "UIAndUX" | "jumpLink" | "testCase";
                keyList: string[]; // 同一个类型下面所有的数据
            }];
        };
    };
    buriedPoint: {
        [key: string]: {
            tagList: string[];
            content: HTMLElement;
        };
    };
    ABTestCode: {
        [key: string]: {
            tagList: string[];
            content: HTMLElement;
        };
    };
    data: {
        [key: string]: {
            tagList: string[];
            content: {
                link: string;
                request: string; // react-ace
                response: string; // react-ace
            };
        };
    };
    businessLogic: {
        [key: string]: {
            tagList: string[];
            content: HTMLElement;
        };
    };
    UIAndUX: {
        [key: string]: {
            tagList: string[];
            content: HTMLElement;
        };
    };
    jumpLink: {
        [key: string]: {
            tagList: string[];
            content: string;
        };
    };
    testCase: {
        [key: string]: {
            tagList: string[];
            content: string;
        };
    };
};

export type functionType = "buriedPoint" | "ABTestCode" | "data" | "businessLogic" | "UIAndUX" | "jumpLink" | "testCase";
