import {useUrlQueryParam} from "../../utils/url";
import {useMemo} from "react";

//项目列表搜索的参数
export const useProjectsSearchParam = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => ({...param, personId: Number(param.personId) || undefined}), [param]),
        setParam
    ] as const
}

export const useProjectModal = () => {
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])

    const open = () => setProjectCreate({projectCreate: true})
    const close = () => setProjectCreate({projectCreate: undefined})

    return {
        projectModalOpen: projectCreate === "true",
        open,
        close,
    };
    //返回tuple的好处： 在使用的时候可以随便命名啦。返回值在3个及以内推荐使用。3个以上还是obj。
}