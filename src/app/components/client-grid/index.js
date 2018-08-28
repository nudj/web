const React = require('react')

const { css } = require('@nudj/components/lib/css')

const clients = require('./clients')
const styleSheet = require('./style.css')

const ordered = [
  clients.bulb,
  clients.charlotteTilbury,
  clients.circusStreet,
  clients.feedr,
  clients.finimize,
  clients.fundstack,
  clients.meEm,
  clients.mrAndMrsSmith,
  clients.springChicken,
  clients.utelier,
  clients.venrex
]

/**
 * TODO: Select subset for rendering on le small screens
 */
const ClientGrid = ({ style, ...rest }) => (
  <ul {...rest} className={css(styleSheet.root, style)}>
    {ordered.map(client => (
      <li
        key={client.name}
        className={css(
          styleSheet.item,
          client.priority && styleSheet.itemImportant
        )}
      >
        <img
          className={css(styleSheet.logo)}
          src={client.logo}
          title={client.name}
        />
      </li>
    ))}
  </ul>
)

module.exports = ClientGrid
