'use client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabEntity from '../TabEntity';
import Typography from '@mui/material/Typography';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import style from './style.module.css';
import { createClient } from '../../../../utils/supabase/client';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const supabase = createClient();

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
  const [notes, setNotes] = useState<{ title: string; createdAt: string; content: string; }[] | null>(null);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error)
        throw error;

      const { data: notesData, error: notesError } = await supabase
        .from('notes')
        .select('id, title, createdAt, content')
        .match({
          author: data.session!.user.id
        });

      if (notesError)
        throw notesError;

      setNotes(notesData);
    })();
  }, []);

  return <div className={style.container}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Notes" {...a11yProps(0)} />
        <Tab label="Activity" {...a11yProps(1)} />
      </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
      {
        notes !== null ? notes.map(row => 
          <TabEntity
            title={row.title}
            uuid={row.id}
            createdAt={row.createdAt}
            content={row.content}
          />) 
          : <div>Loading...</div>
      }
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
      Activity
    </CustomTabPanel>
  </div>;
}