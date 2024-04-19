'use client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactNode, SyntheticEvent, useState } from 'react';
import style from './style.module.css';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsWrapper() {
  const [value, setValue] = useState(0);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return <div className={style.container}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Notes" {...a11yProps(0)} />
        <Tab label="Activity" {...a11yProps(1)} />
      </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
      Notes
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
      Activity
    </CustomTabPanel>
  </div>;
}