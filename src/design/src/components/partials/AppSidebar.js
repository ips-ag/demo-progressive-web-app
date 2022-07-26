import React from 'react'
import { Sidenav, Nav, Toggle } from 'rsuite';
import GearIcon from '@rsuite/icons/Gear';
import BarChartIcon from '@rsuite/icons/BarChart';
import NoticeIcon from '@rsuite/icons/Notice';
const styles = {
  width: 50,
  display: 'inline-table',
  zIndex: 1
};

const AppSidebar = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState('1');
  return (
    <div style={styles} className="app-sidebar">
      <Sidenav expanded={expanded} >
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<BarChartIcon />} >
              Metrics
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<NoticeIcon />} >
              Notifications
            </Nav.Item>
            <Nav.Menu placement="rightStart" eventKey="3" title="Settings" icon={<GearIcon />} >
              <Nav.Item eventKey="4-1">Link</Nav.Item>
              <Nav.Item eventKey="4-2">Link</Nav.Item>
              <Nav.Item eventKey="4-3">Link</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
      </Sidenav>
    </div>
  );
}

export default AppSidebar;
