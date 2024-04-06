export default function Page({ params } : { params : { id : number}}) {
  return <p>Post: {params.id}</p>
}