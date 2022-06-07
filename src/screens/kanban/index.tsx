import { useDocumentTitle } from "../../utils";
import { useKanbans } from "../../utils/kanban";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-add-drop";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: currentProject, isLoading: kanbanIsLoading } =
    useProjectInUrl();
  const { isLoading: tasksIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = tasksIsLoading || kanbanIsLoading;
  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Drop type={"COLUMN"} direction={"horizontal"} droppableId={"kanban"}>
            <ColumnsContainer>
              {kanbans?.map((kanban, index) => (
                <Drag
                  key={kanban.id}
                  draggableId={"kanban" + kanban.id}
                  index={index}
                >
                  <KanbanColumn kanban={kanban} key={kanban.id} />
                </Drag>
              ))}
              <CreateKanban />
            </ColumnsContainer>
          </Drop>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

const ColumnsContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
