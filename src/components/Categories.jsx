import React from 'react'
import { categories } from '../data'
import styled from 'styled-components'
import Category from './Category'

const Container = styled.section`
display: flex;

`
function Categories() {
  return (
    <Container>
        {
            categories.map((category)=>{
                return <Category category={category}/>
            })
        }
    </Container>
  )
}

export default Categories