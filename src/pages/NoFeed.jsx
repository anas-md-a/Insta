import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle, Placeholder, PlaceholderButton } from 'react-bootstrap'
import CreatePost from '../components/CreatePost';

const NoFeed = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [])

  return (
    <>
    { isLoading ? (
   
  
    <Card style={{ width: '18rem' }} >
        <CardImg variant='top'></CardImg>
        <CardBody>
            <Placeholder as={CardTitle} animation='glow'>
                <Placeholder xs={6}/>
        </Placeholder>
        <Placeholder as={CardText} animation='glow'>
            <Placeholder xs={7} /><Placeholder xs={2} /> 
            <Placeholder xs={4} />{' '}
            <Placeholder xs={4} /> <Placeholder xs={8} />
        </Placeholder>
        <PlaceholderButton variant='primary' xs={6}></PlaceholderButton>
        </CardBody>
    </Card>
    ):(
   <>
    <span style={{ fontSize: '1rem' }} className='p-5 m-5'> No feed available </span>
                      <div style={{ marginLeft: '40%', marginTop:'15%' }}>
                          <CreatePost isFirstPost={true} />
                      </div>

   </>
    )}
    </>
  )
  
}

export default NoFeed