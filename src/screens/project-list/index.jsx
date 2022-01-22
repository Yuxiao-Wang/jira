import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import React from "react";
import { cleanObject, useDebounce } from "../utils";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen =() => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const debouncedParam = useDebounce(param, 2000)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
      if(response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if(response.ok) {
        setUsers(await response.json())
      }
    })
  })
  return  <div>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List users={users} list={list}/>
  </div>
}

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}
