import React from 'react'

const DonateCard = (props) => {
  return (
    <div className='p-4 rounded-3xl shadow-2xl text-white font-bold'>
        <h1 className='pb-4 text-3xl'>{props.name}</h1>
        <img src={props.img} className=' rounded-lg w-96' />
        <p className='pt-4 w-96'>{props.description}</p>
        <div>
          <button className='bg-gray-800 rounded-md px-2 py-1 mb-10 text-md hover:bg-gray-700 duration-300 mt-5'>Donate Now</button>
        </div>
    </div>
  )
}

export default DonateCard