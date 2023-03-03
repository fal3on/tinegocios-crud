import { Card, Button } from './globals.styled'

export default function UserCard({ job, username, handleDelete, onClick }) {
  return (
    <Card active={job.is_active}>
      <img src={`data:image/jpeg;base64,${job.company_image}`} alt={job.titulo} />
      <div className='cardHeader'>
        <h3>
          {job.company_name ? (
            <>
              {job.titulo} | <span>{`  ${job.company_name}`}</span>
            </>
          ) : (
            <>{job.titulo}</>
          )}
        </h3>
      </div>
      <div className='cardBody'>
        <span>{job.job_type.replace(/_/g, ' ')}</span>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            listStyle: 'none',
            gap: '10px',
            marginTop: '.5rem'
          }}
        >
          {job.tags.length > 0 &&
            job.tags.map((tag, index) => (
              <li
                key={index}
                style={{
                  background: 'gray',
                  borderRadius: '16px',
                  padding: '5px 10px',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  letterSpacing: '1px'
                }}
              >
                {tag}
              </li>
            ))}
        </ul>
      </div>
      {username === 'admin' ? (
        <div className='cardFooter'>
          <div className='card__actions'>
            <Button
              className='btn btn--primary'
              // onClick={() => handleEdit(job.id)}
              onClick={() => onClick(job)}
            >
              Editar
            </Button>
            <Button className='btn btn--danger' onClick={() => handleDelete(job.id)}>
              Eliminar
            </Button>
          </div>
        </div>
      ) : null}
    </Card>
  )
  // return (
  //   <Card className='card'>
  //     <img src={`data:image/jpeg;base64,${job.company_image}`} alt={job.titulo} />
  //     <div className='card__content'>
  //       <div className='card__header'>
  //         <h3 className='card__title'>
  //           {job.titulo}
  //           <span>{` | ${job.company_name}`}</span>
  //         </h3>
  //       </div>
  //       <div className='card__body'>
  //         <p>{job.descripcion}</p>
  //         <p>{job.company_email}</p>
  //         <p>{job.job_type}</p>
  //         <p>{job.is_active ? 'Activo' : 'Inactivo'}</p>
  //         <ul
  //           style={{
  //             display: 'flex',
  //             flexWrap: 'wrap',
  //             listStyle: 'none',
  //             gap: '10px',
  //             marginTop: '.5rem'
  //           }}
  //         >
  //           {job.tags.length > 0 &&
  //             job.tags.map((tag, index) => (
  //               <li
  //                 key={index}
  //                 style={{
  //                   background: 'gray',
  //                   borderRadius: '16px',
  //                   padding: '5px 10px',
  //                   color: 'white',
  //                   fontSize: '12px',
  //                   fontWeight: 'bold',
  //                   letterSpacing: '1px'
  //                 }}
  //               >
  //                 {tag}
  //               </li>
  //             ))}
  //         </ul>
  //       </div>
  //     </div>
  //     {username === 'admin' ? (
  //       <div className='card__actions'>
  //         <Button
  //           className='btn btn--primary'
  //           // onClick={() => handleEdit(job.id)}
  //           onClick={() => onClick(job)}
  //         >
  //           Editar
  //         </Button>
  //         <Button className='btn btn--danger' onClick={() => handleDelete(job.id)}>
  //           Eliminar
  //         </Button>
  //       </div>
  //     ) : null}
  //   </Card>
  // )
}
