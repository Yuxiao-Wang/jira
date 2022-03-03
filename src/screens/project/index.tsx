import React from 'react'
import {BrowserRouter, Link} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router"
import {EpicScreen} from "../epic";
import {KanbanScreen} from "../kanban";

export const ProjectScreen = () => {
    return <div>
        <h1>ProjectScreen</h1>
        <Link to={'kanban'}>看板</Link>
        <Link to={'epic'}>任务组</Link>

        <Routes>
            <Route path={'/kanban'} element={<KanbanScreen />} />
            <Route path={'/epic'} element={<EpicScreen />} />
            <Route path="*" element={<Navigate to={window.location.pathname + '/kanban'} replace={true}/>} />
        </Routes>
    </div>
}