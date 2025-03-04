import { Button, Layout, Menu, MenuProps} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
const { Header} = Layout;

const TeacherHeader: React.FC <{collapsed: boolean ; setCollapsed: React.Dispatch<React.SetStateAction<boolean>>}> = ({collapsed, setCollapsed}) => {
        const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
          key,
          label: `nav ${key}`,
        }));
    
 return (     
     <Header className='!flex items-center header-bg'   style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 0
      }}>
       <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
          color:'#FFF'
        }}
      />
    <div className="demo-logo" />
    <Menu className='header-bg'
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      items={items1}
      style={{ flex: 1, minWidth: 0 }}
    />
  </Header> )

}

export default TeacherHeader;