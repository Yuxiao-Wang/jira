import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useState } from "react";
import React from "react";
import {useDebounce, useDocumentTitle,} from "../../utils";
import styled from "@emotion/styled";
import {Button, Typography} from "antd";
import {useProjects} from "./project";
import {useUsers} from "./user";
import {useProjectModal, useProjectsSearchParam} from "./util";
import {ButtonNoPadding, Row} from "../../components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParam()
  const {isLoading, error, data: list, retry} = useProjects(useDebounce(param,  200))
  const {data: users} = useUsers()
  const {open} = useProjectModal()

  return  <Container>
    <Row between={true}>
      <h1>项目列表</h1>
      <ButtonNoPadding
        onClick={open}
        type={"link"}
      >创建项目</ButtonNoPadding>
    </Row>
    <SearchPanel users={users || []}  param={ param } setParam={setParam}/>
    {error? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
    <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}/>
  </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`