'use server';

import styles from './style.module.css';
import { createClient } from '../../../../utils/supabase/server';

export default async function NoteWrapper({ uuid } : { uuid : string }) {
	const supabase = createClient();

	const { data, error } = await supabase
  .from('notes')
  .select()
	.match({
		id: uuid
	});

	return <>
    <div className={styles.header}>
			<h1>
				{ data![0].title }
			</h1>
		</div>
    <div className={styles.content}>
			{
				data![0].content
			}
    </div>
  </>;
}