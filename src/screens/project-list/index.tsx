import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useState } from "react";
import React from "react";
import {useDebounce, useDocumentTitle,} from "../../utils";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useProjects} from "./project";
import {useUsers} from "./user";
import {useUrlQueryParam} from "../../utils/url";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  console.log(param)
  const debouncedParam = useDebounce(param,  200)
  const {isLoading, error, data: list} = useProjects(debouncedParam)
  const {data: users} = useUsers()

  return  <Container>
    <h1>项目列表</h1>
    <select onChange={evt => {
    const value = evt.target.value
      console.log(value, typeof value)
    }}>
      <option value={undefined}>默认选项</option>
      <option value={1}>第一个选项</option>
    </select>
    <SearchPanel users={users || []}  param={ param} setParam={setParam}/>
    {error? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
    <List loading={isLoading} users={users || []} dataSource={list || []}/>
  </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`