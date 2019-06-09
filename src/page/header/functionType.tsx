import React, { useCallback } from 'react';
import { type } from "../../data/constant/";
import { difference } from "lodash";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Input } from '@material-ui/core';

export default function FunctionTypeSelectBox({ functionTypeList, setFunctionTypeList }: { functionTypeList: type.functionType[];  setFunctionTypeList: (functionTypeTypeList: type.functionType[]) => void }) {
    const addFunctionType = useCallback((currentFunctionTypeList: Array<type.functionType | "all">): type.functionType[] => {
        // 如果原来没有 all 现在有all了， 将所有的case都点上
        // 如果有all 现在case不全了, 则将all删除掉
        switch (true) {
            case !currentFunctionTypeList.includes("all") && difference(["buriedPoint", "ABTestCode", "data", "businessLogic", "UIAndUX", "jumpLink", "testCase"], functionTypeList).length === 0:
                return [];

            case currentFunctionTypeList.includes("all") && difference(["buriedPoint", "ABTestCode", "data", "businessLogic", "UIAndUX", "jumpLink", "testCase"], functionTypeList).length !== 0:
                return ["buriedPoint", "ABTestCode", "data", "businessLogic", "UIAndUX", "jumpLink", "testCase"];

            default:
                return currentFunctionTypeList.filter((functionType) => functionType !== "all") as type.functionType[];

        }
    }, [functionTypeList]);
    return (
        <FormControl style={{ minWidth: 120, maxWidth: 300 }}>
            <InputLabel htmlFor="select-multiple-checkbox">标签项</InputLabel>
            <Select
                multiple
                value={difference(["buriedPoint", "ABTestCode", "data", "businessLogic", "UIAndUX", "jumpLink", "testCase"], functionTypeList).length === 0 ? [...functionTypeList, "all"] : functionTypeList}
                onChange={(event) => setFunctionTypeList(addFunctionType(event.target.value as any))}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={() => (functionTypeList as string[]).join(', ')}
            >
                {
                    (["buriedPoint", "ABTestCode", "data", "businessLogic", "UIAndUX", "jumpLink", "testCase", "all"] as Array<type.functionType | "all">).map((functionType: any) => (
                        <MenuItem key={functionType} value={functionType}>
                            <Checkbox checked={functionTypeList.includes(functionType) || (functionType === "all" && difference(["buriedPoint", "ABTestCode", "data", "businessLogic", "UIAndUX", "jumpLink", "testCase"], functionTypeList).length === 0) } />
                            <ListItemText primary={functionType} />
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
} 
