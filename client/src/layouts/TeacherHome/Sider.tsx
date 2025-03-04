import {Layout, Menu, MenuProps} from 'antd';
import React from 'react';
import { ContainerOutlined} from '@ant-design/icons';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import QuizIcon from '@mui/icons-material/Quiz';
import StyleIcon from '@mui/icons-material/Style';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const TeacherSider: React.FC<{collapsed: boolean}> = ({collapsed}) => {
  const navigate = useNavigate();
  type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <SpaceDashboardIcon className='!text-[1.2rem]'/>, label: 'DashBoard', onClick: () => navigate('/teacher/dashboard') },
  { key: '2', icon: <LocalAtmIcon className='!text-[1.2rem]' />, label: 'Revenue' },
  {
    key: 'sub2',
    label: 'Manage Course',
    icon: <AutoStoriesIcon className='!text-[1.2rem]' />,
    children: [
      { key: '3',icon: <LocalAtmIcon className='!text-[1.2rem]' />, label: 'Course', onClick: () => navigate('/teacher/course') },
      { key: '4',icon: <HistoryIcon className='!text-[1.2rem]' />, label: 'Recent History' },
      // {
      //   key: 'sub3',
      //   label: 'Submenu',
      //   children: [
      //     { key: '11', label: 'Option 11' },
      //     { key: '12', label: 'Option 12' },
      //   ],
      // },
    ],
  },
  {
    key: 'sub1',
    label: 'Resources',
    icon: <FolderOpenIcon className='!text-[1.2rem]' />,
    children: [
      { key: '4',icon: <ContainerOutlined className='!text-[1.2rem]' />, label: 'Bank Exam', onClick: () => navigate('/teacher/bank/examlist') },
      { key: '5',icon: <QuizIcon className='!text-[1.2rem]'/>, label: 'Bank Quiz' },
      { key: '6',icon: <StyleIcon className='!text-[1.2rem]'/>, label: 'Bank Learning' },
    ],
  },
];
    
 return (     
    <Sider trigger={null} collapsible collapsed={collapsed} width={200} style={{ background: '#FFF' }}>          
        <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </Sider>
 )

}

export default TeacherSider