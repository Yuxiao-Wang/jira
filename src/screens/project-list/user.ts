import { useHttp } from "../../utils/http";
import { useAsync } from "../../utils/use-async";
import { useEffect } from "react";
import { cleanObject } from "../../utils";
import { User } from "../../types/user";
import { Project } from "../../types/project";
import { useQuery } from "react-query";

// export const useUsers = (param?: Partial<User>) => {
//   const client = useHttp();
//   const { run, ...result } = useAsync<User[]>();
//
//   useEffect(() => {
//     run(client("users", { data: cleanObject(param || {}) }));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [param]);
//
//   return result;
// };

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
