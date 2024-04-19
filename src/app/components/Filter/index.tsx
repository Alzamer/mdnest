'use client';

import style from './style.module.css'
import { Dropdown } from 'semantic-ui-react'

const sortByUpvotes = [{
  key: 'Ascending',
  text: 'Ascending',
  value: 'Ascending'
}, {
  key: 'Descending',
  text: 'Descending',
  value: 'Descending'
}];
const sortByDate = [{
  key: 'From newest to oldest',
  text: 'From newest to oldest',
  value: 'From newest to oldest'
}, {
  key: 'From oldest to newest',
  text: 'From oldest to newest',
  value: 'From oldest to newest'
}];
const sortByAuthor = [{
  key: 'A-Z',
  text: 'A-Z',
  value: 'A-Z'
}, {
  key: 'Z-A',
  text: 'Z-A',
  value: 'Z-A'
}];

export default function Filter({ upvotes, dates, authors }: { upvotes: any, dates: any, authors: any }) {
  return <div className={style.container}>
    Sort by upvotes
    <Dropdown
      placeholder='Ascending or descending'
      selection
      options={sortByUpvotes}
      onChange={(e) => console.log}
    />
    Sort by date
    <Dropdown
      placeholder='From newest to oldest'
      selection
      options={sortByDate}
      onChange={(e) => console.log}
    />
    Sort by author
    <Dropdown
      placeholder='Alphabetically'
      selection
      options={sortByAuthor}
      onChange={(e) => console.log}
    />
  </div>
}