import React from 'react'
import SearchFilter from '../../pure/SearchFilter/SearchFilter'
import CategoryContainer from '../CategoryContainer/CategoryContainer'
import RecomendationContainer from '../RecomendatioContainer/RecomendatioContainer'

const Home = () => {
  return (
    <div>    
        <SearchFilter />
        <CategoryContainer />
        <RecomendationContainer />
    </div>
  )
}

export default Home