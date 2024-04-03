'use client';

import style from './style.module.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { createClient } from '../../../utils/supabase/client';
import { navigate } from '../../../utils/actions';
import { useEffect } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
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

const supabase = createClient();

const getSession = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  console.log("DATA: ", user);
  if(user === null)
    navigate("/");
};

export default function Page(){
  useEffect(() => {
    getSession()
  }, []);

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return <div className={style.container}>
    <div className={style.profile}>
      <div className={style.profileInfo}>
        <div className={style.picture}>

        </div>
        <div>
          <p className={style.username}>USERNAME</p>
          <p className={style.date}>CREATED AT</p>
        </div>
        <button>Follow</button>
      </div>
      <div>
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
      </div>
    </div>
  </div>;
}