import React from 'react'
import { Route } from 'react-router-dom'
import TeacherHome from '../layouts/TeacherHome/TeacherHome'
import TeacherDashBoard from '../pages/teacher/DashBoard'
import ExamList from '../pages/teacher/Bank Resources/ExamList'


export default function teacherRouter() {
  return (
    <Route path='/teacher' element={<TeacherHome/>}>
        <Route path='dashboard' element={<TeacherDashBoard/>}/>
        <Route path='bank/examlist' element={<ExamList/>}/>
    </Route>
  )
}
