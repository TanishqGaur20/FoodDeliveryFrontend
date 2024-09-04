import React from 'react'

function CardShimmer() {

    return (
        <>
            {
                Array.from({ length: 10 }).map((el, i) => {
                    return <div className='card shimmerCard'>
                        <div className='shimmerIMG'></div>
                        <h1></h1>
                        <p></p>
                    </div>
                })
            }
        </>
    )
}

export default CardShimmer