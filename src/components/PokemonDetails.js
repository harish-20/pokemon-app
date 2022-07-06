import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PokemonDetails = () => {
  const [data, setData] = useState({})
  const { id } = useParams()
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon-species/' + id)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.error(err))
  }, [id])

  const pad = (id) => {
    if (id <= 9) {
      return '00' + +id
    } else if (id <= 99) {
      return '0' + +id
    } else {
      return id
    }
  }
  return (
    <div className="details">
      <img
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pad(
          id,
        )}.png`}
        alt="pokemon"
      />
      <div className="pokemon-stats">
        <div className="pokemon-head">{data.name}</div>
        <h2>base happiness:{data.base_happiness}</h2>
        <h2>capture rate:{data.capture_rate}</h2>
        <h2>color:{data.color?.name}</h2>
        <div className="comments">
          <h2>comments:</h2>
          {data.flavor_text_entries?.map((comment, index) => {
            if (comment.language.name === 'en')
              return <div key={index}>{comment.flavor_text}</div>
            else return null
          })}
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
