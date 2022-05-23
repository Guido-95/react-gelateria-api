import React from 'react'
import './gelato.css'
function Gelato({ nome, decrizione, img, prezzo, categoria }) {
  return (
    <article className="gelato">
        <div className='img-gelato'>
            <img src={img} alt='gelato-img' />
        </div>
        <div className='info-gelato'>
            <div className='nome-prezzo-gelato'>
                <h4>{nome}</h4>
                <h4 className='prezzo'>{(prezzo / 100).toFixed(2)}€</h4>
            </div>
            
            <h4 className='categoria-gelato'>{categoria}</h4>
            <hr/>
            <p className='descrizione'>{decrizione}</p>
        </div>
    </article>
  )
}

export default Gelato