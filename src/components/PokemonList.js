import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const PokemonList = () => {
  const [list, setList] = useState([])
  const [current, setCurrent] = useState('https://pokeapi.co/api/v2/pokemon')
  const [prev, setPrev] = useState('')
  const [next, setNext] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    //getting 20 pokemon info with pokeapi
    axios
      .get(current)
      .then((res) => {
        setPrev(res.data.previous)
        setNext(res.data.next)
        setList(res.data.results)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [current])

  // take out the id and make it 3 digit
  const pad = (url) => {
    const splitedUrl = url.split('/')
    const id = splitedUrl[splitedUrl.length - 2]
    if (id <= 9) {
      return '00' + +id
    } else if (id <= 99) {
      return '0' + +id
    } else {
      return id
    }
  }

  const goPrev = () => {
    setCurrent(prev)
  }
  const goNext = () => {
    setCurrent(next)
  }

  //take out the id and direct to the details page
  const showDetails = (url) => {
    const helper = url.split('/')
    const id = helper[helper.length - 2]
    navigate(`/pokemon/${id}`)
  }

  return (
    <div className="container">
      {list ? (
        list.map((pokemon, index) => {
          return (
            <div
              className="pokemon-box"
              key={index}
              onClick={() => showDetails(pokemon.url)}
            >
              <div className="pokemon-name">{pokemon.name}</div>
              <img
                className="pokemon-img"
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pad(
                  pokemon.url,
                )}.png`}
                alt="pokemon"
              />
            </div>
          )
        })
      ) : (
        <div className="loading">loading...</div>
      )}
      <div className="navbutton">
        <button disabled={!prev} onClick={() => goPrev()}>
          prev
        </button>
        <button disabled={!next} onClick={() => goNext()}>
          next
        </button>
      </div>
    </div>
  )
}

export default PokemonList
