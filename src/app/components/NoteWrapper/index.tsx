'use server';

import styles from './style.module.css';
import { marked } from 'marked';
import { createClient } from '../../../../utils/supabase/server';
import parse from 'html-react-parser';

export default async function NoteWrapper({ uuid } : { uuid : string }) {
	const supabase = createClient();

	const { data, error } = await supabase
  .from('notes')
  .select()
	.match({
		id: uuid
	});

  if(error)
    throw error;

  const content = await marked.parse(data![0].content);

	return <>
    <div className={styles.header}>
			<h1>
				{ data![0].title }
			</h1>
		</div>
    <div className={styles.content}>
			{
				parse(content)
			}
    </div>
  </>;
}